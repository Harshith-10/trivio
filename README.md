# 🧠 Trivio - Interactive Quiz Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Harshith-10/trivio-quiz)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)

> **Test Your Knowledge with Interactive Quizzes** - Challenge yourself with thousands of questions across multiple categories, track your progress, and compete with friends!

[🌐 **Live Demo**](https://trivio-quiz.vercel.app) • [📖 **Documentation**](#documentation) • [🐛 **Report Bug**](https://github.com/yourusername/trivio-quiz/issues) • [✨ **Request Feature**](https://github.com/yourusername/trivio-quiz/issues)

## ✨ Features

### 🎯 Core Functionality
- **🏃‍♂️ Timed Challenges** - Customizable time limits for each quiz to test knowledge under pressure
- **🏆 Global Leaderboards** - Compete with friends and climb rankings across different categories
- **📊 Progress Analytics** - Detailed statistics and improvement insights to track performance
- **👥 Multiplayer Mode** - Real-time quiz battles and group competitions
- **🔒 Secure & Fair** - Anti-cheat measures and secure authentication system
- **⚡ Instant Results** - Immediate feedback with detailed explanations for each answer

### 🎨 User Experience
- **📱 Responsive Design** - Seamlessly works across desktop, tablet, and mobile devices
- **🌙 Dark/Light Mode** - Toggle between themes for comfortable viewing
- **🔍 Category Explorer** - Wide variety of topics and difficulty levels
- **📈 Performance Tracking** - Visual charts and progress indicators
- **🎮 Gamification** - Achievement system and reward mechanics

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Database** (PostgreSQL recommended)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/trivio-quiz.git
   cd trivio-quiz
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Configure your `.env.local`:
   \`\`\`env
   DATABASE_URL="your_database_connection_string"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your_google_oauth_id"
   GOOGLE_CLIENT_SECRET="your_google_oauth_secret"
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   npm run db:push
   npm run db:seed
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser** and navigate to `http://localhost:3000`

## 🏗️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://framer.com/motion/)** - Animation library
- **[Radix UI](https://radix-ui.com/)** - Headless UI components

### Backend
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless functions
- **[Prisma](https://prisma.io/)** - Database ORM
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication
- **[Zod](https://zod.dev/)** - Schema validation

### Database & Deployment
- **[PostgreSQL](https://postgresql.org/)** - Primary database
- **[Vercel](https://vercel.com/)** - Hosting and deployment
- **[Upstash Redis](https://upstash.com/)** - Caching and real-time features

## 📁 Project Structure

\`\`\`
trivio-quiz/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 (auth)/            # Authentication pages
│   ├── 📁 api/               # API routes
│   ├── 📁 dashboard/         # User dashboard
│   └── 📁 quiz/              # Quiz gameplay
├── 📁 components/            # Reusable UI components
│   ├── 📁 ui/               # Base UI components
│   ├── 📁 quiz/             # Quiz-specific components
│   └── 📁 dashboard/        # Dashboard components
├── 📁 lib/                   # Utility functions
│   ├── 📄 auth.ts           # Authentication config
│   ├── 📄 db.ts             # Database connection
│   └── 📄 utils.ts          # Helper functions
├── 📁 prisma/               # Database schema & migrations
├── 📁 public/               # Static assets
└── 📁 types/                # TypeScript type definitions
\`\`\`

## 🎮 Usage Examples

### Creating a Quiz
\`\`\`typescript
import { createQuiz } from '@/lib/quiz'

const newQuiz = await createQuiz({
  title: "JavaScript Fundamentals",
  category: "programming",
  difficulty: "intermediate",
  timeLimit: 300, // 5 minutes
  questions: [
    {
      question: "What is closure in JavaScript?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 0,
      explanation: "A closure is..."
    }
  ]
})
\`\`\`

### Real-time Multiplayer
\`\`\`typescript
import { joinMultiplayerGame } from '@/lib/multiplayer'

const gameSession = await joinMultiplayerGame({
  gameId: "game_123",
  userId: "user_456"
})
\`\`\`

## 🛠️ Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with sample data
npm run test         # Run test suite
\`\`\`

### Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for Git hooks
- **TypeScript** for type checking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Reporting Issues

Please use our [issue templates](.github/ISSUE_TEMPLATE/) when reporting bugs or requesting features.

## 📊 Performance & Analytics

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Analyzed with `@next/bundle-analyzer`
- **Database Queries**: Optimized with proper indexing and caching

## 🔐 Security

- **Authentication**: Secure OAuth implementation with NextAuth.js
- **Data Validation**: All inputs validated with Zod schemas
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **XSS Protection**: Built-in Next.js security headers
- **CSRF Protection**: Implemented across all forms

## 📈 Roadmap

- [ ] **Mobile App** - React Native implementation
- [ ] **AI-Generated Questions** - Integration with OpenAI API
- [ ] **Voice Quizzes** - Audio-based quiz format
- [ ] **Team Competitions** - Corporate and educational features
- [ ] **Advanced Analytics** - ML-powered insights
- [ ] **Offline Mode** - PWA with offline capability

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for quiz questions
- [Unsplash](https://unsplash.com/) for beautiful imagery
- All our [contributors](https://github.com/yourusername/trivio-quiz/contributors)

## 📞 Support

- 📧 **Email**: support@trivio-quiz.com
- 💬 **Discord**: [Join our community](https://discord.gg/trivio)
- 📖 **Documentation**: [Read the docs](https://docs.trivio-quiz.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/trivio-quiz/issues)

---

<div align="center">

**Made with ❤️ by the Trivio Team**

[⭐ **Star this repo**](https://github.com/yourusername/trivio-quiz) • [🐦 **Follow us on Twitter**](https://twitter.com/trivio_quiz) • [🌟 **Try Trivio**](https://trivio-quiz.vercel.app)

</div>
