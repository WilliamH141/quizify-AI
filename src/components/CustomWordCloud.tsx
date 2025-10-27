// app/components/WordCloudDemo.tsx
'use client';

import D3WordCloud from 'react-d3-cloud';
import { useTheme } from "next-themes";
import React from 'react'

type Props = {}

const data = [
    {
        text: "Hey",
        value: 3
    }
]

const CustomWordCloud = (props: Props) => {
    const theme = useTheme()
  return (
    <>
    <D3WordCloud 
    height = {550} 
    data = {data}
    font = "Times" 
    fontSize = {9}
    padding={10}
    fill={theme.theme == "dark" ? "white": "black"}
    />
    </>
    
  
  )
}

export default CustomWordCloud