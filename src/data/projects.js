import { autosecureCaseStudy } from "./autosecureCaseStudy";

const autosecureProjectFeatures = [
  "Multi-tenant organization architecture",
  "Subscription and quota enforcement system",
  "Secure document storage with decoupled identifiers",
  "Audit logging for compliance and traceability",
];

export const projects = [
  {
    id: 1,
    title: autosecureCaseStudy.title.toUpperCase(),
    frontendTexture: "/texture/dashboard.webp",
    caseStudy: "autosecure",
    backendData: {
      sys_arch: "Multi-Tenant SaaS // Organization Dashboard // Super-Admin",
      db_matrix: autosecureCaseStudy.stack.integrations
        .slice(0, 4)
        .join(" // "),
      deploy_node: "Public_Website // Agency_Workspace // Android_App",
      outcome: "PRODUCTION_SAAS_FOR_POLICY_AND_LICENSE_OPERATIONS",
      description:
        "A production-ready multi-tenant SaaS platform built for managing insurance policies and licenses across multiple organizations. Features include organization-based data isolation, role-based access control, subscription management, audit logs, secure document storage, reminders, and an admin dashboard designed for real-world usage.",
      features: autosecureProjectFeatures,
    },
    links: {
      live: autosecureCaseStudy.liveUrl,
    },
  },
  {
    id: 2,
    title: "SHADOWCORE",
    frontendTexture: "/texture/shadowcore.webp",
    backendData: {
      sys_arch: "Next.js 16 // Express // Discord.js v14",
      db_matrix: "MongoDB // Discord_API // Socket.IO",
      deploy_node: "Node.js // Single_Guild_Runtime",
      outcome: "REAL_TIME_DISCORD_OPERATIONS_SYSTEM",
      description:
        "A real-time Discord management platform built for handling server operations, automation, moderation tools, and live interactions through Discord's API.",
      features: [
        "Real-time event propagation between bot runtime, API, and dashboard",
        "Backend-enforced Discord role access across protected APIs",
        "Audit timeline for moderation, role, and configuration changes",
        "Modular service boundaries for guild configuration and operations",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/ShadowCore",
      live: "NOT_DEPLOYED",
    },
  },
  {
    id: 3,
    title: "LUXORA",
    frontendTexture: "/texture/luxora.webp",
    backendData: {
      sys_arch: "Express // Next.js // Redux Toolkit // TypeScript",
      db_matrix: "MongoDB // Cloudinary // Brevo_SMTP",
      deploy_node: "Local // Node_Server",
      outcome: "FULL_STACK_PRODUCTION_READY_COMMERCE_PLATFORM",
      description:
        "Luxora is a full-stack e-commerce platform with distinct shopper, seller, and admin surfaces built on a shared Express + MongoDB backend. It handles catalog management, order workflows, promotions, sponsored listings, and transactional email via Brevo SMTP. Solves the multi-role commerce problem with clean domain separation and media-optimized delivery through Cloudinary.",
      features: [
        "Architected three separate role surfaces with scoped API domains and Redux Toolkit state slices per surface",
        "Integrated Cloudinary media pipeline for product image upload, transformation, and CDN delivery",
        "Built transactional and admin email system using Brevo SMTP with templated order and notification flows",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/E-Commerce",
      live: "NOT_DEPLOYED",
    },
  },
  {
    id: 4,
    title: "CHRONICLE",
    frontendTexture: "/texture/chronicle.webp",
    backendData: {
      sys_arch: "Next.js 14 // React 18 // Zustand",
      db_matrix: "MongoDB // AniList // Jikan // MangaDex",
      deploy_node: "Vercel // Serverless_API",
      outcome: "SELF_HOSTED_MEDIA_DATA_SYSTEM",
      description:
        "A self-hosted media tracking platform for organizing anime, manga, manhwa, novels, and more with progress tracking, ratings, custom collections, and a clean reading experience.",
      features: [
        "Metadata ingestion with AniList primary lookup and Jikan/MangaDex fallbacks",
        "Image proxy and cover caching for stable external media rendering",
        "JSON import/export path for portable self-hosted data",
        "Indexed library views for progress, status, stale entries, and revisit queues",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/Chronicle",
      live: "https://chroniclex.vercel.app/",
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
      outcome: "TOURNAMENT_STATE_AND_BRACKET_CONTROLLER",
      description:
        "A tournament management platform built to handle brackets, match progression, standings, and event organization with a focus on predictable state management.",
      features: [
        "Bracket state engine with BYE handling and winner advancement",
        "Map veto workflow with controlled progression and validation",
        "Score validation that rejects ties and impossible endings",
        "Public read models for event, team, match, and bracket views",
      ],
    },
    links: {
      github: "https://github.com/VortexDevX/valorant-circuit",
      live: "https://valorant-circuit.vercel.app",
    },
  },
];
