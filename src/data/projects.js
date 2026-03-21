export const projects = [
  {
    id: 1,
    title: "AUTOSECURE",
    frontendTexture: "/texture/AUTOSECURE.webp",
    backendData: {
      sys_arch: "Electron // Next.js // Express // TypeScript",
      db_matrix: "MongoDB // AWS_S3",
      deploy_node: "Local // Electron_Desktop // Node_Server",
      outcome: "CROSS_PLATFORM SECURITY_COMPLIANCE_DESKTOP_SUITE",
      description: "AutoSecure is a full-stack automobile insurance policy management platform with desktop and web surfaces. It handles the complete policy lifecycle — creation, auditing, analytics, and role-based access — with enterprise-grade auth. Solves the operational complexity of insurance workflows through a unified Electron + web delivery model.",
      features: [
        "Implemented dual-surface architecture: Electron desktop app + Next.js web frontend sharing a single Express/MongoDB backend",
        "Built TOTP + JWT authentication pipeline with granular role-based access control and full audit logging",
        "Engineered analytics and reporting modules with PDF/export support and admin-controlled site settings"
      ]
    },
    links: { github: "https://github.com/VortexDevX/autosecure", live: "NOT_DEPLOYED" },
  },
  {
    id: 2,
    title: "EMPLOYEE_MANAGEMENT",
    frontendTexture: "/texture/EMPLOYEE_MANAGEMENT.webp",
    backendData: {
      sys_arch: "Express // Prisma // Flask // React // Python",
      db_matrix: "PostgreSQL // MySQL // SQLite",
      deploy_node: "Local // Docker // Nginx",
      outcome: "ENTERPRISE_GRADE WORKFORCE_INTELLIGENCE_PLATFORM",
      description: "EmployeeManagement is a multi-service workforce platform spanning telemetry collection, ML prediction, gateway control, and a role-based web dashboard. The local agent silently monitors foreground app usage and network activity, shipping telemetry to a VPS backend for processing. Solves end-to-end employee productivity visibility from raw OS-level data to actionable ML-driven insights.",
      features: [
        "Built a cross-platform Python background agent (PyInstaller exe) capturing foreground app + domain-level network telemetry with SQLite buffering",
        "Designed a service-mesh architecture: employee-api, pi-gateway, workforce-ml, and frontend operating as independent deployable units",
        "Engineered a scikit-learn ML pipeline for productivity prediction from raw telemetry feature vectors"
      ]
    },
    links: { github: "https://github.com/VortexDevX/LMA", live: "NOT_DEPLOYED" },
  },
  {
    id: 3,
    title: "LUXORA",
    frontendTexture: "/texture/LUXORA.webp",
    backendData: {
      sys_arch: "Express // Next.js // Redux Toolkit // TypeScript",
      db_matrix: "MongoDB // Cloudinary // Brevo_SMTP",
      deploy_node: "Local // Node_Server",
      outcome: "FULL_STACK PRODUCTION_READY_COMMERCE_PLATFORM",
      description: "Luxora is a full-stack e-commerce platform with distinct shopper, seller, and admin surfaces built on a shared Express + MongoDB backend. It handles catalog management, order workflows, promotions, sponsored listings, and transactional email via Brevo SMTP. Solves the multi-role commerce problem with clean domain separation and media-optimized delivery through Cloudinary.",
      features: [
        "Architected three separate role surfaces (shopper, seller, admin) with scoped API domains and Redux Toolkit state slices per surface",
        "Integrated Cloudinary media pipeline for product image upload, transformation, and CDN delivery",
        "Built transactional + admin email system using Brevo SMTP with templated order/notification flows"
      ]
    },
    links: { github: "https://github.com/VortexDevX/E-Commerce", live: "NOT_DEPLOYED" },
  },
  {
    id: 4,
    title: "NOCTURNE_ARCHIVE",
    frontendTexture: "/texture/NOCTURNE-ARCHIVE.webp",
    backendData: {
      sys_arch: "Next.js 16 // React 19 // TypeScript // Tailwind 4",
      db_matrix: "MongoDB // Mongoose // Dexie_IndexedDB",
      deploy_node: "Local // Node_Server",
      outcome: "OFFLINE_FIRST PERSONAL_NOVEL_SANCTUARY_PLATFORM",
      description: "Nocturne Archive is a library-oriented TXT/EPUB reading platform with account-based sync, offline-first architecture, and a distraction-free reading experience. It blends local IndexedDB persistence via Dexie with remote MongoDB sync for a seamless online/offline hybrid flow. Solves the personal novel library problem with full progress tracking, shelf management, and a privacy-respecting reading environment.",
      features: [
        "Implemented offline-first hybrid sync using Dexie/IndexedDB locally with MongoDB/Mongoose remote fallback",
        "Built EPUB parsing pipeline with JSZip for client-side extraction, chapter segmentation, and in-browser rendering",
        "Designed full library management system: progress tracking, shelf organization, import/export, and profile/auth"
      ]
    },
    links: { github: "https://github.com/VortexDevX/nocturne-archive", live: "NOT_DEPLOYED" },
  },
  {
    id: 5,
    title: "DUNGEON_GATE",
    frontendTexture: "/texture/DUNGEON_GATE.webp",
    backendData: {
      sys_arch: "FastAPI // React // Vite // Celery",
      db_matrix: "PostgreSQL // Redis // Prometheus",
      deploy_node: "Local // Docker // Docker_Compose",
      outcome: "DETERMINISTIC REAL_TIME_GAME_ECONOMY_ENGINE",
      description: "Dungeon Gate is a simulation-first closed-loop market game engine with tick-based world updates and strict economy conservation invariants. It models treasury, player, and guild economic flows through a deterministic transactional pipeline with anti-exploit controls. Solves the integrity problem of virtual economies by enforcing total-conservation accounting at every simulation tick.",
      features: [
        "Built a deterministic tick-based simulation worker with seed/replay capability and total economy conservation enforcement",
        "Engineered a real-time WebSocket market feed backed by Redis pub/sub for live price and event streaming",
        "Integrated Celery task queue with Prometheus/Grafana observability stack for simulation health monitoring"
      ]
    },
    links: { github: "https://github.com/VortexDevX/gate-economy", live: "NOT_DEPLOYED" },
  }
];
