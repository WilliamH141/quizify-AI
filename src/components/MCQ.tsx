import { Game, Question } from '@prisma/client'
import React from 'react'

type Props = {
    game: Game & {questions: Pick<Question, "id" | "options" | "question">[]}
}

const MCQ = ({game}: Props) => {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
        <div className="flex flex-row justify-between" >
            {/* topic */}

            <p>
                <span className = "text-slate-400">Topic</span>
                <span className = "px-2 py-1 text-white rounded-lg bg-slate-800">{game.topic}</span>
            </p>

        </div>

    </div>

  )
}

export default MCQ