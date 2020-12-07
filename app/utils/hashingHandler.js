const bcrypt = require("bcryptjs");

/**
 * Asynchronously generates a hash for the given string.
 *
 * @param {string} value
 *
 */

exports.hashingValue = async (value) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let result = await bcrypt.hash(value, salt);
    return result;
  } catch (error) {
    return error;
  }
};

/**
 * Asynchronously compares the given data against the given hash.
 *
 * @param {string} value
 * @param {string} hashedValue
 *
 */

exports.comparingValue = async (value, hashedValue) => bcrypt.compare(value, hashedValue);
