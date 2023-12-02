const dotenv = require('dotenv');
const { generateAndUpdateApiKey } = require('./apikey');

dotenv.config();
const apiKey = process.env.API_KEY || generateAndUpdateApiKey('test');
const checkApiKey = (req, res, next) => {
  const providedKey = req.headers['api-key'];

  if (!providedKey || providedKey !== apiKey) {
    return res.status(401).json({ message: 'Invalid API key.' });
  }
  next();
};
  
module.exports = checkApiKey;