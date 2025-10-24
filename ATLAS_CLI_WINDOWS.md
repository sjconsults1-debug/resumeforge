# MongoDB Atlas CLI Installation for Windows

## Method 1: Using Chocolatey (Windows Package Manager)

### Step 1: Install Chocolatey (if not installed)
Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Step 2: Install MongoDB Atlas CLI
```powershell
choco install mongodb-atlas-cli
```

### Step 3: Verify Installation
```powershell
atlas --version
```

---

## Method 2: Direct Download (Recommended for Quick Setup)

### Step 1: Download
1. Go to: https://www.mongodb.com/try/download/atlascli
2. Choose "Windows" platform
3. Download the installer

### Step 2: Install
1. Run the downloaded `.msi` file
2. Follow the installation wizard
3. Restart your terminal

### Step 3: Verify
```powershell
atlas --version
```

---

## Method 3: Use Web Interface Instead (Fastest!)

The web interface is actually faster and easier for initial setup:

1. **Sign up**: https://account.mongodb.com/account/register
2. **Create cluster**: Follow the GUI wizard
3. **Get connection string**: Copy and paste
4. **Done!** - No CLI installation needed

---

## Using Atlas CLI After Installation

### Login to Atlas
```bash
atlas auth login
```

### Create a New Cluster
```bash
atlas clusters create my-cluster --provider AWS --region US_EAST_1 --tier M0
```

### List Clusters
```bash
atlas clusters list
```

### Get Connection String
```bash
atlas clusters connectionStrings describe my-cluster
```

---

## Recommendation for You

Since you're setting up for the first time, I recommend using the **Web Interface** method:

1. It's faster (no installation needed)
2. More visual and easier to understand
3. Works immediately on any platform
4. You can always install CLI later

**Ready to proceed?** Let me guide you through the web setup!
