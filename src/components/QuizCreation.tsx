"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import {useForm} from "react-hook-form"
import { quizCreationSchema } from '@/schemas/quiz'
import z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"

type Props = {}

type Input = z.infer<typeof quizCreationSchema>

const QuizCreation = (props: Props) => {
    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 3,
            topic: "",
            type: "open_ended"
        }
    })
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        <Card>
        <CardHeader className = "flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className = "text-2xl font-bold">
                Quiz Creation
            </CardTitle>
        </CardHeader>

        <CardContent>
            <p className = "text-sm text-muted-foreground">Choose a topic</p>
        </CardContent>
    </Card>
        </div>




    )
}

export default QuizCreation