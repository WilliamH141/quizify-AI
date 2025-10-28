import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

type Props = {}

const QuizCreation = (props: Props) => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card className = "w-full">
            <CardHeader>
                <CardTitle className = "font-bold text-2xl">
                    Quiz Creation
                </CardTitle>
                <CardDescription>
                    Choose a topic
                </CardDescription>
            </CardHeader>


        </Card>
        </div>


    )
}

export default QuizCreation