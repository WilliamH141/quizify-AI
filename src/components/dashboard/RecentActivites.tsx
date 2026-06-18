import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Clock3 } from "lucide-react";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";

const RecentActivites = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return null;
  }

  const games = await prisma.game.findMany({
    where: { userId: session.user.id },
    include: {
      questions: {
        select: { isCorrect: true, percentageCorrect: true },
      },
    },
    orderBy: { timeStarted: "desc" },
    take: 3,
  });

  return (
    <Card className="col-span-4 lg:col-span-3 rounded-xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Recent Activities
        </CardTitle>
        <CardDescription>Your latest quiz runs</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {games.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No quizzes yet — start one to see it here.
          </p>
        ) : (
          games.map((game) => {
            const totalQuestions = game.questions.length;
            let accuracy = 0;
            if (totalQuestions > 0) {
              if (game.gameType === "mcq") {
                const totalCorrect = game.questions.reduce(
                  (count, q) => (q.isCorrect ? count + 1 : count),
                  0,
                );
                accuracy = (totalCorrect / totalQuestions) * 100;
              } else {
                const totalPercentage = game.questions.reduce(
                  (count, q) => count + (q.percentageCorrect || 0),
                  0,
                );
                accuracy = (totalPercentage / totalQuestions) * 100;
              }
            }

            const startedAt = new Date(game.timeStarted);
            const meta = `${startedAt.toLocaleDateString()} • ${startedAt.toLocaleTimeString(
              [],
              { hour: "2-digit", minute: "2-digit" },
            )}`;

            return (
              <Link
                key={game.id}
                href={`/statistics/${game.id}`}
                className="flex items-center justify-between rounded-lg border bg-muted px-4 py-3 transition-colors hover:bg-muted/70"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {game.topic}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 size={14} />
                    <span>{meta}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  Score {Math.round(accuracy)}%
                </span>
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivites;
