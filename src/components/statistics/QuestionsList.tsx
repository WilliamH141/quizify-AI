import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { Question } from "@prisma/client";

type Props = {
  questions: Question[];
  gameType: "mcq" | "open_ended";
};

export default function QuestionsList({ questions, gameType }: Props) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {questions.map((q, i) => {
          const correct = gameType === "mcq" ? q.isCorrect : (q.percentageCorrect ?? 0) >= 0.5;
          
          return (
            <div key={q.id} className="flex gap-4 p-3 border rounded">
              <div className="flex-shrink-0 mt-1">
                {correct ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="font-medium text-sm">Q{i + 1}</h4>
                  {gameType === "open_ended" && q.percentageCorrect !== null && (
                    <span className="text-xs text-muted-foreground">
                      {Math.round(q.percentageCorrect * 100)}% match
                    </span>
                  )}
                </div>

                <p className="text-sm">{q.question}</p>

                <div className="text-xs space-y-1 pt-2">
                  <div>
                    <span className="text-muted-foreground">Your answer: </span>
                    <span className={correct ? "text-green-600" : "text-red-600"}>
                      {q.userAnswer || "—"}
                    </span>
                  </div>
                  {!correct && (
                    <div>
                      <span className="text-muted-foreground">Correct: </span>
                      <span className="text-green-600">{q.answer}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
