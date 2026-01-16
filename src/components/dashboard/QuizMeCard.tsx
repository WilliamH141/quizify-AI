"use client"

import React from 'react'
import { BrainCircuit } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {}

const QuizMeCard = (props: Props) => {
    const router = useRouter()
  return (
    <button
      onClick={() => router.push("/quiz")}
      className="w-full px-6 py-8 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold text-lg transition-all hover:shadow-xl hover:from-slate-800 hover:to-slate-900 active:scale-95"
    >
      <div className="flex items-center justify-center gap-3">
        <BrainCircuit size={24} strokeWidth={2} />
        <span>Start Quiz</span>
      </div>
    </button>
  )
}

export default QuizMeCard

