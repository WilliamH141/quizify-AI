import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { BookOpenCheck, Clock3, Trophy, Users } from "lucide-react";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            Quizify
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Make quizzes in minutes. Play with friends.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Build multiple-choice or open-ended quizzes, share them, and track
            your progress over time.
          </p>

          <div className="mt-8 flex justify-center">
            <SignInButton text="Sign in with Google" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/80 bg-card">
            <CardHeader className="pb-2">
              <BookOpenCheck className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-base">
                Create quizzes quickly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Put together question sets for class, study, or fun.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card">
            <CardHeader className="pb-2">
              <Clock3 className="h-5 w-5 text-violet-500" />
              <CardTitle className="text-base">Short game rounds</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Keep games quick so everyone stays engaged.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card">
            <CardHeader className="pb-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-base">Track your progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Review scores and accuracy to see where to improve.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card">
            <CardHeader className="pb-2">
              <Users className="h-5 w-5 text-cyan-500" />
              <CardTitle className="text-base">Play together</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Share games with friends and compare results.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
