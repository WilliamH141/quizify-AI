import React from 'react'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '../ui/card'

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

        <CardContent>
            <p className = "pl-2">Word cloud</p>
        </CardContent>
        
    </Card>
  )
}

export default HotTopicsCard