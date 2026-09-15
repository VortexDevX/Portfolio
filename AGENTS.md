# Portfolio Agent Instructions

## Package Manager

- Use npm and committed `package-lock.json`: `npm install`, `npm run dev`.

## File-Scoped Commands

| Task               | Command                                        |
| ------------------ | ---------------------------------------------- |
| Lint               | `npx eslint path/to/file.tsx --max-warnings=0` |
| Build              | `npm run build`                                |
| Dead-code analysis | `npm run analyze`                              |

## Experience Contracts

- Preserve dual surfaces: desktop uses WebGL/React Three Fiber; mobile is touch-first and zero-WebGL.
- Do not force desktop canvas onto mobile or replace both surfaces with a generic shared card page.
- Keep terminal/brutalist cinematic identity, but prioritize readable project facts, navigation, contact, and reduced motion.
- Dispose Three.js resources/listeners/animation frames; cap DPR and effects for stable GPU/memory use.
- Every portfolio claim, project link, technology, metric, and availability statement must be factual and current.

## Contact and Secrets

- User-entered name/email/message remain request data, not deployment configuration.
- Resend key and sender/site-owner delivery settings remain server-only; never expose them through client env or logs.
- Validate input, rate-limit, handle delivery failure honestly, and never show success before provider acceptance.

## Verification

- Run lint with zero warnings, build, and analyze after structural changes.
- Browser-test desktop fine-pointer WebGL and mobile touch surface separately: navigation, project modal/cards, contact success/failure, reduced motion, keyboard, console, performance, and overflow.
- Build success alone does not prove GPU experience or email delivery; state live boundaries.

## Git

- Only commit or push changes when explicitly requested.
- Before committing, inspect the exact diff and perform a secret scan.
- Write concise, direct commit messages that clearly describe what changed.
- Keep commit subjects natural and human-readable.
- Do not use conventional commit prefixes such as `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `perf:`, or `test:`.
- Avoid vague or generic messages such as `changes`, `updates`, `fix stuff`, or `AI changes`.

## Commit Attribution

- AI agents MUST NOT add `Co-Authored-By` trailers to commits.
- AI agents MUST NOT include their model name, agent name, vendor name, or other AI attribution in commit messages.
- All commits MUST use the user's existing Git author and committer identity.
- NEVER modify `user.name` or `user.email`.
- Do not add `Co-authored-by`, `Co-Authored-By`, or any equivalent attribution trailer unless explicitly requested by the user.
- Before committing, verify that the commit message contains no AI attribution trailer.

## Commit Message Style

- Write commit messages as a developer would naturally describe the change.
- Use a single concise subject line by default.
- Describe the primary user-facing or code-level change directly.
- Do not use conventional commit prefixes such as `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `perf:`, or `test:`.
- Do not automatically add bullet points, summaries, implementation details, or a commit body.
- Add a commit body only when the change is complex enough that the subject alone cannot reasonably explain it.
- Keep the subject specific, concise, and natural.
- Avoid vague, generic, robotic, or overly polished wording.
- Do not mention AI assistance, prompts, agents, models, or automated generation unless explicitly requested.
