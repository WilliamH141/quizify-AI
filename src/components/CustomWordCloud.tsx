// app/components/WordCloudDemo.tsx
'use client';

import { useTheme } from "next-themes";
import React from 'react'

type Props = {}

const data = [
    {
        text: "Hey",
        value: 3,
    },
    {
        text: "fds",
        value: 3,
    },
    {
        text: "fdsfsd",
        value: 3,
    },
    {
        text: "Hey",
        value: 3,
    },
];

const fontSizeWrapper = (word: {value: number}) => {
    return Math.log2(word.value) * 5 + 16
}

const CustomWordCloud = (props: Props) => {
    const theme = useTheme()
  return (
    <>
    height = {550} 
    data = {data}
    font = "Times" 
    fontSize = {fontSizeWrapper}
    rotate={0}
    padding={10}
    fill={theme.theme == "dark" ? "white": "black"}

    </>
    
  
  )
}

export default CustomWordCloud