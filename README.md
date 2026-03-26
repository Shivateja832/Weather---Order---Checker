# 🌦️ Weather-Aware Order Checker

## Project Overview
A production-ready Node.js application that monitors weather conditions and automatically flags delivery orders that may be delayed due to adverse weather. This system fetches weather data concurrently for multiple cities and generates personalized customer notifications.

---

## 📋 Features

✅ **Parallel Weather Fetching** - Uses `Promise.all()` to fetch weather for ALL cities simultaneously (not one by one)  
✅ **Real OpenWeatherMap API** - Integrates with the free tier of OpenWeatherMap API  
✅ **Error Resilience** - Gracefully handles invalid cities without crashing  
✅ **Security** - Uses `.env` file to keep API keys secret  
✅ **AI-Powered Messages** - Generates personalized apology messages for delayed orders  
✅ **Status Updates** - Automatically updates order status in JSON database  
✅ **Detailed Logging** - Shows temperature, weather conditions, and customer messages  

---

## 🎯 How It Works

```
1. Read orders from orders.json
   ↓
2. Extract unique cities from orders
   ↓
3. Fetch weather for ALL cities at the same time (parallel)
   ↓
4. Analyze weather conditions
   ↓
5. Update order status if Rain/Snow/Extreme detected
   ↓
6. Generate personalized apology messages
   ↓
7. Save updated orders back to JSON
```

---

## 📦 Installation & Setup

### **Step 1: Navigate to the Project Folder**
```bash
cd "C:\Users\Shiva Teja\Desktop\weather - order - checker"
```

### **Step 2: Install Node.js (if not already installed)**
- Download from: https://nodejs.org/
- Install the LTS (Long-Term Support) version
- Verify installation:
```bash
node --version
npm --version
```

### **Step 3: Install Project Dependencies**
```bash
npm install
```
This installs the `dotenv` package needed to read your `.env` file.

### **Step 4: Get Your OpenWeatherMap API Key**

1. Go to: https://openweathermap.org/api
2. Click "Sign Up" if you don't have an account
3. Create a free account
4. Navigate to "API keys" section
5. Copy your API key

### **Step 5: Add Your API Key to .env**

Open the `.env` file and replace:
```
OPENWEATHER_API_KEY=your_api_key_here_replace_this
```

With your actual API key:
```
OPENWEATHER_API_KEY=abc123def456ghi789jkl
```

---

## 🚀 Running the Script

### **Run Once**
```bash
npm start
```

### **View Results**
After running, check:
- **Console Output** - Shows all weather details and customer messages
- **orders.json** - Updated orders with status changes and apology messages

---

## 📊 Sample Output

```
[INFO] ============================================================
[INFO] WEATHER-AWARE ORDER CHECKER - Starting Process
[INFO] ============================================================
[INFO] Found 4 orders to process
[INFO] Fetching weather data for all cities (in parallel)...
[INFO] Weather data fetched successfully!
[INFO] ────────────────────────────────────────────────────────

[INFO] Order #1001 - Alice Smith
[INFO] Destination: New York
[INFO] Current Weather: Rain
[INFO] Temperature: 5.2°C
[INFO] Description: light rain
[WARNING] Status updated to: DELAYED (due to Rain)
[INFO] Customer Message: "Hi Alice, your order to New York is delayed due to heavy rain. We appreciate your patience!"

[INFO] Order #1004 - InvalidCity123
[ERROR] Failed to fetch weather: City not found
[WARNING] Order status remains unchanged (API error)

[INFO] ============================================================
[INFO] PROCESSING COMPLETE
[INFO] ============================================================
[INFO] Total Orders Processed: 4
[INFO] Orders Delayed: 1
[INFO] API Errors: 1
[INFO] On-Time Orders: 2
```

---

## 🏗️ Project Structure

```
weather-order-checker/
├── app.js                  # Main application script
├── package.json            # Project dependencies
├── .env                    # API keys (KEEP SECRET!)
├── orders.json             # Order database (gets updated)
├── README.md               # This file
└── AI_LOG.md              # Documentation of AI prompts used
```

---

## 🔍 Understanding the Code

### **Parallel Fetching (The Key Part)**
```javascript
// This is the MAGIC that makes it fast!
// Instead of waiting 5 seconds per city...
// It fetches ALL cities simultaneously!

const weatherPromises = orders.map(order => fetchWeatherData(order.city));
const weatherResults = await Promise.all(weatherPromises);
```

### **Error Handling**
- Invalid cities (like "InvalidCity123") trigger a 404 error
- The error is logged but doesn't crash the app
- The script continues processing other valid cities

### **Weather Delay Logic**
```javascript
const DELAYED_WEATHER_CONDITIONS = ['Rain', 'Snow', 'Extreme'];

if (isDelayedWeather(weatherData.weather)) {
  order.status = 'Delayed';
  // Generate apology message
}
```

---

## 📝 Expected Results After Running

Your `orders.json` will be updated with:
- `"status": "Delayed"` for rainy/snowy cities
- `"delay_reason": "Rain"` (the specific weather condition)
- `"apology_message": "Hi [Name], your order to [City]..."` (personalized message)

Example:
```json
{
  "order_id": "1001",
  "customer": "Alice Smith",
  "city": "New York",
  "status": "Delayed",
  "delay_reason": "Rain",
  "apology_message": "Hi Alice, your order to New York is delayed due to heavy rain. We appreciate your patience!"
}
```

---

## 🛡️ Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file to GitHub
- Never share your API key
- The `.env` file is for local use only
- For production, use environment variables in your hosting platform

---

## 🐛 Troubleshooting

### **Error: "API Key not configured"**
→ Make sure you've updated the `.env` file with a valid API key

### **Error: "Cannot find module 'dotenv'"**
→ Run `npm install` first

### **Error: "Cannot read property 'weather' of undefined"**
→ The API response format changed. This shouldn't happen with valid API keys.

### **All orders show as "On-Time" even on rainy days**
→ The weather condition might be different (e.g., "Drizzle" vs "Rain")
→ Check the console output to see the actual weather main value

---

## 📚 Learning Resources

### **Promise.all() - Parallel Execution**
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

### **OpenWeatherMap API Documentation**
https://openweathermap.org/api

### **Node.js HTTPS Requests**
https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

### **.env Files and Environment Variables**
https://github.com/motdotla/dotenv

---

## 🚀 Optimization Tips for Production

1. **Add Caching** - Cache weather data for 30 minutes
2. **Add Retries** - Retry failed API calls automatically
3. **Use Async Libraries** - Consider `axios` or `node-fetch` for cleaner code
4. **Database** - Store orders in MongoDB or PostgreSQL instead of JSON
5. **Schedule Jobs** - Run this script every hour using `node-cron`
6. **Notifications** - Send SMS or Email using Twilio or SendGrid
7. **API Rate Limiting** - Handle OpenWeatherMap's API limits gracefully

---

## 📞 Support

If you encounter issues:
1. Check the error message carefully
2. Verify your API key is valid
3. Check Internet connection
4. Ensure all files are in the correct folder

---

## 📄 License

MIT License - Free to use and modify for any purpose.

---

**Built with ❤️ for learning and production use**
