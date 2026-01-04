import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";

type Props = { 
  accuracy: number 
};

const ResultsCard = ({ accuracy }: Props) => {
  // determine what trophy/message to show based on score
  let trophyColor = "gold"
  let trophyBg = "bg-yellow-50"
  let trophyBorder = "border-yellow-200"
  let textColor = "text-yellow-500"
  let message = "Outstanding!"

  if (accuracy <= 50) {
    trophyColor = "#cd7f32"
    trophyBg = "bg-amber-50"
    trophyBorder = "border-amber-200"
    textColor = "text-amber-700"
    message = "Keep Practicing!"
  } else if (accuracy <= 75) {
    trophyColor = "silver"
    trophyBg = "bg-gray-50"
    trophyBorder = "border-gray-200"
    textColor = "text-gray-400"
    message = "Great Job!"
  }

  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Results</CardTitle>
        <Award className="text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className={`rounded-full p-6 ${trophyBg} border-2 ${trophyBorder} mb-4`}>
          <Trophy stroke={trophyColor} size={64} fill={trophyColor} className="opacity-90" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <h3 className={`text-3xl font-bold ${textColor}`}>
            {message}
          </h3>
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