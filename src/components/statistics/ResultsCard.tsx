import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";

type Props = {
  accuracy: number;
};

const ResultsCard = ({ accuracy }: Props) => {
  let trophyClass = "text-emerald-600";
  let message = "Outstanding!";

  if (accuracy <= 50) {
    trophyClass = "text-amber-600";
    message = "Keep Practicing!";
  } else if (accuracy <= 75) {
    trophyClass = "text-muted-foreground";
    message = "Great Job!";
  }

  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Results</CardTitle>
        <Award className="text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="rounded-full p-6 bg-muted border border-border mb-4">
          <Trophy size={64} className={trophyClass} />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <h3 className={`text-3xl font-bold ${trophyClass}`}>{message}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-extrabold text-foreground">
              {accuracy.toFixed(0)}%
            </span>
            <span className="text-lg text-muted-foreground">accuracy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
