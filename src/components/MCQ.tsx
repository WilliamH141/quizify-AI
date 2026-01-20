'use client'

import { Game, Question } from '@prisma/client'
import { ChevronRight, Timer } from 'lucide-react'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import MCQCounter from './MCQCounter'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { checkAnswerSchema } from '@/schemas/form/quiz'
import z from 'zod'
import { toast } from 'sonner'
import { formatTimeDelta } from '@/lib/utils'
import confetti from 'canvas-confetti'

type Props = {
    game: Game & {questions: Pick<Question, "id" | "options" | "question">[]}
}

const MCQ = ({game}: Props) => {
    const [ questionIndex, setQuestionIndex ] = React.useState(0)
    const [selectedChoice, setSelectedChoice] = React.useState<number>(0)
    const [correctAnswers, setCorrectAnswers] = React.useState<number>(0)
    const [wrongAnswers, setWrongAnswers] = React.useState<number>(0)
    const [hasEnded, setHasEnded] = React.useState(false)
    const [now, setNow] = React.useState<Date>(new Date())
    const [streak, setStreak] = React.useState<number>(0)
    
    const currentQuestion = React.useMemo(() => {
        return game.questions[questionIndex]
    }, [questionIndex, game.questions])

    const options = React.useMemo(() => {
        if (!currentQuestion) return []
        if (!currentQuestion.options) return []
        return JSON.parse(currentQuestion.options as string) as string[];
    }, [currentQuestion])

    const {mutate: checkAnswer, isPending: isChecking} = useMutation({
        mutationFn: async () => {
            const payload: z.infer<typeof checkAnswerSchema> = {
                questionId: currentQuestion.id,
                userAnswer: options[selectedChoice]}
            const response = await axios.post('/api/checkAnswer', payload)
            return response.data
        },
        onSuccess: ({isCorrect}) => {
            if (isCorrect) {
                toast.success("Correct!")
                setCorrectAnswers(prev => prev + 1)
                setStreak(prev => prev + 1)
            } else {
                toast.error("Wrong answer")
                setWrongAnswers(prev => prev + 1)
                setStreak(0)
            }
            
            const nextIndex = questionIndex + 1
            if (nextIndex === game.questions.length) {
                setHasEnded(true)
                toast.success("Quiz completed!")
            } else {
                setQuestionIndex(nextIndex)
                setSelectedChoice(0)
            }
        }
    })

    React.useEffect(() => {
        if (hasEnded && correctAnswers === game.questions.length) {
            const duration = 2000
            const end = Date.now() + duration

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#22c55e', '#3b82f6', '#f59e0b']
                })
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#22c55e', '#3b82f6', '#f59e0b']
                })

                if (Date.now() < end) {
                    requestAnimationFrame(frame)
                }
            }
            frame()
        }
    }, [hasEnded, correctAnswers, game.questions.length])

    const handleSkip = React.useCallback(() => {
        const nextIndex = questionIndex + 1
        if (nextIndex === game.questions.length) {
            setHasEnded(true)
            toast.success("Quiz completed!")
        } else {
            setQuestionIndex(nextIndex)
            setSelectedChoice(0)
        }
    }, [questionIndex, game.questions.length])

    const handleNext = React.useCallback(() => {
        checkAnswer(undefined)
    }, [checkAnswer, isChecking])

    React.useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = parseInt(event.key)
            if (key >= 1 && key <= 4 && key <= options.length) {
                setSelectedChoice(key - 1)
            }
            if (event.key === 'Enter') {
                handleNext()
            }
            if (event.key === 'Escape') {
                window.history.back()
            }
        }
        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [options.length, handleNext])

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!hasEnded) {
                setNow(new Date())
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [hasEnded])
    
  return (
    <>
    {hasEnded ? (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
            <div className="flex flex-col justify-center items-center">
                <div className="px-4 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
                    You completed in {formatTimeDelta(Math.round((now.getTime() - game.timeStarted.getTime()) / 1000))}
                </div>
                <div className="mt-4">
                    <p className="text-2xl font-bold">
                        Your Score: {correctAnswers} / {game.questions.length}
                    </p>
                </div>
                <a href={`/statistics/${game.id}`} className="mt-4">
                    <Button>
                        View Statistics
                    </Button>
                </a>
            </div>
        </div>
    ) : (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
        <div className="flex flex-row justify-between" >
            <div className="flex flex-col">
                {/* topic */}
                <p>
                    <span className = "text-slate-400 mr-2">Topic</span>
                    <span className = "px-2 py-1 text-white rounded-lg bg-slate-800">{game.topic}</span>
                </p>
                <div className="flex self-start mt-3 text-slate-400">
                    <Timer className = "mr-2"/>
                    <span>{formatTimeDelta(Math.round((now.getTime() - game.timeStarted.getTime()) / 1000))}</span>
                </div>
                {streak > 0 && (
                  <div className="flex self-start mt-2 text-amber-500 font-semibold">
                    <span>Streak: {streak}</span>
                  </div>
                )}
            </div>
            <MCQCounter wrongAnswers={wrongAnswers} correctAnswers={correctAnswers}/>
        </div>

        {/*progress bar*/}
        <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((questionIndex + 1) / game.questions.length) * 100}%` }}
          ></div>
        </div>

        <Card className = "w-full mt-4">
            <CardHeader className="flex flex-row items-center">
                <CardTitle className = "mr-5 text-center divide-y divide-zinc-800/50">
                    <div>{questionIndex + 1}</div>
                    <div className="text-base text-slate-400">
                        {game.questions.length}
                    </div>
                </CardTitle>
                <CardDescription className="flex-grow text-lg">
                    {currentQuestion.question}
                </CardDescription>
            </CardHeader>
        </Card>

        <div className="flex flex-col items-center justify-center w-full mt-4">
            {options.map((option,index) => {
                return (
                    <Button key = {index} className = "justify-start w-full py-8 mb-4"
                    variant = {selectedChoice === index ? 'default': 'secondary'}
                    onClick = {() => {
                        setSelectedChoice(index);
                    }}>

                        <div className="flex items-center justify-start">
                            <div className="p-2 px-3 mr-5 border rounded-md">
                                {index + 1}
                            </div>
                            <div className="text-start">{option}</div>
                        </div>
                    </Button>
                )
            })}
            <div className='flex gap-2 mt-4'>
                <Button variant='ghost' onClick={handleSkip} disabled={isChecking}>
                    Skip
                </Button>
                <Button onClick={handleNext} disabled={isChecking} className='ml-auto'>
                    Next <ChevronRight className = "w-4 h-4 ml-2"/>
                </Button>
            </div>
            <p className="text-xs text-slate-500 mt-4">
                💡 Tip: Press 1-4 to select, Enter to submit, ESC to go back
            </p>
        </div>

    </div>
    )}
    </>
  )
}

export default MCQ