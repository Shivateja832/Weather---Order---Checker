# 🚀 QUICK START GUIDE

## ⏱️ Time Needed: 5-10 Minutes

---

## Step 1️⃣: Install Node.js (if not already installed)

**Windows Installation:**
1. Go to: https://nodejs.org/
2. Click the **LTS** button (Long-Term Support)
3. Run the installer and click "Next" through all screens
4. Click "Install"
5. Restart your computer

**Verify Installation:**
- Press `Win + R`
- Type `cmd` and press Enter
- Type: `node --version`
- You should see: `v18.x.x` or higher

---

## Step 2️⃣: Get Your OpenWeatherMap API Key (2 minutes)

1. Visit: https://openweathermap.org/api
2. Click **"Sign Up"** at the top right
3. Fill in:
   - Email
   - Password
   - Company (or just your name)
   - I agree to terms
4. Click "Create Account"
5. Check your email, click the verification link
6. Log in to your account
7. Click on **"API keys"** in the menu (left sidebar)
8. Copy the key shown (looks like: `abc123def456ghi789jkl`)

---

## Step 3️⃣: Add API Key to .env File

1. Open the file: `.env` (in your project folder)
2. Find this line:
   ```
   OPENWEATHER_API_KEY=your_api_key_here_replace_this
   ```
3. Replace `your_api_key_here_replace_this` with your actual key:
   ```
   OPENWEATHER_API_KEY=abc123def456ghi789jkl
   ```
4. **Save the file** (Ctrl + S)

---

## Step 4️⃣: Install Project Dependencies

1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to project folder:
   ```bash
   cd "C:\Users\Shiva Teja\Desktop\weather - order - checker"
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
   Wait 30 seconds... You should see: `added 1 package`

---

## Step 5️⃣: Run the Script!

```bash
npm start
```

You should see output like:
```
[INFO] ============================================================
[INFO] WEATHER-AWARE ORDER CHECKER - Starting Process
[INFO] ============================================================
[INFO] Found 4 orders to process
[INFO] Fetching weather data for all cities (in parallel)...
```

---

## ✅ What to Check After Running

### 1. **Check Console Output**
- Look for "✓ Updated orders saved"
- Should show weather data for New York, Mumbai, London

### 2. **Check Updated orders.json**
- Open `orders.json` in your project folder
- You should see new fields added:
  ```json
  {
    "order_id": "1001",
    "status": "Delayed",
    "delay_reason": "Rain",
    "apology_message": "Hi Alice, your order to New York is delayed..."
  }
  ```

### 3. **Check for Errors**
- ERROR about API Key? → Check .env file again
- ERROR "Cannot find module"? → Run `npm install` again
- City not found? → That's OK! It's the InvalidCity123 (expected)

---

## 🎯 Project Files Explained

| File | What It Does |
|------|--------------|
| `app.js` | Main script - fetches weather & updates orders |
| `package.json` | Lists dependencies (dotenv package) |
| `.env` | Your API key (KEEP SECRET) |
| `orders.json` | Your orders database (gets updated) |
| `README.md` | Full documentation |
| `AI_LOG.md` | Technical decisions & learning notes |
| `.gitignore` | Prevents secrets from being shared on GitHub |

---

## 🔧 Troubleshooting

### **Problem: "API Key not configured"**
✅ Solution: 
- Open `.env` file
- Check that you replaced `your_api_key_here_replace_this`
- Save the file
- Run `npm start` again

### **Problem: "Cannot find module 'dotenv'"**
✅ Solution:
- Run `npm install`
- Wait for it to complete
- Try `npm start` again

### **Problem: "City not found" error for InvalidCity123**
✅ This is EXPECTED!
- That's a test case to show error handling
- The script continues processing other cities
- This proves the error resilience works!

### **Problem: All orders show "Pending" even though it's raining**
✅ Possible causes:
- API might be slow, try again in 30 seconds
- The city's weather might not be "Rain" (check console output)
- API key might be invalid

---

## 📊 Understanding the Output

### **[SUCCESS] Example**
```
[INFO] Order #1001 - Alice Smith
[INFO] Destination: New York
[INFO] Current Weather: Rain
[INFO] Temperature: 5.2°C
[INFO] Description: light rain
[WARNING] Status updated to: DELAYED (due to Rain)
[INFO] Customer Message: "Hi Alice, your order to New York is delayed due to heavy rain. We appreciate your patience!"
```

This means:
- ✅ API call successful
- ✅ Weather is "Rain" = Order marked as "Delayed"
- ✅ Personalized message generated
- ✅ Order will be saved with new status

### **[ERROR] Example**
```
[INFO] Order #1004 - InvalidCity123
[ERROR] Failed to fetch weather: City not found
[WARNING] Order status remains unchanged (API error)
```

This means:
- ⚠️ City doesn't exist (expected for InvalidCity123)
- ✅ Error was caught gracefully
- ✅ Script didn't crash
- ✅ Other orders still processed

---

## 🎓 What You Just Learned

- ✅ Using external APIs (OpenWeatherMap)
- ✅ Parallel execution with Promise.all()
- ✅ Error handling that doesn't crash apps
- ✅ Environment variables for security
- ✅ JSON file operations
- ✅ Node.js with npm packages

---

## 🚀 Next Steps (Optional)

Want to make this more impressive for a portfolio?

1. **Add a Web Dashboard** - Display orders in a browser
2. **Send Email Notifications** - Notify customers automatically
3. **Schedule it** - Run every hour automatically
4. **Add a Database** - Use MongoDB instead of JSON
5. **Deploy to Cloud** - Run on Heroku or AWS
6. **Add Tests** - Prove your code works with Jest

---

## 📞 Still Having Issues?

1. Check that `node --version` works
2. Check that npm installed (folder shows `node_modules`)
3. Verify API key is valid
4. Try running `npm start` again

---

**You're all set! Run `npm start` and see the magic happen! 🌟**
