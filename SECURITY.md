# Security Blueprint - MatMind Application

*A comprehensive security guide for Next.js 15 + Prisma + PostgreSQL + Docker stack*

## 🚨 Critical Security Alert

### CVE-2025-29927 - Next.js Authentication Bypass
**SEVERITY: CRITICAL | IMMEDIATE ACTION REQUIRED**

Your current Next.js version (15.3.3) is vulnerable to CVE-2025-29927, which allows attackers to bypass middleware authentication with a single HTTP header.

**Attack Vector:**
```bash
curl -H "x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware" https://yourapp.com/protected-route
```

**Immediate Actions:**
1. Update Next.js to version 15.2.3 or later
2. Verify all middleware-protected routes are actually protected
3. Monitor logs for suspicious `x-middleware-subrequest` headers

**Update Command:**
```bash
npm update next@latest
npm audit fix
```

---

## 🔐 Authentication & JWT Security

### Current Status Analysis
**✅ Good Practices Already Implemented:**
- Password hashing with bcrypt
- JWT token with 1-hour expiration
- HTTP-only cookies with secure flags
- Input validation and sanitization
- Generic error messages to prevent user enumeration

**⚠️ Areas for Improvement:**

### 1. Implement Shorter Token Lifespans
```javascript
// Current: 1 hour (acceptable but can be improved)
.setExpirationTime("1h")

// Recommended: 15-30 minutes for enhanced security
.setExpirationTime("15m")
```

### 2. Add Refresh Token Rotation
**Implementation Priority: HIGH**

Create a refresh token system with rotation:

```javascript
// Add to User model in schema.prisma
model User {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  password     String
  role         String   @default("user")
  refreshToken String?  // Add this field
  createdAt    DateTime @default(now())
}
```

**Benefits:**
- Reduced risk if access tokens are compromised
- Automatic token invalidation on suspicious activity
- Better security for long-lived sessions

### 3. Enhanced Cookie Security
```javascript
response.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 900, // 15 minutes instead of 3600
  path: "/",
  domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined
});
```

---

## 🛡️ Application Security Headers

### Current Implementation Review
Your `next.config.js` already includes good security headers, but needs updates for 2025 standards.

### Enhanced Content Security Policy (CSP)
**Current CSP Issues:**
- Uses `'unsafe-eval'` and `'unsafe-inline'` (security risks)
- Missing nonce implementation

**Recommended Implementation:**
```javascript
// middleware.js - Enhanced with nonce generation
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' data: *.vercel.app cdn.weatherapi.com;
    font-src 'self' data:;
    connect-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', cspHeader)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  response.headers.set('Content-Security-Policy', cspHeader)
  return response
}
```

### Security Headers Checklist
```javascript
// next.config.js - Updated for 2025
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Remove X-XSS-Protection (deprecated in 2025)
        ],
      },
    ];
  },
};
```

---

## 🗄️ Database & API Security

### Prisma Security Hardening

#### 1. Connection Security
```javascript
// lib/prisma.js - Singleton pattern with connection limits
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

#### 2. Data Validation & Sanitization
```javascript
// Enhanced validation for API routes
import { z } from 'zod'; // Add zod for schema validation

const loginSchema = z.object({
  email: z.string().email().max(254).trim().toLowerCase(),
  password: z.string().min(8).max(128),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);
    // Continue with validated data...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }
    // Handle other errors...
  }
}
```

#### 3. SQL Injection Prevention
**✅ Already Protected:** Using Prisma ORM provides automatic SQL injection protection, but ensure:
- Never use raw SQL queries without proper escaping
- Always validate input before database operations
- Use Prisma's type-safe query methods

### API Rate Limiting
```javascript
// Add rate limiting middleware
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// Apply to login route
export async function POST(request) {
  // Apply rate limiting logic here
}
```

---

## 🐳 Container & Infrastructure Security

### Docker Security Hardening

#### 1. Base Image Security
```dockerfile
# Use specific Node.js version instead of 'latest'
FROM node:18-alpine

# Create non-root user
RUN adduser -D -s /bin/sh appuser

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies as root
RUN npm ci --only=production && npm cache clean --force

# Generate Prisma client
RUN npx prisma generate

# Copy application code
COPY . .

# Change ownership to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

#### 2. Multi-stage Build for Production
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
RUN adduser -D -s /bin/sh appuser
WORKDIR /app
COPY --from=builder --chown=appuser:appuser /app/.next ./.next
COPY --from=builder --chown=appuser:appuser /app/public ./public
COPY --from=builder --chown=appuser:appuser /app/package*.json ./
COPY --from=builder --chown=appuser:appuser /app/prisma ./prisma
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules

USER appuser
EXPOSE 3000
CMD ["npm", "start"]
```

#### 3. .dockerignore Security
```dockerignore
# Add these to your .dockerignore
.env
.env.local
.env.*.local
node_modules
.git
.gitignore
README.md
Dockerfile
.dockerignore
.next
coverage
.nyc_output
logs
*.log
```

### Container Runtime Security
```yaml
# docker-compose.yml security enhancements
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
    read_only: true
    tmpfs:
      - /tmp
    restart: unless-stopped
```

---

## 📋 OWASP Compliance Checklist

### OWASP Top 10 2021 Compliance

#### A01: Broken Access Control
- ✅ JWT middleware authentication implemented
- ✅ Role-based access control in database schema
- ⚠️ **Action Required:** Add API endpoint authorization checks
- ⚠️ **Action Required:** Implement resource-level permissions

#### A02: Cryptographic Failures
- ✅ HTTPS enforced with HSTS headers
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens properly signed
- ⚠️ **Action Required:** Add environment variable encryption at rest

#### A03: Injection
- ✅ SQL injection prevented with Prisma ORM
- ✅ Input validation implemented
- ⚠️ **Action Required:** Add XSS protection with proper CSP nonces
- ⚠️ **Action Required:** Sanitize all user inputs

#### A04: Insecure Design
- ✅ Security headers implemented
- ✅ Authentication design follows best practices
- ⚠️ **Action Required:** Add security testing to CI/CD pipeline

#### A05: Security Misconfiguration
- ⚠️ **Action Required:** Remove unnecessary error details in production
- ⚠️ **Action Required:** Add security scanning to deployment process
- ⚠️ **Action Required:** Implement security.txt file

#### A06: Vulnerable Components
- ⚠️ **Critical:** Update Next.js to patch CVE-2025-29927
- ⚠️ **Action Required:** Implement automated dependency scanning
- ⚠️ **Action Required:** Set up vulnerability alerts

#### A07: Identification and Authentication Failures
- ✅ Strong password hashing implemented
- ✅ JWT token expiration set
- ⚠️ **Action Required:** Add account lockout mechanism
- ⚠️ **Action Required:** Implement MFA option

#### A08: Software and Data Integrity Failures
- ⚠️ **Action Required:** Add package.json integrity checking
- ⚠️ **Action Required:** Implement code signing for deployments

#### A09: Security Logging and Monitoring Failures
- ⚠️ **Action Required:** Add comprehensive security logging
- ⚠️ **Action Required:** Implement intrusion detection
- ⚠️ **Action Required:** Set up security alerting

#### A10: Server-Side Request Forgery (SSRF)
- ✅ No external API calls in user-controlled contexts
- ⚠️ **Action Required:** Add URL validation if external requests are added

---

## 📊 Security Monitoring & Logging

### Implementation Plan

#### 1. Security Logging
```javascript
// lib/security-logger.js
export function logSecurityEvent(event, details, request = null) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    ip: request?.ip || 'unknown',
    userAgent: request?.headers?.['user-agent'] || 'unknown',
    url: request?.url || 'unknown',
  };
  
  // In production, send to security monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Send to your monitoring service (e.g., DataDog, Sentry)
    console.log('SECURITY_EVENT:', JSON.stringify(logEntry));
  } else {
    console.warn('Security Event:', logEntry);
  }
}

// Usage in login route
logSecurityEvent('login_attempt', { email: sanitizedEmail, success: false }, request);
```

#### 2. Vulnerability Scanning Setup
```json
// package.json - Add security scripts
{
  "scripts": {
    "security:audit": "npm audit --audit-level=moderate",
    "security:check": "npm run security:audit && npm run lint:security",
    "lint:security": "eslint . --config .eslintrc.security.js"
  }
}
```

#### 3. Dependency Monitoring
```bash
# Add to CI/CD pipeline
npm install --save-dev audit-ci
```

---

## 🔄 Regular Security Maintenance

### Weekly Tasks
- [ ] Review dependency vulnerabilities
- [ ] Check security logs for anomalies
- [ ] Verify backup integrity
- [ ] Test authentication flows

### Monthly Tasks
- [ ] Update all dependencies
- [ ] Review and rotate API keys
- [ ] Audit user permissions
- [ ] Security penetration testing
- [ ] Review CSP violations (if any)

### Quarterly Tasks
- [ ] Security architecture review
- [ ] Update security documentation
- [ ] Team security training
- [ ] Third-party security audit
- [ ] Disaster recovery testing

---

## 🚀 Implementation Priority

### Phase 1: Critical (Implement Immediately)
1. Update Next.js to patch CVE-2025-29927
2. Implement enhanced CSP with nonces
3. Add refresh token rotation
4. Harden Docker configuration

### Phase 2: High Priority (Within 2 weeks)
1. Add comprehensive security logging
2. Implement rate limiting
3. Set up vulnerability scanning
4. Add input validation with Zod

### Phase 3: Medium Priority (Within 1 month)
1. Complete OWASP compliance checklist
2. Add automated security testing
3. Implement monitoring and alerting
4. Create incident response plan

---

## 📞 Emergency Response

### Security Incident Procedure
1. **Immediate Response**
   - Isolate affected systems
   - Preserve logs and evidence
   - Notify stakeholders

2. **Assessment**
   - Determine scope of breach
   - Identify compromised data
   - Document timeline

3. **Remediation**
   - Apply security patches
   - Reset compromised credentials
   - Update security measures

4. **Recovery**
   - Restore services safely
   - Monitor for continued threats
   - Conduct post-incident review

---

**This security blueprint should be reviewed and updated regularly as new threats emerge and your application evolves.**

*Last Updated: 2025-08-04*