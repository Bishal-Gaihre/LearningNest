src/
├── common/                     # Global/reusable logic across the entire app
│   ├── decorators/             # Custom decorators (e.g., @GetUser(), @Public())
│   ├── filters/                # Global exception filters (e.g., http-exception.filter.ts)
│   ├── guards/                 # App-level guards
│   ├── interceptors/           # Response transformation / logging interceptors
│   └── pipes/                  # Custom pipes
│
├── config/                     # Configuration files & environment validation
│   └── env.config.ts
│
├── prisma/                     # Database access layer module
│   ├── prisma.module.ts        # Exports PrismaService for DI
│   └── prisma.service.ts       # Extends PrismaClient
│
├── modules/                    # Domain feature modules
│   ├── auth/                   # Authentication & Authorization feature
│   │   ├── dto/                # Auth-specific DTOs
│   │   │   ├── login.dto.ts
│   │   │   └── signup.dto.ts
│   │   ├── guards/             # JwtAuthGuard, LocalAuthGuard
│   │   ├── strategies/         # Passport strategies (jwt.strategy.ts)
│   │   ├── auth.controller.ts  # Handlers for /auth/signup & /auth/login
│   │   ├── auth.module.ts      # Imports Passport, JwtModule, UsersModule
│   │   └── auth.service.ts     # Password hashing, JWT token generation
│   │
│   ├── users/                  # User profile management feature
│   │   ├── dto/
│   │   │   └── update-user.dto.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   │
│   └── tasks/                  # Task CRUD feature
│       ├── dto/
│       │   ├── create-task.dto.ts
│       │   ├── update-task.dto.ts
│       │   └── filter-task.dto.ts
│       ├── tasks.controller.ts # Handlers for /tasks CRUD routes
│       ├── tasks.module.ts     # Task feature registration
│       └── tasks.service.ts    # Business logic & Prisma DB operations
│
├── app.module.ts               # Root module importing feature modules
└── main.ts                     # Entry point (Bootstrapping, Swagger setup, Pipes)