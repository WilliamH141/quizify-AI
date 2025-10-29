import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

type Props = {}

const QuizCreation = (props: Props) => {
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