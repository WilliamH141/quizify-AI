// app/components/WordCloudDemo.tsx
'use client';

import { Word, WordCloud } from '@isoterik/react-word-cloud';

const words: Word[] = [
  { text: 'React', value: 42 },
  { text: 'Quizify', value: 30 },
  { text: 'AI', value: 25 },
  { text: 'Next.js', value: 18 },
  { text: 'Prisma', value: 16 },
  { text: 'Supabase', value: 14 },
];

export default function WordCloudDemo() {
  return (
    <div className="w-full max-w-3xl">
      <WordCloud
        words={words}
        width={800}
        height={400}
        padding={2}
        enableTooltip
      />
    </div>
  );
}
