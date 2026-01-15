# Quizify AI

Quizify AI is an AI-powered quiz generation platform built with Next.js, Prisma, and Supabase.  
It allows users to create and manage quizzes automatically using AI-generated content.

## Tech Stack

- Framework: Next.js (App Router)
- Database: Supabase (PostgreSQL)
- ORM: Prisma
- Styling: Tailwind CSS + shadcn/ui
- Authentication: NextAuth.js
- AI Integration: OpenAI API

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quizify-ai.git
   cd quizify-ai
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add:

bash
Copy code
DATABASE_URL="postgres_connection"
NEXTAUTH_SECRET="your_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
OPENAI_API_KEY="your_openai_key"
API_URL="http://localhost:3000"
Push the Prisma schema:

bash
Copy code
npx prisma db push
Run the development server:

bash
Copy code
npm run dev
Open your browser at:
http://localhost:3000

Status
This project is a work in progress.
Current focus areas:

Statistics Page

Quiz history and analytics