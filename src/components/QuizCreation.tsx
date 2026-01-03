"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useForm, Controller } from "react-hook-form"
import { quizCreationSchema } from "@/schemas/form/quiz"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useMutation} from '@tanstack/react-query'
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

type Props = {}

type InputType = z.infer<typeof quizCreationSchema>

const QuizCreation = (props: Props) => {
  const router = useRouter()
  const {mutate: getQuestions, isPending} = useMutation({
    mutationFn: async ({amount, topic, type}: InputType) => {
      const response = await axios.post('/api/game', {
        amount,
        topic,
        type
      })

      return response.data
    }
  })
  const form = useForm<InputType>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: undefined,
    },
    mode: "onSubmit",
  })

  const onSubmit = (values: InputType) => {
    getQuestions({
      amount: values.amount,
      topic: values.topic,
      type: values.type,
      
    },
  {
    onSuccess: ({gameId}) => {
      if (form.getValues('type') == 'open_ended') {
        router.push(`/play/open-ended/${gameId}`)
      } else {
        router.push(`/play/mcq/${gameId}`)
      }
    }
  })
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className = "w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
              {/* Topic */}
              <Field data-invalid={!!form.formState.errors.topic}>
                <FieldLabel htmlFor="topic">Topic</FieldLabel>
                <Input
                  id="topic"
                  placeholder="e.g. Linear Algebra, LC-3, WACC"
                  aria-invalid={!!form.formState.errors.topic}
                  {...form.register("topic")}
                />
                <FieldDescription>What should the quiz be about?</FieldDescription>
                {!!form.formState.errors.topic && (
                  <FieldError errors={[form.formState.errors.topic]} />
                )}
              </Field>

              {/* Amount */}
              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="amount">Number of Questions</FieldLabel>
                    <Input
                      id="amount"
                      type="number"
                      inputMode="numeric"
                      aria-invalid={fieldState.invalid}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                      onBlur={field.onBlur}
                    />
                    <FieldDescription>How many questions do you want?</FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Type */}
              <Field data-invalid={!!form.formState.errors.type}>
                <FieldLabel>Question Type</FieldLabel>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={form.watch("type") === "mcq" ? "default" : "secondary"}
                    className="flex-1"
                    onClick={() => form.setValue("type", "mcq")}
                  >
                    Multiple Choice
                  </Button>
                  <Button
                    type="button"
                    variant={form.watch("type") === "open_ended" ? "default" : "secondary"}
                    className="flex-1"
                    onClick={() => form.setValue("type", "open_ended")}
                  >
                    Open-ended
                  </Button>
                </div>
                <FieldDescription>Choose how questions should be formatted.</FieldDescription>
                {!!form.formState.errors.type && (
                  <FieldError errors={[form.formState.errors.type]} />
                )}
              </Field>

              <button
                type="submit"
                className="mt-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm border"
              >
                Create quiz
              </button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizCreation
