const crypto = require("crypto");
const { getSecretFromDB } = require("./mockDb");

const generateToken = async (email) => {
  try {
    const secret = await getSecretFromDB();

    return crypto.createHmac("sha256", secret).update(email).digest("base64");
  } catch (error) {
   console.error('Token generation failed:',error.message);
   throw new Error('Failed to generate token')
   
  }
};

module.exports = { generateToken };
