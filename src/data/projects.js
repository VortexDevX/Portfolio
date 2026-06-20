export const projects = [
  {
    id: 1,
    title: "AUTOSECURE",
    frontendTexture: "/texture/autosecure.webp",
    backendData: {
      sys_arch: "Next.js 16 // Express 5 // TypeScript",
      db_matrix: "MongoDB // Mongoose // S3/R2 // Brevo",
      deploy_node: "Node.js // Local_or_Server",
      outcome: "INSURANCE_AND_LICENSE_OPERATIONS_PLATFORM",
      description:
        "AutoSecure is a full-stack operations platform for automobile insurance agencies. It manages policies, driving license records, documents, payments, renewals, analytics, exports, templates, and user permissions from one secure dashboard.",
      features: [
        "Policy and license workflows cover multi-step data entry, document uploads, payment tracking, renewal messages, advanced filters, search, and XLSX exports",
        "Owner, admin, and user roles are backed by granular permissions, TOTP 2FA, password-reset OTPs, audit logs, and a site-wide kill switch",
        "Analytics surfaces revenue trends, policy and license breakdowns, branch performance, renewal calendars, and date-range reporting with Recharts",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/AutoSecure",
      live: "NOT_DEPLOYED",
    },
  },
  {
    id: 2,
    title: "CHRONICLE",
    frontendTexture: "/texture/chronicle.webp",
    backendData: {
      sys_arch: "Next.js 14 // React 18 // Zustand",
      db_matrix: "MongoDB // AniList // Jikan // MangaDex",
      deploy_node: "Vercel // Serverless_API",
      outcome: "SELF_HOSTED_MEDIA_TRACKER",
      description:
        "Chronicle is a self-hosted tracker for anime, manhwa, donghua, and light novels. It combines library management, progress tracking, metadata lookup, cover caching, import/export, and statistics in a responsive media dashboard.",
      features: [
        "Library tools support create, edit, delete, progress increments, ratings, notes, search, filters, sorting, pagination, JSON import, and JSON export",
        "Metadata lookup uses AniList as the primary source, Jikan as the anime fallback, MangaDex for manhwa covers, and image proxy routes for high-quality cached artwork",
        "Organization features include status/type analytics, stale-entry alerts, Droppedyard for dropped titles, and a Maybe Revisit queue for entries worth checking again",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/Chronicle",
      live: "https://chroniclex.vercel.app/",
    },
  },
  {
    id: 3,
    title: "LUXORA",
    frontendTexture: "/texture/luxora.webp",
    backendData: {
      sys_arch: "Next.js 15 // Express 5 // Redux Toolkit",
      db_matrix: "MongoDB // Mongoose // Cloudinary // Brevo",
      deploy_node: "Node.js // Local_or_Server",
      outcome: "MULTI_ROLE_ECOMMERCE_SYSTEM",
      description:
        "Luxora is a full-stack e-commerce application with separate shopper, seller, and admin workspaces. It covers catalog browsing, cart and checkout flows, order handling, returns, promotions, media management, email templates, and operational analytics.",
      features: [
        "Storefront and shopper flows include product discovery, categories, filters, reviews, banners, sponsored products, cart, coupons, checkout, orders, wishlist, profile, and addresses",
        "Seller and admin areas manage products, orders, returns, users, categories, coupons, media, banners, sponsored placements, email templates, logs, and analytics",
        "Authentication uses JWT access and refresh tokens with role checks, password reset, optional hCaptcha, and admin or subadmin two-factor verification",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/E-Commerce",
      live: "NOT_DEPLOYED",
    },
  },
  {
    id: 4,
    title: "SHADOWCORE",
    frontendTexture: "/texture/shadowcore.webp",
    backendData: {
      sys_arch: "Next.js 16 // Express // Discord.js v14",
      db_matrix: "MongoDB // Discord_API // Socket.IO",
      deploy_node: "Node.js // Single_Guild_Runtime",
      outcome: "DISCORD_SERVER_OPERATIONS_PANEL",
      description:
        "ShadowCore is a single-guild Discord management dashboard with a Next.js client, Express API, Discord.js bot runtime, shared contracts, and Socket.IO live updates. It turns moderation, roles, configuration, automations, announcements, analytics, and audit logs into a web control panel.",
      features: [
        "Moderation tools cover kick, ban, timeout, unban, member history, live event updates, and a filterable audit timeline with structured details",
        "Role and configuration modules support role CRUD, assignment, logging channels, moderation defaults, welcome and leave settings, and anti-spam controls",
        "Discord OAuth2 and session cookies gate access by configured guild roles while the API, bot, database, and realtime socket layer keep dashboard state synced",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/ShadowCore",
      live: "NOT_DEPLOYED",
    },
  },
  {
    id: 5,
    title: "VALORANT_CIRCUIT",
    frontendTexture: "/texture/valo-circuit.webp",
    backendData: {
      sys_arch: "Next.js 16 // React 19 // TypeScript",
      db_matrix: "MongoDB // Zod // Jose",
      deploy_node: "Vercel // Serverless",
      outcome: "VALORANT_TOURNAMENT_CONTROLLER",
      description:
        "Valorant Circuit is a tournament controller for small Valorant events. It gives organizers public event pages, team pages, bracket views, admin login, series creation, map veto control, score entry, and single-elimination bracket advancement.",
      features: [
        "Public routes expose tournament overview, upcoming matches, bracket summaries, team histories, and live bracket pages for viewers",
        "Admin workflows manage series matchups, bracket creation, bracket locking, map-pool selection, veto progress, result entry, and winner advancement",
        "Core logic in bracket, series, and validator modules handles BYEs, derived series status, Valorant score rules, and rejection of ties or impossible endings",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/valorant-circuit",
      live: "https://valorant-circuit.vercel.app",
    },
  },
];
