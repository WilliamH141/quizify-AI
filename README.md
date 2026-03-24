# Quizify AI

Quizify AI is a full-stack web app that generates quizzes using AI. The goal was to explore how large language models can be integrated into real applications to automate content creation and user workflows.

Users can create quizzes from a topic, take them, and have results stored and tracked over time.

---

## What I built

- Integrated the OpenAI API to generate quiz questions dynamically  
- Built backend workflows to handle prompt construction and parse AI responses into structured quiz data  
- Designed a full-stack system with authentication, database storage, and API routes  
- Implemented quiz creation, scoring, and persistence using PostgreSQL (Supabase)  

---

## Tech Stack

- Next.js (App Router)  
- TypeScript  
- Supabase (PostgreSQL)  
- Prisma ORM  
- NextAuth.js  
- Tailwind CSS + shadcn/ui  
- OpenAI API  

---

## Features

- AI-generated quizzes based on user input  
- User authentication and persistent data storage  
- Quiz history and scoring  
- Modular backend structure for extending AI functionality  

---

## Running locally

Clone the repo:

git clone https://github.com/yourusername/quizify-ai.git  
cd quizify-ai  
npm install  

Create a `.env` file:

DATABASE_URL="..."  
NEXTAUTH_SECRET="..."  
GOOGLE_CLIENT_ID="..."  
GOOGLE_CLIENT_SECRET="..."  
OPENAI_API_KEY="..."  

Then run:

npx prisma db push  
npm run dev  

App runs at: http://localhost:3000

---

## Current focus

- Improving quiz quality and consistency  
- Adding analytics and performance tracking  
- Refining UI/UX  

---

## Notes

This project is still in progress, but it reflects my interest in building practical applications on top of AI systems rather than just using them in isolation.
