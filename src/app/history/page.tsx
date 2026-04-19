import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { formatTimeDelta } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3, Clock3, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "History | Quizify",
};

const HistoryPage = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const games = await prisma.game.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      questions: {
        select: {
          id: true,
          isCorrect: true,
          percentageCorrect: true,
          userAnswer: true,
        },
      },
    },
    orderBy: {
      timeStarted: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Your quiz history</p>
            <h1 className="text-3xl font-bold tracking-tight">History</h1>
            <p className="mt-2 text-muted-foreground">
              Review past quizzes and jump back into any attempt.
            </p>
          </div>

          <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        {games.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No quizzes yet</CardTitle>
              <CardDescription>
                Create your first quiz to start building history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/quiz" className={buttonVariants()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create a quiz
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {games.map((game) => {
              const totalQuestions = game.questions.length;
              const answeredQuestions = game.questions.filter((question) => question.userAnswer !== null).length;
              const completedQuestions = totalQuestions === answeredQuestions;

              let accuracy = 0;
              if (game.gameType === "mcq") {
                const totalCorrect = game.questions.reduce((count, question) => {
                  return question.isCorrect ? count + 1 : count;
                }, 0);
                accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
              } else {
                const totalPercentage = game.questions.reduce((count, question) => {
                  return count + (question.percentageCorrect || 0);
                }, 0);
                accuracy = totalQuestions > 0 ? totalPercentage / totalQuestions : 0;
              }

              const startedAt = new Date(game.timeStarted);
              const endedAt = game.timeEnded ? new Date(game.timeEnded) : null;
              const duration = endedAt
                ? formatTimeDelta(Math.max(0, Math.round((endedAt.getTime() - startedAt.getTime()) / 1000)))
                : "In progress";

              return (
                <Card key={game.id}>
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{game.topic}</CardTitle>
                      <CardDescription className="mt-1">
                        {game.gameType === "mcq" ? "Multiple choice" : "Open-ended"}
                        {" • "}
                        {startedAt.toLocaleDateString()} {startedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </CardDescription>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right">
                      <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {completedQuestions ? "Completed" : "In progress"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {answeredQuestions}/{totalQuestions} answered
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>{Math.round(accuracy)}% accuracy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        <span>{duration}</span>
                      </div>
                      <div>
                        <span>{totalQuestions} questions</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/statistics/${game.id}`}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        View stats
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default HistoryPage;