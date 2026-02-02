/**
 * Shared Utilities for PIF Funnel
 */

const PIFUtils = (function() {
  'use strict';

  /**
   * Get profile data from LocalStorage
   * @returns {Object} Profile data or empty object
   */
  function getProfileData() {
    const saved = localStorage.getItem('pif_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not parse profile data');
        return {};
      }
    }
    return {};
  }

  /**
   * Save profile data to LocalStorage
   * @param {Object} data - Profile data to save
   */
  function saveProfileData(data) {
    localStorage.setItem('pif_profile', JSON.stringify(data));
  }

  /**
   * Clear profile data from LocalStorage
   */
  function clearProfileData() {
    localStorage.removeItem('pif_profile');
  }

  /**
   * Get URL parameter by name
   * @param {string} name - Parameter name
   * @returns {string|null} Parameter value or null
   */
  function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  /**
   * Generate a random order number
   * @returns {string} Order number in format GT#####
   */
  function generateOrderNumber() {
    return 'GT' + Math.floor(10000 + Math.random() * 90000);
  }

  /**
   * Debounce function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Public API
  return {
    getProfileData: getProfileData,
    saveProfileData: saveProfileData,
    clearProfileData: clearProfileData,
    getUrlParam: getUrlParam,
    generateOrderNumber: generateOrderNumber,
    debounce: debounce
  };
})();

// Make available globally if needed
if (typeof window !== 'undefined') {
  window.PIFUtils = PIFUtils;
}
