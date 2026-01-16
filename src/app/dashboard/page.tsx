import HistoryCard from '@/components/dashboard/HistoryCard'
import HotTopicsCard from '@/components/dashboard/HotTopicsCard'
import QuizMeCard from '@/components/dashboard/QuizMeCard'
import RecentActivites from '@/components/dashboard/RecentActivites'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export const metadata = {
    title: "DashBoard | Quizify"
}

const Dashboard = async (props: Props) => {
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect("/")
    }
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-slate-50/30">
      <section className="flex flex-col items-center justify-center px-8 pt-20 pb-20 text-center">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold tracking-tight mb-4">
            Master any topic
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Create AI-powered quizzes and track your learning journey
          </p>
        </div>
        <div className="w-full max-w-sm mb-16">
          <QuizMeCard />
        </div>
      </section>

      <section className="px-8 pb-20 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivites />
          </div>
          <div>
            <HistoryCard />
          </div>
        </div>
        <div className="mt-6">
          <HotTopicsCard />
        </div>
      </section>
    </main>
  )
}

export default Dashboard