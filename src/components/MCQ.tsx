import { Game, Question } from '@prisma/client'
import React from 'react'

type Props = {
    game: Game & {questions: Pick<Question, "id" | "options" | "question">[]}
}

const MCQ = (props: Props) => {
  return (
    <div>MCQ</div>
  )
}

export default MCQ