import React from 'react'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '../ui/card'
import CustomWordCloud from '../CustomWordCloud'

type Props = {}

const HotTopicsCard = (props: Props) => {
  return (
    <Card className = "col-span-4">
        <CardHeader>
            <CardTitle className = "text-2xl font-bold">Hot Topics</CardTitle> 

            <CardDescription>
                Click on any topic to start a quiz!
            </CardDescription>
        </CardHeader>

        <CardContent className = "pl-2">
        </CardContent>
        
    </Card>
  )
}

export default HotTopicsCard