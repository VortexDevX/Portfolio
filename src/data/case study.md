# CASE STUDY: AUTOSECURE

## 1. Project Title

**AutoSecure - Multi-Tenant Insurance Operations, Document, Billing, and Compliance SaaS Platform**

## 2. Quick Overview

AutoSecure is a commercial B2B SaaS platform built for insurance agencies to manage vehicle insurance policy records, license records, customer documents, renewal workflows, structured exports, billing, legal acceptance, backups, and audit workflows from one secure workspace.

The product has three main surfaces:

1. **Public website and legal pages** for visitors, authentication entry points, support, and published policy documents.
2. **Organization dashboard** for agency owners, admins, and users managing day-to-day insurance operations.
3. **Super-admin console** for platform operators managing organizations, feature access, plans, backups, legal versions, diagnostics, and global settings.

AutoSecure also supports an Android mobile app through a Capacitor wrapper. The mobile layer reuses the web frontend while adding native secure token storage, file save/share behavior, network/app-state events, and Android back-button handling.

The source code repository is private because this is a commercial SaaS product with active business logic, infrastructure configuration, and proprietary implementation details.

## 3. Problem It Solves

Many insurance agencies manage policies, license records, renewals, documents, payments, and team access across spreadsheets, local folders, messaging apps, email threads, and manual notes.

This creates real operational problems:

- Records are difficult to search, filter, audit, and export.
- Renewal follow-ups can be missed.
- Customer documents are hard to organize safely.
- Mutable identifiers like policy numbers can break file references when used directly in storage paths.
- Team access is difficult to control in a shared workflow.
- Owners lack clear visibility into policy, license, branch, dealer, executive, customer, vehicle, and financial activity.
- SaaS-level operations such as billing, quotas, backups, legal versioning, and super-admin controls are missing from manual systems.
- Mobile access introduces extra auth and file-handling constraints that normal browser-only systems do not solve.

## 4. Solution It Gives

AutoSecure replaces scattered manual workflows with a centralized multi-tenant platform.

The backend is the source of truth for authentication, authorization, tenant isolation, feature access, subscription limits, quota enforcement, file access, and sensitive operations. The frontend adapts the interface to each user's role and organization access, while backend middleware and controllers enforce the actual rules.

The platform provides:

- A policy lifecycle system for creating, editing, filtering, viewing, emailing, exporting, and tracking insurance policy records.
- A license management module that is visible only when enabled for the organization.
- Secure document storage in Cloudflare R2 with stable `storage_key` references.
- Renewal visibility through dashboards, reminders, calendar/event data, and notifications.
- Billing support for monthly/annual plans, extra seats, current-period policy quota, and current-period upload quota.
- Super-admin operations for organizations, plans, backups, diagnostics, legal documents, feature gates, and direct quota grants.
- Web and mobile auth flows that fit each runtime instead of forcing one session model everywhere.

## 5. Features

- Multi-tenant organization workspaces
- Role-based access for `super_admin`, `org_owner`, `org_admin`, and `org_user`
- Policy creation wizard
- Policy listing, search, filters, details, editing, and deletion
- Policy document upload for Aadhaar, PAN, and other documents
- Stable key-based policy document storage
- Duplicate policy number checks within the same organization
- Editable policy numbers with safer decoupled file references
- License management behind organization feature access
- License document uploads and renewal tracking
- Email sending with selected stored documents and uploaded attachments
- Email logs and email history where email access is enabled
- Notification center with legal updates, announcements, and renewal alerts
- Dashboard renewal counters for policies and licenses
- Analytics by policies, licenses, branches, dealers, executives, customers, vehicles, and finance
- Excel exports based on plan permissions
- Organization user management
- Profile and session management
- Audit logs for important actions
- Subscription plans with monthly/annual billing
- Per-period policy creation quota
- Per-period upload storage quota
- Current-period policy/storage quota add-ons
- Extra seat purchases and optional renewal handling
- Super-admin direct quota grants
- Super-admin organization management and feature bypasses
- Organization deletion request and cancellation workflow
- Backup create, list, download, restore, delete, and backup settings
- Legal document draft, publish, seed-current, and acceptance tracking
- Site branding, maintenance, security, email, integrations, and support settings
- Android mobile bridge for native token and file behavior

## 6. Tech Stack

### Frontend and Mobile

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Axios API client and interceptors
- React Hook Form
- Zod
- Framer Motion
- Recharts
- SWR
- Capacitor for Android wrapper and native bridge behavior

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT authentication
- Cookie-based browser auth
- Bearer-token mobile auth
- CSRF protection for browser requests
- Role, permission, subscription, and feature middleware
- Multer for multipart uploads
- Helmet and CORS controls
- Express rate limiting

### Storage and Integrations

- Cloudflare R2 through S3-compatible SDK
- Resend for transactional email
- Razorpay for payment orders and verification
- PDFKit for invoice PDF generation
- ExcelJS for exports
- bcrypt for password hashing
- TOTP/MFA support

## 7. Architecture Overview

```txt
Browser / Android WebView
        |
        v
Next.js frontend
        |
        | Web: cookies + CSRF header
        | Mobile: Bearer token from native bridge
        v
Express API under /api/v1
        |
        +-- MongoDB via Mongoose
        +-- Cloudflare R2 for documents and backups
        +-- Resend for transactional email
        +-- Razorpay for billing payments
        +-- Backup scheduler
        +-- Legal/versioning services
```

### Backend Layers

- **Routes:** API URL shape and middleware ordering.
- **Middleware:** Auth, CSRF, rate limits, subscription guards, feature gates, permissions, and error handling.
- **Controllers:** Request parsing, validation, tenant-aware use-case orchestration.
- **Services:** Reusable domain logic and external integrations.
- **Models:** Mongoose schemas, indexes, hooks, encryption transforms, and safe JSON behavior.
- **Presenters:** API-safe response shaping and masking where needed.

### Request Flow

Typical web request:

1. Browser sends auth cookies.
2. Frontend attaches CSRF token on unsafe methods.
3. Express validates CORS and CSRF.
4. Auth middleware resolves the user and active organization.
5. Role, permission, feature, and subscription checks run.
6. Controller queries MongoDB with tenant filters.
7. API response is shaped and returned to the frontend.

Typical mobile request:

1. Capacitor bridge stores and provides auth tokens.
2. Frontend sends `Authorization: Bearer <token>`.
3. CSRF protection is bypassed for Bearer-token mobile requests.
4. Backend resolves the user and organization from JWT.
5. Frontend retries one 401 through the mobile refresh endpoint.

### Storage Architecture

Policy and license documents are stored in Cloudflare R2. New file records store full object keys in fields such as `storage_key` or `storagePrefix`. This decouples files from editable business identifiers such as policy numbers.

Download and email attachment flows prefer key-based storage access and fall back to legacy path access only for old records.

### Billing Architecture

Plans define included seats, policy creation quota per billing period, upload quota per billing period, export access, analytics access, and audit-log access.

Billing orders bind Razorpay order IDs to server-side purchase payloads before verification. This prevents the browser from changing plan IDs, seat quantities, quota types, or pack counts during payment verification.

Quota behavior:

- Policy creation quota resets every billing period.
- Upload quota resets every billing period.
- Unused quota does not carry forward.
- Current-period policy/storage add-ons expire at period end.
- Extra seats can be optionally renewed with the next plan payment.
- Super admins can directly add current-period quota to an organization.

### Backup and Legal Architecture

Backups snapshot selected MongoDB collections, gzip the JSON payload, and store the result in Cloudflare R2 under a validated backup filename pattern.

Legal documents are stored as versioned records. Super admins can create drafts, seed current legal pages as drafts, publish versions, and view acceptance metrics. Dashboard users can be blocked by a legal consent modal until required documents are accepted.

## 8. Screenshots

Screenshots to add later:

- `01-public-home.png`
- `02-login.png`
- `03-dashboard-overview.png`
- `04-policy-list.png`
- `05-policy-create-wizard.png`
- `06-policy-detail.png`
- `07-send-email-modal.png`
- `08-billing-page.png`
- `09-super-admin-dashboard.png`
- `10-super-admin-organizations.png`
- `11-super-admin-legal-versioning.png`
- `12-mobile-app.png`

## 9. Challenges & What You Solved

### Multi-Tenant Isolation

**Challenge:** Insurance data is organization-specific, and raw ID-based lookups could accidentally expose another tenant's records.

**Solution:** Tenant-scoped resources include `organizationId`, and backend controllers/middleware enforce organization-aware queries. Frontend checks improve UX, but backend checks are authoritative.

### Secure PII Handling

**Challenge:** Policy and license records may contain sensitive customer information such as identifiers, mobile numbers, nominee information, and document references.

**Solution:** Selected sensitive fields are encrypted through model/service logic, masked for safer output where appropriate, and excluded from normal responses when they should not be exposed.

### Mutable Policy Number vs File Storage

**Challenge:** If files are stored only under a policy number path, editing the policy number can break document links.

**Solution:** New and migrated files use stable `storage_key` values. File view, download, delete, and email attachment flows prefer key-based access instead of relying on mutable policy numbers.

### Web and Mobile Auth Differences

**Challenge:** Browser cookies and CSRF protection work well for web, but mobile WebView flows need a different token model.

**Solution:** Web requests use cookies with CSRF protection, while mobile requests use Bearer tokens stored through the native bridge. The frontend API client handles refresh retries for both modes.

### Multipart Uploads on Mobile

**Challenge:** Capacitor HTTP interception can corrupt multipart policy/license uploads.

**Solution:** Mobile keeps multipart uploads in the normal WebView/browser handling path, while the native bridge handles tokens, file saving, sharing, and app events.

### Billing and Quota Logic

**Challenge:** Fixed plan limits do not match real subscription behavior where customers expect fresh quota each billing period.

**Solution:** Added billing-period quota tracking for policy creation and upload storage, current-period add-ons, extra seat purchases, optional seat renewal, and super-admin direct quota grants.

### Payment Verification Safety

**Challenge:** Payment verification should not trust frontend-submitted plan, quantity, or quota data.

**Solution:** Added server-side billing order tracking so Razorpay verification consumes a known order payload and rejects mismatched client input.

### Backup Safety

**Challenge:** Backup download, restore, and delete operations can become dangerous if filenames are not validated.

**Solution:** Backup filenames are validated against the generated filename pattern before R2 access.

### Legal Versioning

**Challenge:** Static legal pages do not provide version control or user acceptance history.

**Solution:** Added legal draft/publish workflows, seeded current drafts, acceptance metrics, and dashboard legal consent enforcement.

### Feature Privacy

**Challenge:** License and email features are exclusive and should not be visible to organizations without access.

**Solution:** The UI hides license/email mentions for organizations without access, and backend feature gates still protect routes.

## 10. Security/Privacy Decisions

Security Considerations:

- Source code is kept private due to commercial SaaS development.
- Environment variables are not exposed in the frontend.
- Protected routes prevent unauthorized access.
- Sensitive user actions are handled through backend validation.
- Demo data is used in screenshots instead of real user data.

Additional security and privacy decisions:

- Backend authorization is authoritative; frontend role checks are not trusted as security.
- Organization data access is scoped by tenant.
- Browser requests use CSRF protection.
- Mobile requests use Bearer tokens from native secure storage.
- Password hashes and sensitive auth fields are excluded from normal selection/JSON output.
- Selected PII fields are encrypted or masked.
- File access goes through authenticated backend routes or signed R2 URLs.
- Backup filenames are validated before download, restore, or delete.
- Razorpay verification uses server-side tracked orders.
- Feature gates protect license and email APIs.
- Audit logs track important user, file, billing, backup, legal, and organization operations.

## 11. What I Learned

- How to design a real multi-tenant SaaS beyond simple CRUD screens.
- How to keep backend checks authoritative while still building role-aware frontend UX.
- How mutable business identifiers can break storage architecture and why stable file keys matter.
- How to support browser and Android WebView authentication in one product.
- How to handle subscription behavior with seats, quotas, renewals, add-ons, and admin overrides.
- How to build operational tools such as backups, diagnostics, legal publishing, and audit logs.
- How to debug production-style issues from logs, such as selected email attachments reaching the backend but failing because storage lookup still used old paths.
- How to hide exclusive features from unauthorized organizations while still enforcing backend gates.

## 12. Links

Live Link:

- `https://your-live-link-here.com`

Resume Link:

- `https://your-resume-link-here.com`

Repository:

- Private commercial repository
