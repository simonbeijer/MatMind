# MatMind - AI-Powered Jiu-Jitsu Development Platform

MatMind is a personalized Jiu-Jitsu development platform that uses AI to generate highly tailored training, mindset, and recovery plans based on a user's background, goals, and constraints. Whether you're a super heavyweight looking to improve technique or a lanky grappler seeking competition guidance, MatMind provides holistic development plans from multiple expert perspectives.

## 🥋 Features

- **Role-based AI Personas**: Get advice from Coach, Mental Coach, Physio, Sport Scientist, and supportive Friend perspectives
- **Two-part Input System**: Profile-based inputs (belt rank, age, training frequency, body type) and goal-based inputs with customizable sliders
- **Personalized Plans**: Technical drills, mindset shifts, off-mat conditioning, and strategic flows tailored to your specific needs
- **Multi-step Onboarding**: Clean, intuitive form flow that captures your unique situation and goals

## 🚀 Get Started

Make sure you have Node.js (v18+), npm, and Docker installed.

### Set Up Environment

Create a `.env` file in the project root with your database connection string:

```
DATABASE_URL="postgresql://simon:S1m0n@postgres:5432/matminddb"
```

### Prepare Database

Start the PostgreSQL service:

```bash
docker compose up -d postgres
```

Generate Prisma client and apply migrations:

```bash
npm run prisma:generate  
npx prisma migrate dev --name init
```

(Optional) Seed the database:

```bash
npm run seed
```

### Run the App

Start the MatMind application:

**Using Docker Compose:**
```bash
docker compose up nextjs
```

**Or directly (if not using Docker for the app):**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📋 Key Commands

- `npm run dev` — Start development server  
- `npm run build` — Build for production  
- `npm run start` — Start production server  
- `npm test` — Run unit/integration tests  
- `npm run test:e2e` — Run end-to-end tests  
- `npm run prisma:generate` — Update Prisma client  
- `npm run seed` — Run database seed script  

## 🏗️ Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js + Prisma (PostgreSQL)
- **LLM API**: Gemini or OpenAI (with prompt chaining)
- **Auth**: NextAuth.js
- **Testing**: Jest + Cypress
- **Containerization**: Docker

## 📚 Documentation

- [Project Roadmap](./ROADMAP.md) - Detailed implementation plan and features
- [Style Guide](./STYLE_GUIDE.md) - UI/UX consistency guidelines
- [Next.js Docs](https://nextjs.org/docs)  
- [Prisma Docs](https://www.prisma.io/docs)  
- [Docker Docs](https://docs.docker.com)  

## 🚢 Deployment

This project is set up for easy deployment to Vercel with the included `vercel.json` configuration.

## 🤝 Contributing

MatMind is designed to help the Brazilian Jiu-Jitsu community improve through personalized, AI-powered guidance. Contributions are welcome!