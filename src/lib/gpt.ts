import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-4.1-mini", // can change, using this for testing
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  // if the user input is in a list, we also process the output as a list of json
  const list_input: boolean = Array.isArray(user_prompt);
  // if the output format contains dynamic elements of < or >, then add to the prompt to handle dynamic elements
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  // if the output format contains list elements of [ or ], then we add to the prompt to handle lists
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  // start off with no error message
  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou must respond with ${
      list_output ? "an array of JSON objects matching" : "a JSON object matching"
    } the following schema: ${JSON.stringify(
      output_format
    )}.\nReturn ONLY valid JSON. Do not include explanations, markdown, or surrounding text.`;

    if (list_output) {
      output_format_prompt += `\nIf an output field is a list of choices, classify the output into the single best element of that list.`;
    }

    // if output_format contains dynamic elements, process it accordingly
    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>. Example output: Go to the garden.\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}. Example output: {school: 'a place for education'}.`;
    }

    // if input is in a list format, ask it to generate json in a list
    if (list_input) {
      output_format_prompt += `\nGenerate an array of JSON objects, one JSON object for each input element, in the same order as the inputs.`;
    }

    const userContent =
      Array.isArray(user_prompt) && user_prompt.length > 0
        ? user_prompt.join("\n\n---\n\n")
        : user_prompt.toString();

    // Use OpenAI to get a response
    const response = await openai.chat.completions.create({
      temperature,
      model,
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: userContent },
      ],
    });

    let res: string = response.choices[0].message?.content?.trim() ?? "";

    // Strip ```json ``` or ``` fences if the model adds them
    if (res.startsWith("```")) {
      res = res.replace(/^```json\s*/i, "");
      res = res.replace(/^```/i, "");
      res = res.replace(/```$/, "").trim();
    }

    if (verbose) {
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nRaw GPT response:", res);
    }

    // try-catch block to ensure output format is adhered to
    try {
      let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in an array of JSON objects");
        }
      } else {
        // normalize to array for internal handling
        output = [output];
      }

      // check for each element in the output_list, the format is correctly adhered to
      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          // unable to ensure accuracy of dynamic output header, so skip it
          if (/<.*?>/.test(key)) {
            continue;
          }

          // if output field missing, raise an error
          if (!(key in output[index])) {
            throw new Error(`${key} not in JSON output`);
          }

          const formatDef = output_format[key];

          // check that one of the choices given for the list of words is an unknown
          if (Array.isArray(formatDef)) {
            const choices = formatDef as string[];
            let value = output[index][key];

            // if the model outputs a list, collapse to first element
            if (Array.isArray(value)) {
              value = value[0];
            }

            if (typeof value === "string") {
              // output the default category (if any) if GPT is unable to identify the category
              if (!choices.includes(value) && default_category) {
                value = default_category;
              }
              // if the output is a description format, get only the label (before :)
              if (value.includes(":")) {
                value = value.split(":")[0];
              }
            }

            output[index][key] = value;
          }
        }

        // if we just want the values for the outputs
        if (output_value_only) {
          const values = Object.values(output[index]);
          // just output without the list if there is only one element
          output[index] = values.length === 1 ? values[0] : values;
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nThe previous attempt produced invalid JSON.\nRaw output:\n${res}\n\nError message: ${e}`;
      if (verbose) {
        console.error("An exception occurred:", e);
        console.error("Current invalid JSON:", res);
      }
    }
  }

  // if all retries fail, return an empty array (same behavior as your original)
  return [];
}
