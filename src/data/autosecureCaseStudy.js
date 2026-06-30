export const autosecureCaseStudy = {
  eyebrow: "Commercial B2B SaaS Case Study",
  title: "AutoSecure",
  subtitle:
    "Multi-Tenant Insurance Operations, Document, Billing, and Compliance SaaS Platform",
  liveUrl: "https://autosecure.vxdev.in",
  repositoryLabel: "No source repository",
  summary:
    "A production-ready multi-tenant SaaS platform built for managing insurance policies and licenses across multiple organizations with secure document storage, subscription management, audit logs, reminders, and role-based access control.",
  productSurfaces: [
    "Public website and legal pages",
    "Organization dashboard for agency owners, admins, and users",
    "Super-admin console for platform operators",
    "Android mobile app through Capacitor",
  ],
  stats: [
    { label: "Product type", value: "B2B SaaS" },
    { label: "Tenancy", value: "Multi-tenant" },
    { label: "Runtime", value: "Web + Android" },
    { label: "Source code", value: "Not available" },
  ],
  media: [
    {
      title: "Public home",
      caption:
        "Public SaaS entry point with support, authentication access, and published legal documents.",
      src: "/texture/home.webp",
      alt: "AutoSecure product visual",
      status: "Available",
    },
    {
      title: "Dashboard overview",
      caption:
        "Renewal counters, organization activity, analytics, notifications, and operational shortcuts.",
      src: "/texture/dashboard.webp",
      alt: "AutoSecure dashboard view",
      status: "Available",
    },
    {
      title: "Policy operations",
      caption:
        "Policy listing, creation, details, document upload, email attachments, and tenant-safe record operations.",
      src: "/texture/policy.webp",
      alt: "AutoSecure policy operations",
      status: "Available",
    },
    {
      title: "Billing page",
      caption:
        "Plans, seats, current-period quota, upload limits, add-ons, and server-side payment verification.",
      src: "/texture/billing.webp",
      alt: "AutoSecure billing page",
      status: "Available",
    },
    {
      title: "Super-admin console",
      caption:
        "Organizations, diagnostics, plans, feature gates, backups, legal versions, and global platform settings.",
      src: "/texture/super-admin.webp",
      alt: "AutoSecure super-admin console",
      status: "Available",
    },
    {
      title: "Android app",
      caption:
        "Capacitor wrapper with native secure token storage, file save/share, network/app-state events, and back-button handling.",
      src: "/texture/android-app.webp",
      alt: "AutoSecure Android app",
      status: "Available",
    },
  ],
  problem:
    "Many insurance agencies still manage policies, license records, renewals, documents, payments, and team access through spreadsheets, folders, messaging apps, email threads, and manual notes. That makes records hard to search, renewal follow-ups easy to miss, documents hard to protect, identifiers dangerous to mutate, team access difficult to control, and SaaS-level needs like billing, quotas, backups, legal versioning, and mobile auth awkward to handle.",
  solution:
    "AutoSecure replaces scattered workflows with one centralized multi-tenant platform. Backend middleware and controllers enforce authentication, authorization, tenant isolation, feature access, subscription limits, quota rules, file access, and sensitive operations while the frontend adapts the interface to each user's role and organization access.",
  featureGroups: [
    {
      title: "Insurance operations",
      items: [
        "Policy creation wizard, listing, search, filters, detail views, editing, and deletion",
        "Aadhaar, PAN, and other policy document uploads",
        "Duplicate policy number checks within the same organization",
        "License management behind organization feature access",
        "Renewal counters, calendar/event data, reminders, and notifications",
      ],
    },
    {
      title: "SaaS platform layer",
      items: [
        "Multi-tenant organization workspaces",
        "Role-based access for super admins, owners, admins, and users",
        "Plans with monthly or annual billing",
        "Per-period policy creation and upload storage quotas",
        "Current-period add-ons, extra seats, direct quota grants, and optional seat renewal",
      ],
    },
    {
      title: "Operator controls",
      items: [
        "Super-admin organization management and feature bypasses",
        "Backup create, list, download, restore, delete, and settings workflows",
        "Legal document draft, publish, seed-current, and acceptance tracking",
        "Site branding, maintenance, security, email, integration, and support settings",
        "Organization deletion request and cancellation workflow",
      ],
    },
    {
      title: "Security and privacy",
      items: [
        "Tenant-scoped organization data access",
        "CSRF-protected browser requests and Bearer-token mobile requests",
        "Stable storage_key document references for mutable policy numbers",
        "Server-side Razorpay order payload verification",
        "Audit logs for user, file, billing, backup, legal, and organization actions",
      ],
    },
  ],
  stack: {
    frontend: [
      "Next.js App Router",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Axios API client",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "Recharts",
      "SWR",
      "Capacitor",
    ],
    backend: [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "JWT authentication",
      "Cookie browser auth",
      "Bearer-token mobile auth",
      "CSRF protection",
      "Role, permission, subscription, and feature middleware",
      "Multer uploads",
      "Helmet, CORS, and rate limiting",
    ],
    integrations: [
      "Cloudflare R2",
      "Resend",
      "Razorpay",
      "PDFKit",
      "ExcelJS",
      "bcrypt",
      "TOTP/MFA",
    ],
  },
  architecture: [
    "Browser or Android WebView",
    "Next.js frontend",
    "Cookies + CSRF for web requests",
    "Bearer token from native bridge for mobile requests",
    "Express API under /api/v1",
    "MongoDB via Mongoose",
    "Cloudflare R2 for documents and backups",
    "Resend, Razorpay, backup scheduler, and legal/versioning services",
  ],
  backendLayers: [
    {
      title: "Routes",
      body: "Define API shape and middleware ordering.",
    },
    {
      title: "Middleware",
      body: "Auth, CSRF, rate limits, subscription guards, feature gates, permissions, and error handling.",
    },
    {
      title: "Controllers",
      body: "Parse requests, validate inputs, and orchestrate tenant-aware use cases.",
    },
    {
      title: "Services",
      body: "Hold reusable domain logic and external integrations.",
    },
    {
      title: "Models",
      body: "Mongoose schemas, indexes, hooks, encryption transforms, and safe JSON behavior.",
    },
    {
      title: "Presenters",
      body: "Shape API-safe responses and mask sensitive output where needed.",
    },
  ],
  requestFlows: [
    {
      title: "Web request",
      items: [
        "Browser sends auth cookies",
        "Frontend attaches CSRF token on unsafe methods",
        "Express validates CORS and CSRF",
        "Auth middleware resolves user and active organization",
        "Role, permission, feature, and subscription checks run",
        "Controller queries MongoDB with tenant filters",
      ],
    },
    {
      title: "Mobile request",
      items: [
        "Capacitor bridge stores and provides auth tokens",
        "Frontend sends Authorization: Bearer <token>",
        "CSRF is bypassed for Bearer-token mobile requests",
        "Backend resolves user and organization from JWT",
        "Frontend retries one 401 through the mobile refresh endpoint",
      ],
    },
  ],
  architectureNotes: [
    {
      title: "Storage architecture",
      body: "Policy and license documents live in Cloudflare R2. New file records store full object keys such as storage_key or storagePrefix so editable business identifiers like policy numbers do not break file access. Download, delete, and email attachment flows prefer key-based access and fall back to legacy paths only for older records.",
    },
    {
      title: "Billing architecture",
      body: "Plans define seats, policy creation quota, upload quota, export access, analytics access, and audit-log access. Razorpay order IDs are bound to server-side purchase payloads before verification so the browser cannot change plan IDs, seat quantities, quota types, or pack counts during verification.",
    },
    {
      title: "Backup and legal architecture",
      body: "Backups snapshot selected MongoDB collections, gzip the JSON payload, and store it in R2 under a validated filename pattern. Legal documents are versioned records with draft, seed-current, publish, acceptance metrics, and dashboard consent enforcement.",
    },
  ],
  challenges: [
    {
      title: "Multi-tenant isolation",
      body: "Tenant-scoped resources include organizationId, and backend controllers/middleware enforce organization-aware queries. Frontend checks improve UX, but backend checks remain authoritative.",
    },
    {
      title: "Secure PII handling",
      body: "Selected sensitive fields are encrypted through model/service logic, masked for safer output where appropriate, and excluded from normal responses when exposure is not needed.",
    },
    {
      title: "Mutable policy numbers",
      body: "New and migrated files use stable storage_key values so editing a policy number does not break document view, download, delete, or email attachment flows.",
    },
    {
      title: "Web and mobile auth",
      body: "Browser requests use cookies with CSRF protection, while mobile requests use Bearer tokens from the native bridge with a separate refresh path.",
    },
    {
      title: "Multipart mobile uploads",
      body: "Mobile keeps multipart policy/license uploads in the normal WebView handling path, while the native bridge handles tokens, file saving, sharing, and app events.",
    },
    {
      title: "Billing and quota logic",
      body: "Billing-period policy and upload quotas, current-period add-ons, extra seats, optional renewals, and super-admin direct quota grants make subscription behavior match real customer needs.",
    },
    {
      title: "Payment verification safety",
      body: "Server-side billing order tracking lets Razorpay verification consume known order payloads and reject mismatched client input.",
    },
    {
      title: "Backup safety",
      body: "Backup filenames are validated against the generated filename pattern before R2 download, restore, or delete operations.",
    },
    {
      title: "Legal versioning",
      body: "Legal pages use draft/publish workflows, seeded current drafts, acceptance metrics, and dashboard legal consent enforcement instead of static pages only.",
    },
    {
      title: "Feature privacy",
      body: "License and email features stay hidden for organizations without access, while backend feature gates still protect the routes.",
    },
  ],
  securityDecisions: [
    "Environment variables are not exposed in the frontend.",
    "Protected routes prevent unauthorized access.",
    "Sensitive actions are handled through backend validation.",
    "Demo data should be used in screenshots instead of real user data.",
    "Backend authorization is authoritative; frontend role checks are UX only.",
    "Organization data access is scoped by tenant.",
    "Browser requests use CSRF protection.",
    "Mobile requests use Bearer tokens from native secure storage.",
    "Password hashes and sensitive auth fields are excluded from normal selection/JSON output.",
    "Selected PII fields are encrypted or masked.",
    "File access goes through authenticated backend routes or signed R2 URLs.",
    "Backup filenames are validated before download, restore, or delete.",
    "Razorpay verification uses server-side tracked orders.",
    "Feature gates protect license and email APIs.",
    "Audit logs track important user, file, billing, backup, legal, and organization operations.",
  ],
  lessons: [
    "How to design a real multi-tenant SaaS beyond simple CRUD screens.",
    "How to keep backend checks authoritative while still building role-aware frontend UX.",
    "Why stable file keys matter when business identifiers can change.",
    "How to support browser and Android WebView authentication in one product.",
    "How to handle subscription behavior with seats, quotas, renewals, add-ons, and admin overrides.",
    "How to build operational tools such as backups, diagnostics, legal publishing, and audit logs.",
    "How to debug production-style attachment bugs from logs and storage lookup paths.",
    "How to hide exclusive features from unauthorized organizations while still enforcing backend gates.",
  ],
};
