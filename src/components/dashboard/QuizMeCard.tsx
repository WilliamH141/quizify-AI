"use client";

import React from "react";
import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/quiz")}
      className="w-full px-6 py-8 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-colors hover:bg-primary/90 active:scale-95"
    >
      <div className="flex items-center justify-center gap-3">
        <BrainCircuit size={24} strokeWidth={2} />
        <span>Start Quiz</span>
      </div>
    </button>
  );
};

export default QuizMeCard;
