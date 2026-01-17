import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Clock3 } from 'lucide-react'

type Props = {}

const RecentActivites = (props: Props) => {
    const items = [
        { title: "Algebra basics", meta: "Today • 10:24 AM", stat: "Score 92%" },
        { title: "Biology flash", meta: "Yesterday • 7:12 PM", stat: "Score 85%" },
        { title: "World history", meta: "Tue • 5:03 PM", stat: "Score 78%" },
    ]
  return (
        <Card className="col-span-4 lg:col-span-3 rounded-xl border border-slate-700/60 bg-slate-900/70 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-100">Recent Activities</CardTitle>
                <CardDescription className="text-slate-400">Your latest quiz runs</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-0">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="flex items-center justify-between rounded-lg border border-slate-700/60 bg-slate-800/80 px-4 py-3"
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-100">{item.title}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Clock3 size={14} />
                                <span>{item.meta}</span>
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-100">{item.stat}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
  )
}

export default RecentActivites