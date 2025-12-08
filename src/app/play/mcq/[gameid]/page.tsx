import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        gameId: string;
    }
}

const MCQPage = async ({params: {gameId}}: Props) => {
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect('/')
    }
    return (
    <div>{gameId}</div>
  )
}

export default MCQPage