# SaaS Starter

A production-ready SaaS starter template with authentication, subscriptions, usage tracking, and payments.

## Features

- **Authentication** - Email/password auth with Better Auth
- **Subscriptions** - Full lifecycle management with Dodo Payments
- **Usage Tracking** - Configurable limits (Free: 2 units, Pro: 20 units)
- **Billing Portal** - Customer self-service portal
- **Modern UI** - Tailwind CSS, Radix UI, dark mode
- **Type Safe** - Full TypeScript + Prisma ORM

## Tech Stack

**Core:** Next.js 16.1.1 (App Router) · TypeScript · PostgreSQL · Prisma  
**Auth:** Better Auth  
**Payments:** Dodo Payments  
**UI:** Tailwind CSS 4 · Radix UI · Framer Motion · next-themes

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database
- pnpm (or npm/yarn/bun)
- Dodo Payments account

### Installation

1. **Clone and install:**

```bash
git clone https://github.com/nikhilnigamnik/saas-starter
cd saas-starter
pnpm install
```

2. **Set up environment variables:**

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/saas_starter"
BETTER_AUTH_SECRET="your-secret-key-here"  # Generate: openssl rand -base64 32
BETTER_AUTH_URL="http://localhost:3000"
DODO_PAYMENTS_API_KEY="your-dodo-payments-api-key"
DODO_PAYMENTS_WEBHOOK_KEY="your-dodo-payments-webhook-key"
DODO_PAYMENTS_RETURN_URL="http://localhost:3000/payment/success"
```

3. **Set up database:**

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

4. **Start dev server:**

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── (dashboard)/     # Protected routes (billing, dashboard, settings, payment)
├── api/             # API routes (checkout, portal, webhook, auth)
└── auth/            # Auth pages (signin, signup)
components/          # React components (layout, ui)
lib/                 # Utilities (actions, queries, webhooks, auth, prisma)
prisma/              # Schema and migrations
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prisma studio` - Open database GUI
- `pnpm prisma migrate dev` - Create migration
- `pnpm prisma migrate deploy` - Apply migrations (production)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

- Ensure PostgreSQL is accessible
- Set all environment variables
- Run `pnpm prisma migrate deploy` before first deployment
- Configure webhook URL in Dodo Payments: `https://example.com/api/webhook`

## Support

For issues and questions, please open an issue in the repository.
