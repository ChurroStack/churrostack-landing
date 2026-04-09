# Email Setup — Microsoft Graph with OAuth Client Credentials

The contact form sends demo request emails via the Microsoft Graph API using the OAuth 2.0 client credentials flow. This means the application authenticates as itself (not on behalf of a user) using an Azure AD (Microsoft Entra ID) app registration.

## Prerequisites

- A Microsoft 365 tenant with an active mailbox (the "from" address)
- Admin access to the Azure portal (portal.azure.com)

## Step 1: Register an Application in Microsoft Entra ID

1. Go to **Azure Portal** → **Microsoft Entra ID** → **App registrations**
2. Click **New registration**
3. Fill in:
   - **Name**: `ChurroStack Landing Contact Form` (or any descriptive name)
   - **Supported account types**: _Accounts in this organizational directory only_ (Single tenant)
   - **Redirect URI**: Leave blank (not needed for client credentials)
4. Click **Register**
5. Copy the following values (you'll need them for environment variables):
   - **Application (client) ID** → `AZURE_CLIENT_ID`
   - **Directory (tenant) ID** → `AZURE_TENANT_ID`

## Step 2: Create a Client Secret

1. In your app registration, go to **Certificates & secrets**
2. Click **New client secret**
3. Set a description (e.g., `churrostack-landing`) and expiry (recommended: 24 months)
4. Click **Add**
5. **Copy the secret value immediately** — it won't be shown again → `AZURE_CLIENT_SECRET`

> **Important:** Set a calendar reminder to rotate the secret before it expires.

## Step 3: Grant Microsoft Graph API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission** → **Microsoft Graph** → **Application permissions**
3. Search for and select:
   - `Mail.Send`
4. Click **Add permissions**
5. Click **Grant admin consent for [your tenant]** (requires Global Admin or Privileged Role Administrator)
6. Verify the status shows **Granted** with a green checkmark

### Permission Summary

| Permission | Type | Description |
|------------|------|-------------|
| `Mail.Send` | Application | Send mail as any user in the tenant |

> **Note:** The `Mail.Send` application permission allows sending as any user in the tenant. To restrict this, you can configure an [application access policy](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access) to limit the app to specific mailboxes only.

## Step 4: Configure Application Access Policy (Recommended)

To restrict the application so it can only send emails from the designated mailbox:

1. Connect to Exchange Online PowerShell:
   ```powershell
   Connect-ExchangeOnline -UserPrincipalName admin@yourdomain.com
   ```

2. Create a mail-enabled security group and add the sender mailbox:
   ```powershell
   New-DistributionGroup -Name "ChurroStack Mail Senders" -Type Security -Members noreply@yourdomain.com
   ```

3. Create the access policy:
   ```powershell
   New-ApplicationAccessPolicy `
     -AppId "<AZURE_CLIENT_ID>" `
     -PolicyScopeGroupId "ChurroStack Mail Senders" `
     -AccessRight RestrictAccess `
     -Description "Restrict ChurroStack to send from noreply mailbox only"
   ```

4. Test the policy:
   ```powershell
   Test-ApplicationAccessPolicy `
     -Identity noreply@yourdomain.com `
     -AppId "<AZURE_CLIENT_ID>"
   ```

## Step 5: Set Environment Variables

Add these to your `.env` (local) or Kubernetes secrets/configmap (production):

```env
AZURE_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_SECRET=your-client-secret-value
AZURE_MAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL_TO=sales@yourdomain.com
```

See [configuration.md](./configuration.md) for the full list of environment variables.

## How It Works

```
Browser (contact form)
    │
    ▼ POST /api/contact
Next.js API Route
    │
    ├─ Validates input (Zod schema)
    ├─ Checks honeypot field (anti-bot)
    ├─ Applies rate limiting (3 req/min per IP)
    │
    ▼ OAuth 2.0 Client Credentials
Microsoft Entra ID (login.microsoftonline.com)
    │
    ▼ Access Token
Microsoft Graph API (graph.microsoft.com)
    │
    ▼ POST /users/{from}/sendMail
Recipient inbox
```

1. The form POSTs to `/api/contact`
2. The API route validates the payload and checks for bot abuse
3. The server requests an OAuth 2.0 access token from Microsoft Entra ID using client credentials
4. The token is cached in memory (refreshed ~5 minutes before expiry)
5. The email is sent via `POST https://graph.microsoft.com/v1.0/users/{AZURE_MAIL_FROM}/sendMail`

## Troubleshooting

| Symptom | Likely Cause |
|---------|-------------|
| `401 Unauthorized` on token request | Wrong `AZURE_CLIENT_ID` or `AZURE_CLIENT_SECRET` |
| `403 Forbidden` on sendMail | Missing `Mail.Send` permission or admin consent not granted |
| `403` with "Access to OData is disabled" | Application access policy is blocking the mailbox |
| `404 Not Found` on sendMail | `AZURE_MAIL_FROM` is not a valid mailbox in the tenant |
| `400 Bad Request` | Malformed email body or invalid recipient address |
| Emails land in spam | Configure SPF, DKIM, and DMARC for your domain |
