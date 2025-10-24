import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'

type Props = {}

const RecentActivites = (props: Props) => {
  return (
    <Card className = "col-span-4 lg:col-span-3">
        <CardHeader>
            <CardTitle className = "text-2xl font-bold">
                Recent Activites
            </CardTitle>
            <CardDescription>
                You have played a total of 7 games.
            </CardDescription>

        </CardHeader>

        <CardContent className = "max-h-[500px] overflow-scroll">
            Historyss
        </CardContent>
       
    </Card>
  )
}

export default RecentActivites