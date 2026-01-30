---
description: Complete step-by-step deployment of NextGen Organics to production
---

# NextGen Organics - Complete Deployment Workflow

> This guide walks you through EVERY step to deploy your entire project. Follow each section in order.

---

## 📋 PHASE 0: Prerequisites (Do This First!)

### Step 0.1: Check Your Local Setup

```powershell
# Run these commands to verify everything is installed
node --version   # Should show v18+
npm --version    # Should show v9+
python --version # Should show 3.11+
git --version    # Should show any recent version
```

### Step 0.2: Create Required Accounts (All Free Tiers)

| Platform        | Sign Up Link                    | What It's For     |
| --------------- | ------------------------------- | ----------------- |
| **GitHub**      | https://github.com/signup       | Code repository   |
| **Supabase**    | https://supabase.com/dashboard  | Database          |
| **Railway**     | https://railway.app             | Backend API       |
| **Vercel**      | https://vercel.com/signup       | Web apps          |
| **Expo**        | https://expo.dev/signup         | Mobile builds     |
| **Google Play** | https://play.google.com/console | Android app ($25) |

### Step 0.3: Push Code to GitHub

```powershell
cd c:\Users\gunny\development\Nextgen-organic

# Check if already connected to GitHub
git remote -v

# If empty, add your GitHub repo:
git remote add origin https://github.com/YOUR_USERNAME/Nextgen-organic.git

# Push all code
git add .
git commit -m "Prepare for production deployment"
git push -u origin main
```

---

## 🗄️ PHASE 1: Supabase Database Setup

### Step 1.1: Create New Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"** button (green)
3. Fill in:
   - **Name**: `nextgen-organics`
   - **Database Password**: Click "Generate" and **COPY THIS PASSWORD** - you'll need it!
   - **Region**: `ap-south-1` (Mumbai - closest to India)
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete

### Step 1.2: Run Database Schema

1. In left sidebar, click **"SQL Editor"** (looks like a terminal icon)
2. Click **"New query"** button
3. Open this file in VS Code: `c:\Users\gunny\development\Nextgen-organic\backend\supabase_setup.sql`
4. Copy ALL contents (Ctrl+A, Ctrl+C)
5. Paste into Supabase SQL Editor (Ctrl+V)
6. Click **"Run"** button (or press Ctrl+Enter)
7. You should see "Success. No rows returned" - this is correct!

### Step 1.3: Get Your Connection Details

1. Click **"Project Settings"** (gear icon in left sidebar)
2. Click **"Database"** in submenu
3. Find **"Connection string"** section
4. Click **"URI"** tab
5. Copy the connection string - it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with the password from Step 1.1

### Step 1.4: Get API Keys

1. Click **"Project Settings"** → **"API"**
2. Copy these values (you'll need them later):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (long string)
   - **service_role key**: `eyJhbGci...` (different long string)

### Step 1.5: Setup Storage Buckets

1. Click **"Storage"** in left sidebar
2. Click **"New bucket"**
3. Create three buckets:

   **Bucket 1:**
   - Name: `products`
   - Toggle ON: "Public bucket"
   - Click "Create bucket"

   **Bucket 2:**
   - Name: `vendors`
   - Toggle ON: "Public bucket"
   - Click "Create bucket"

   **Bucket 3:**
   - Name: `banners`
   - Toggle ON: "Public bucket"
   - Click "Create bucket"

✅ **Supabase is ready!** Save all your keys in a safe place.

---

## 🐍 PHASE 2: Railway Backend Deployment

### Step 2.1: Login to Railway

1. Go to https://railway.app
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub

### Step 2.2: Create New Project

1. Click **"New Project"** button
2. Click **"Deploy from GitHub repo"**
3. Find and click **"Nextgen-organic"** repository
4. If not visible, click "Configure GitHub App" and add access

### Step 2.3: Configure Root Directory

1. After project creates, click on the service card
2. Click **"Settings"** tab
3. Find **"Root Directory"** section
4. Set to: `backend`
5. Click elsewhere to save

### Step 2.4: Add Environment Variables

1. Click **"Variables"** tab
2. Click **"New Variable"** for each:

```
Variable Name                    | Value
---------------------------------|------------------------------------------
DATABASE_URL                     | postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres
SUPABASE_URL                     | https://xxxxx.supabase.co
SUPABASE_KEY                     | eyJhbGci... (your anon key)
SECRET_KEY                       | (generate random: openssl rand -hex 32)
ALGORITHM                        | HS256
ACCESS_TOKEN_EXPIRE_MINUTES      | 30
ENVIRONMENT                      | production
```

// turbo

### Step 2.5: Generate Secret Key Locally

```powershell
# Run this to generate a secret key, then copy it
python -c "import secrets; print(secrets.token_hex(32))"
```

### Step 2.6: Generate Public Domain

1. Click **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Copy your URL: `https://nextgen-organic-production-xxxx.up.railway.app`

### Step 2.7: Verify Deployment

1. Click **"Deployments"** tab
2. Wait for build to complete (green checkmark)
3. Open your Railway URL + `/docs` in browser:
   ```
   https://your-railway-url.up.railway.app/docs
   ```
4. You should see FastAPI Swagger documentation!

✅ **Backend is live!** Save your Railway URL.

---

## 🌐 PHASE 3: Vercel Web Apps Deployment

### Step 3.1: Login to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel

### Step 3.2: Deploy Admin App

1. Click **"Add New..."** → **"Project"**
2. Find and click **"Nextgen-organic"** repo
3. Click **"Import"**
4. Configure:
   - **Project Name**: `nextgen-admin`
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Click "Edit" → type `frontend/admin-app` → click outside
5. Expand **"Environment Variables"**
6. Add these variables:
   ```
   NEXT_PUBLIC_API_URL = https://your-railway-url.up.railway.app
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
   ```
7. Click **"Deploy"**
8. Wait 2-3 minutes for build
9. Click "Visit" to see your live admin app!

### Step 3.3: Deploy Vendor App

1. Go back to Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. Import same repo again
4. Configure:
   - **Project Name**: `nextgen-vendor`
   - **Root Directory**: `frontend/vendor-app`
5. Add same environment variables as Step 3.2
6. Click **"Deploy"**

### Step 3.4: Deploy Marketing Website

1. Go back to Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. Import same repo again
4. Configure:
   - **Project Name**: `nextgen-website`
   - **Root Directory**: `frontend/website`
5. Add same environment variables as Step 3.2
6. Click **"Deploy"**

### Step 3.5: Note Your URLs

After all deployments complete, you'll have:

- Admin: `https://nextgen-admin.vercel.app`
- Vendor: `https://nextgen-vendor.vercel.app`
- Website: `https://nextgen-website.vercel.app`

✅ **All web apps are live!**

---

## 📱 PHASE 4: Mobile App (Google Play Store)

### Step 4.1: Install EAS CLI

// turbo

```powershell
npm install -g eas-cli
```

### Step 4.2: Login to Expo

```powershell
cd c:\Users\gunny\development\Nextgen-organic\mobile
npx eas login
```

Enter your Expo account credentials.

### Step 4.3: Configure EAS Project

```powershell
npx eas build:configure
```

- Select "All" when asked about platforms
- This links your project to Expo

### Step 4.4: Update Production API URL

1. Open `mobile/.env` (create if doesn't exist)
2. Add:
   ```
   EXPO_PUBLIC_API_URL=https://your-railway-url.up.railway.app/api/v1
   ```

### Step 4.5: Build for Play Store

```powershell
npx eas build --platform android --profile production
```

- Type `y` to create a new Android Keystore
- Wait 15-30 minutes for cloud build
- When done, you'll get a download link for the `.aab` file

### Step 4.6: Download the AAB File

1. Copy the build URL from terminal output
2. Open in browser
3. Click "Download" to get the `.aab` file

### Step 4.7: Create Play Console App

1. Go to https://play.google.com/console
2. If first time: Pay $25 registration fee
3. Click **"Create app"**
4. Fill in:
   - **App name**: NextGen Organics
   - **Default language**: English
   - **App or game**: App
   - **Free or paid**: Free
5. Check all declaration boxes
6. Click **"Create app"**

### Step 4.8: Complete Store Listing

Navigate to each section and fill in:

**1. App access** → "All functionality is available without special access"

**2. Ads** → "No, my app does not contain ads"

**3. Content rating** → Complete questionnaire (takes 2 mins)

**4. Target audience** → Select "18 and over"

**5. News apps** → "No, my app is not a news app"

**6. COVID-19 apps** → "No"

**7. Data safety** → Complete form about data collection

**8. Store listing**:

- Short description (80 chars): "Shop organic products from verified Indian farms"
- Full description (4000 chars): Write about your app
- App icon: Upload 512x512 PNG
- Feature graphic: Upload 1024x500 PNG
- Screenshots: Upload at least 2 phone screenshots
- Privacy policy URL: Your privacy policy page

### Step 4.9: Upload App Bundle

1. Click **"Production"** in left sidebar
2. Click **"Create new release"**
3. Click **"Upload"** and select your `.aab` file
4. Add release notes: "Initial release"
5. Click **"Review release"**
6. Click **"Start rollout to Production"**

### Step 4.10: Wait for Review

- First review takes 2-7 days
- Google will email you when approved
- Check for any rejection reasons and fix if needed

✅ **Mobile app submitted!**

---

## ✅ PHASE 5: Final Verification Checklist

| Test       | How to Verify                             | Expected Result    |
| ---------- | ----------------------------------------- | ------------------ |
| Database   | Supabase → Table Editor → vendors         | See tables created |
| Backend    | Visit `https://railway-url/docs`          | Swagger UI loads   |
| API Health | Visit `https://railway-url/api/v1/health` | `{"status":"ok"}`  |
| Admin App  | Visit Vercel admin URL                    | Login page shows   |
| Vendor App | Visit Vercel vendor URL                   | Login page shows   |
| Website    | Visit Vercel website URL                  | Homepage shows     |
| Mobile     | Install from Play Store                   | App opens          |

---

## 🔧 Troubleshooting

### "Build failed on Railway"

1. Check Deployments → Click failed deploy → View logs
2. Usually missing environment variable
3. Add missing variable and redeploy

### "CORS error in browser"

1. Backend needs to allow frontend domains
2. Add to Railway variables:
   ```
   CORS_ORIGINS=https://nextgen-admin.vercel.app,https://nextgen-vendor.vercel.app
   ```

### "Mobile app can't connect to API"

1. Check EXPO_PUBLIC_API_URL is correct
2. Must include `/api/v1` at the end
3. Rebuild app after changing env variables

### "Play Store rejected app"

1. Read rejection email carefully
2. Common issues: missing privacy policy, incorrect screenshots
3. Fix and resubmit

---

## 📞 Support Contacts

- **Supabase**: https://supabase.com/support
- **Railway**: https://railway.app/help
- **Vercel**: https://vercel.com/support
- **Expo**: https://expo.dev/contact
- **Play Console**: https://support.google.com/googleplay/android-developer
