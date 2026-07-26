const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

/**
 * Generates a JSON Web Token for the given user ID.
 * @param {string|Object} userId - The user ID to encode in the token payload.
 * @returns {Promise<string>} The generated JWT string.
 */
const generateToken = async (userId) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    if (!userId) {
      throw new Error("User ID is required to generate token");
    }

    const payload = { id: userId, userId };
    const token = await signAsync(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

/**
 * Verifies a JSON Web Token and returns the decoded payload.
 * @param {string} token - The JWT string to verify.
 * @returns {Promise<Object>} The decoded token payload.
 */
const verifyToken = async (token) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    if (!token) {
      throw new Error("Token is required for verification");
    }

    const decoded = await verifyAsync(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(`Error verifying token: ${error.message}`);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
