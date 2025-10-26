/**
 * Currency conversion utilities
 */

// Exchange rate: 1 USD = 87.45 KGS (Kyrgyz Som)
const USD_TO_KGS_RATE = 87.45;

/**
 * Convert USD to KGS
 * @param {number} usdAmount - Amount in USD
 * @returns {number} Amount in KGS
 */
export const convertUsdToKgs = (usdAmount) => {
  return usdAmount * USD_TO_KGS_RATE;
};

/**
 * Format price in KGS
 * @param {number} amount - Amount in KGS
 * @returns {string} Formatted price string
 */
export const formatKgsPrice = (amount) => {
  // Round to nearest som (no decimal places for KGS)
  const roundedAmount = Math.round(amount);
  // Format with spaces as thousand separators
  return roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};