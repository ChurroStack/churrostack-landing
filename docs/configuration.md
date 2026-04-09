# Configuration

All application configuration is done via environment variables. In local development, use a `.env` file in the project root. In production (Kubernetes), inject these via Secrets and ConfigMaps.

## Environment Variables

### Microsoft Graph Email (Required for contact form)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `AZURE_TENANT_ID` | Yes | Microsoft Entra ID (Azure AD) tenant ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `AZURE_CLIENT_ID` | Yes | Application (client) ID from app registration | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `AZURE_CLIENT_SECRET` | Yes | Client secret value (not the secret ID) | `your-secret-value` |
| `AZURE_MAIL_FROM` | Yes | Sender email address (must be a valid mailbox in the tenant) | `noreply@churrostack.com` |
| `CONTACT_EMAIL_TO` | Yes | Recipient email for demo requests | `sales@churrostack.com` |

See [email-setup.md](./email-setup.md) for step-by-step Azure configuration.

### Next.js

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | No | Runtime environment | `production` |
| `PORT` | No | HTTP port (default: `3000`) | `3000` |

## Local Development

Create a `.env` file in the project root:

```env
# Microsoft Graph — Email
AZURE_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_SECRET=your-client-secret-value
AZURE_MAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL_TO=sales@yourdomain.com
```

> **Note:** `.env` is already in `.gitignore`. Never commit secrets to version control.

## Kubernetes Deployment

### Secret (sensitive values)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: churrostack-landing-secrets
  namespace: churrostack
type: Opaque
stringData:
  AZURE_TENANT_ID: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  AZURE_CLIENT_ID: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  AZURE_CLIENT_SECRET: "your-client-secret-value"
```

### ConfigMap (non-sensitive values)

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: churrostack-landing-config
  namespace: churrostack
data:
  AZURE_MAIL_FROM: "noreply@churrostack.com"
  CONTACT_EMAIL_TO: "sales@churrostack.com"
  NODE_ENV: "production"
```

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: churrostack-landing
  namespace: churrostack
  labels:
    app: churrostack-landing
spec:
  replicas: 2
  selector:
    matchLabels:
      app: churrostack-landing
  template:
    metadata:
      labels:
        app: churrostack-landing
    spec:
      containers:
        - name: landing
          image: churrostack/landing:latest
          ports:
            - containerPort: 3000
              protocol: TCP
          envFrom:
            - secretRef:
                name: churrostack-landing-secrets
            - configMapRef:
                name: churrostack-landing-config
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
          livenessProbe:
            httpGet:
              path: /en
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 30
          readinessProbe:
            httpGet:
              path: /en
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: churrostack-landing
  namespace: churrostack
spec:
  selector:
    app: churrostack-landing
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
  type: ClusterIP
```

## Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t churrostack/landing .
docker run -p 3000:3000 --env-file .env churrostack/landing
```

> **Note:** To use the standalone output, add `output: "standalone"` to `next.config.ts`.
