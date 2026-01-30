# LifeOS - Personal Mobile Dashboard

<div align="center">

![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Turso](https://img.shields.io/badge/Turso-Database-cyan?style=for-the-badge&logo=sqlite)
![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle)

<br/>

**LifeOS** is a mobile-first Progressive Web Application (PWA) designed as a personal operating system for managing finances, life goals, and daily activity logs with PIN-based security.

[Report Bug](https://github.com/ozzie5555/project-lifeos-app-gabut/issues) · [Request Feature](https://github.com/ozzie5555/project-lifeos-app-gabut/issues)

</div>

---

## Project Overview

LifeOS addresses the common challenges of personal financial management and goal tracking by providing a unified platform for monitoring daily expenses, setting life objectives, and maintaining activity logs. The application eliminates the need for multiple applications by consolidating essential personal management tools into a single, streamlined interface optimized for mobile devices.

### Core Problem Statement

Many individuals struggle with:
- Lack of visibility into spending patterns and cash flow
- Difficulty maintaining consistent goal tracking
- Fragmented data across multiple applications
- Complex interfaces that discourage regular usage

LifeOS solves these issues through a simplified, mobile-optimized dashboard that encourages consistent engagement with personal management tasks.

---

## Key Features

### Security & Authentication
**PIN-Protected Access**
- Six-digit PIN authentication system
- Secure session management
- Lock screen protection before dashboard access

### Financial Management
**Finance Tracker**
- Income and expense recording
- Automatic balance calculation
- Transaction history with timestamps
- Category-based expense tracking

### Goal Management
**Goal System**
- Create and track personal objectives
- Progress monitoring with visual indicators
- Timeline-based goal management
- Completion status tracking

### Activity Monitoring
**System Activity Logs**
- Automated audit trail for all user actions
- Timestamp-based activity records
- Comprehensive system event logging
- User action history tracking

### Progressive Web App
**PWA Capabilities**
- Installable on Android and iOS devices
- Fullscreen mode without browser interface
- Offline functionality support
- Native app-like experience

### Configuration Management
**Dynamic Settings**
- User profile customization
- PIN modification
- Data reset functionality
- System preferences management

---

## Technology Stack

LifeOS leverages modern web technologies to deliver optimal performance and lightweight database operations.

### Core Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | React-based web framework with server-side rendering |
| **Database** | Turso (LibSQL) | Distributed SQLite database for edge deployment |
| **ORM** | Drizzle ORM | Type-safe database query builder |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Icons** | Lucide React | Open-source icon library |
| **Deployment** | Vercel | Cloud platform for serverless deployment |

### Architecture Benefits

- **Edge-First Design**: Leverages edge computing for reduced latency
- **Type Safety**: Full TypeScript implementation across stack
- **Serverless**: Cost-effective scaling without infrastructure management
- **Mobile-Optimized**: Tailored specifically for mobile viewport sizes

---

## Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm, pnpm, or yarn package manager
- Turso account and database credentials

### Local Development Setup

#### 1. Clone Repository
```bash
git clone https://github.com/ozzie5555/project-lifeos-app-gabut.git
cd project-lifeos-app-gabut
```

#### 2. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

#### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
TURSO_DATABASE_URL=your_database_url
TURSO_AUTH_TOKEN=your_auth_token
```

To obtain Turso credentials:
1. Sign up at [turso.tech](https://turso.tech)
2. Create a new database
3. Generate authentication token
4. Copy credentials to environment file

#### 4. Initialize Database Schema
```bash
npm run db:push
# or
pnpm db:push
```

#### 5. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

Access the application at `http://localhost:3000`

---

## Project Structure

```
project-lifeos-app-gabut/
├── app/
│   ├── api/              # API routes
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Main dashboard pages
│   └── layout.tsx       # Root layout
├── components/
│   ├── ui/              # Reusable UI components
│   └── forms/           # Form components
├── lib/
│   ├── db/              # Database configuration
│   └── utils/           # Utility functions
├── drizzle/
│   └── schema.ts        # Database schema
├── public/              # Static assets
└── package.json
```

---

## Database Schema

### Users Table
- `id`: Primary key
- `name`: User display name
- `pin`: Encrypted PIN hash
- `created_at`: Account creation timestamp

### Transactions Table
- `id`: Primary key
- `user_id`: Foreign key reference
- `type`: Transaction type (income/expense)
- `amount`: Transaction value
- `category`: Expense/income category
- `description`: Optional notes
- `date`: Transaction timestamp

### Goals Table
- `id`: Primary key
- `user_id`: Foreign key reference
- `title`: Goal description
- `target_amount`: Target value (if applicable)
- `current_amount`: Progress tracking
- `deadline`: Target completion date
- `status`: Completion status
- `created_at`: Goal creation timestamp

### Activity Logs Table
- `id`: Primary key
- `user_id`: Foreign key reference
- `action`: Action description
- `timestamp`: Event timestamp
- `metadata`: Additional context (JSON)

---

## Usage Guide

### First-Time Setup

1. **Initial PIN Creation**
   - Navigate to the lock screen
   - Create a six-digit PIN
   - Confirm PIN entry
   - PIN is encrypted and stored securely

2. **Dashboard Access**
   - Enter PIN on lock screen
   - Successful authentication redirects to dashboard
   - Dashboard displays financial overview and quick actions

3. **Recording Transactions**
   - Select transaction type (income/expense)
   - Enter amount and category
   - Add optional description
   - Save transaction to database

4. **Managing Goals**
   - Create new goal with title and target
   - Set deadline for completion
   - Update progress regularly
   - Track achievement status

### PWA Installation

**Android (Chrome/Edge)**
1. Visit the application URL
2. Tap browser menu (three dots)
3. Select "Install app" or "Add to Home Screen"
4. Confirm installation

**iOS (Safari)**
1. Visit the application URL
2. Tap Share button
3. Select "Add to Home Screen"
4. Confirm and name the app

---

## Security Considerations

### Authentication
- PIN stored using one-way encryption
- No plain-text credential storage
- Session-based authentication
- Automatic session timeout

### Data Privacy
- User data isolated by account
- No third-party analytics integration
- Local-first data approach
- Encrypted database connections

### Best Practices
- Regular PIN changes recommended
- Avoid using sequential or obvious PINs
- Enable device-level security
- Regular data backup suggested

---

## Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   vercel login
   vercel link
   ```

2. **Configure Environment Variables**
   - Navigate to Vercel project settings
   - Add `TURSO_DATABASE_URL`
   - Add `TURSO_AUTH_TOKEN`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Alternative Platforms
- Netlify (with Next.js plugin)
- Cloudflare Pages (requires adapter)
- Self-hosted (Docker container)

---

## Roadmap

### Current Status
- Core financial tracking functionality
- Goal management system
- Activity logging
- PIN authentication
- PWA support

### Planned Features
- [ ] Multi-currency support
- [ ] Budget planning tools
- [ ] Recurring transaction automation
- [ ] Data export functionality (CSV/PDF)
- [ ] Cloud backup and sync
- [ ] Biometric authentication
- [ ] Dark mode theme
- [ ] Notification system for goal reminders
- [ ] Advanced analytics dashboard
- [ ] Category customization

---

## Contributing

Contributions are welcome to improve LifeOS. Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Standards
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test thoroughly before submitting

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

- **Next.js Team** - For the excellent React framework
- **Turso** - For providing edge-optimized database solution
- **Drizzle Team** - For the intuitive ORM implementation
- **Vercel** - For seamless deployment infrastructure
- **Open Source Community** - For continuous inspiration and support

---

## Contact & Support

**Project Link:** [https://github.com/ozzie5555/project-lifeos-app-gabut](https://github.com/ozzie5555/project-lifeos-app-gabut)

**Issues:** [https://github.com/ozzie5555/project-lifeos-app-gabut/issues](https://github.com/ozzie5555/project-lifeos-app-gabut/issues)

**Documentation:** [Project Wiki](https://github.com/ozzie5555/project-lifeos-app-gabut/wiki)

---

<div align="center">

**Developed for Personal Productivity Enhancement**

*Simplifying financial management and goal tracking through modern web technology*

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=ozzie5555.project-lifeos-app-gabut)

</div>
