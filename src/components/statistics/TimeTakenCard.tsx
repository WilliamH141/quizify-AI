import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock } from "lucide-react";
import { formatTimeDelta } from "@/lib/utils";

type Props = { 
  timeStarted: Date
  timeEnded: Date | null
};

const TimeTakenCard = ({ timeStarted, timeEnded }: Props) => {
  const timeTaken = Math.round((timeEnded ? timeEnded.getTime() : Date.now() - timeStarted.getTime()) / 1000);
  
  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Time Taken</CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">{formatTimeDelta(timeTaken)}</div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;
