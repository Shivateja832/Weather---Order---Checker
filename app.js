/**
 * =====================================================
 * WEATHER-AWARE ORDER CHECKER
 * A system that checks weather and updates order status
 * =====================================================
 */

const fs = require('fs');
const https = require('https');
require('dotenv').config();

// ================== CONFIGURATION ==================
const API_KEY = process.env.OPENWEATHER_API_KEY;
const ORDERS_FILE = './orders.json';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const DEBUG = process.env.DEBUG === 'true';

// Weather conditions that cause delivery delays
const DELAYED_WEATHER_CONDITIONS = ['Rain', 'Snow', 'Extreme'];

// ================== LOGGER UTILITY ==================
/**
 * Simple logger for cleaner console output
 */
const logger = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  warn: (msg) => console.log(`[WARNING] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`),
  success: (msg) => console.log(`[SUCCESS] ✓ ${msg}`),
  debug: (msg) => DEBUG && console.log(`[DEBUG] ${msg}`),
};

// ================== API UTILITIES ==================
/**
 * Fetch weather data from OpenWeatherMap API
 * @param {string} city - City name to get weather for
 * @returns {Promise<object>} - Weather data or error
 */
function fetchWeatherData(city) {
  return new Promise((resolve) => {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve({
              success: true,
              city: city,
              weather: parsedData.weather[0].main,
              temperature: parsedData.main.temp,
              description: parsedData.weather[0].description,
            });
          } else if (res.statusCode === 404) {
            resolve({
              success: false,
              city: city,
              error: 'City not found',
            });
          } else {
            resolve({
              success: false,
              city: city,
              error: parsedData.message || 'Unknown error',
            });
          }
        } catch (error) {
          resolve({
            success: false,
            city: city,
            error: 'Failed to parse API response',
          });
        }
      });
    }).on('error', (error) => {
      resolve({
        success: false,
        city: city,
        error: error.message,
      });
    });
  });
}

// ================== WEATHER ANALYSIS ==================
/**
 * Check if weather will cause a delivery delay
 * @param {string} weatherMain - Main weather condition (e.g., "Rain", "Snow")
 * @returns {boolean} - True if delivery should be delayed
 */
function isDelayedWeather(weatherMain) {
  return DELAYED_WEATHER_CONDITIONS.includes(weatherMain);
}

// ================== AI APOLOGY MESSAGE GENERATOR ==================
/**
 * Generate a personalized weather-aware apology message
 * This simulates AI-generated responses
 * @param {string} customerName - Name of the customer
 * @param {string} city - Destination city
 * @param {string} weather - Weather condition
 * @returns {string} - Personalized apology message
 */
function generateWeatherAwareApology(customerName, city, weather) {
  // This is a template-based system that creates personalized messages
  // In production, this could call an actual AI API like OpenAI
  
  const templates = {
    Rain: `Hi ${customerName}, your order to ${city} is delayed due to heavy rain. We appreciate your patience as our delivery partners navigate safe routes!`,
    Snow: `Hi ${customerName}, your order to ${city} is delayed due to snow. Our team is working hard to ensure safe delivery to your doorstep!`,
    Extreme: `Hi ${customerName}, your order to ${city} is delayed due to extreme weather conditions. Safety is our priority. We'll keep you updated!`,
  };

  return templates[weather] || `Hi ${customerName}, your order to ${city} is delayed due to weather conditions. Thank you for your understanding!`;
}

// ================== FILE OPERATIONS ==================
/**
 * Read orders from JSON file
 * @returns {array} - Array of orders
 */
function readOrders() {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    logger.error(`Failed to read orders.json: ${error.message}`);
    return [];
  }
}

/**
 * Write updated orders back to JSON file
 * @param {array} orders - Updated orders array
 */
function writeOrders(orders) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    logger.success(`Updated orders saved to ${ORDERS_FILE}`);
  } catch (error) {
    logger.error(`Failed to write orders.json: ${error.message}`);
  }
}

// ================== MAIN LOGIC ==================
/**
 * Main function: Process all orders with weather checks
 */
async function processOrders() {
  logger.info('='.repeat(60));
  logger.info('WEATHER-AWARE ORDER CHECKER - Starting Process');
  logger.info('='.repeat(60));

  // Validate API key
  if (!API_KEY || API_KEY === 'your_api_key_here_replace_this') {
    logger.error('API Key not configured!');
    logger.error('Please update your .env file with a valid OpenWeatherMap API key');
    logger.error('Get a free API key at: https://openweathermap.org/api');
    process.exit(1);
  }

  // Read all orders
  const orders = readOrders();
  if (orders.length === 0) {
    logger.error('No orders found in orders.json');
    return;
  }

  logger.info(`Found ${orders.length} orders to process`);
  logger.info('Fetching weather data for all cities (in parallel)...');

  // ========== PARALLEL FETCHING: This is the KEY part ==========
  // Using Promise.all to fetch ALL weather data concurrently
  // Instead of waiting for each city one by one, we fetch them ALL at the same time!
  const weatherPromises = orders.map((order) => fetchWeatherData(order.city));
  const weatherResults = await Promise.all(weatherPromises);

  logger.info('Weather data fetched successfully!');
  logger.info('-'.repeat(60));

  // Process results and update order statuses
  let delayedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const weatherData = weatherResults[i];

    logger.info(`\nOrder #${order.order_id} - ${order.customer}`);
    logger.info(`Destination: ${order.city}`);

    if (weatherData.success) {
      logger.info(`Current Weather: ${weatherData.weather}`);
      logger.info(`Temperature: ${weatherData.temperature}°C`);
      logger.info(`Description: ${weatherData.description}`);

      // Check if weather will delay the order
      if (isDelayedWeather(weatherData.weather)) {
        order.status = 'Delayed';
        delayedCount++;
        logger.warn(`Status updated to: DELAYED (due to ${weatherData.weather})`);

        // Generate AI apology message
        const apology = generateWeatherAwareApology(
          order.customer,
          order.city,
          weatherData.weather
        );
        logger.info(`Customer Message: "${apology}"`);

        // Store apology in order for reference
        order.delay_reason = weatherData.weather;
        order.apology_message = apology;
      } else {
        logger.success(`Status remains: ${order.status} (Good weather - on time!)`);
      }
    } else {
      errorCount++;
      logger.error(`Failed to fetch weather: ${weatherData.error}`);
      logger.warn('Order status remains unchanged (API error)');
    }
  }

  // Summary
  logger.info('\n' + '='.repeat(60));
  logger.info('PROCESSING COMPLETE');
  logger.info('='.repeat(60));
  logger.info(`Total Orders Processed: ${orders.length}`);
  logger.info(`Orders Delayed: ${delayedCount}`);
  logger.info(`API Errors: ${errorCount}`);
  logger.info(`On-Time Orders: ${orders.length - delayedCount - errorCount}`);

  // Save updated orders
  writeOrders(orders);

  logger.info('\n✓ All operations completed successfully!');
  logger.info('Check orders.json for updated status information.');
}

// ================== EXECUTION ==================
// Run the main function
processOrders().catch((error) => {
  logger.error(`Unexpected error: ${error.message}`);
  process.exit(1);
});
