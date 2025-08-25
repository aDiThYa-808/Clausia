# Clausia (Beta)

**Generate professional privacy policies for your apps and games in minutes.**

Clausia is a smart privacy policy generator designed specifically for Indian indie app and game developers. Born from the frustration of manually creating privacy policies for Play Store submissions, Clausia turns a tedious legal process into a simple questionnaire.

---

## Why Clausia?

As an indie developer, you've probably been there:
- **Hours wasted** cobbling together privacy policies from templates
- **Legal confusion** about what clauses you actually need
- **Constant back-and-forth** between ChatGPT for text and Google Sites for formatting
- **Play Store rejections** due to incomplete or invalid privacy policies

**Clausia solves this.** Answer a few simple questions about your app, and get a legally compliant privacy policy with a live link ready for your Play Store submission.

---

## Features

**App & Game Focused**
- Tailored specifically for mobile apps and games
- Covers common scenarios like ads, third party SDKs and in-app purchases

**AI-Powered Intelligence**
- Powered by GPT-4.1-mini for accurate, relevant policy generation
- Smart question flow based on your app type

**Simple Question Flow**
- No legal jargon, just plain English questions
- Quick setup in under 10 minutes

**Instant Live Links**
- Get a hosted privacy policy URL immediately
- Perfect for Play Store, App Store, and website requirements

---

## How It Works

1. **Sign Up** - Quick authentication to get started
2. **Answer Questions** - Simple questionnaire about your app's data usage
3. **Preview** - Review your generated policy before publishing
4. **Get Your Policy** - Purchase credits and publish your policy

---

## Tech Stack

- **Framework** : Next.js 15.3.5 with TypeScript 5
- **Styling** : Tailwind CSS 4
- **AI Integration** : OpenAI API 5.10.1
- **Database & Auth** : Supabase
- **Payment Processing** : Razorpay 2.9.6
- **Validation** : Zod 4.0.5
- **Analytics** : Vercel Analytics & Speed Insights
- **UI Components** : Lucide React icons, Sonner toast notifications
- **Date Handling** : Day.js 1.11.13
- **Deployment** : Vercel

---

## Installation
```bash
# Clone the repository
git clone https://github.com/aDiThYa-808/clausia.git
cd clausia

# Install dependencies
npm install

# Set up environment variables
touch .env.local

# Add the API keys

# Run development server
npm run dev

# Run Linting
npm run lint

```
---

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## Project Structure
```
clausia/
├── src/
│   ├── app/             # Next.js 15 app directory, components and APIs
│   ├── lib/             # Utilities and configurations
│   └── types/           # TypeScript type definitions
└── public/              # Static assets
```

---

## Development Timeline
**Started**: July 14, 2024  
**Status**: Active development with core features complete

---

## Upcoming Features
- **Export Options**: Download policies as PDF or copy as formatted text
- **Extended Policy Types**: Terms of Service and Refund Policy generators
- **Enhanced Customization**: Advanced policy modification options
- **Analytics Dashboard**: Usage insights for generated policies
---

## Contributing
This project is open for contributions. Please feel free to submit issues and enhancement requests.

---

## 📬 Contact & Support

Questions? Suggestions? We'd love to hear from you!

- 📧 Email: support@clausia.app
- 📸 Instagram: a_d_i_.x

---

<div align="center">

**Build for developers, Build by Developers.**

[Get Started →](clausia.app)

</div>

---

