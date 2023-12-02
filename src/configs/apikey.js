const crypto = require('crypto');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

const generateHash = (data) => {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  };
  
  const envPath = path.resolve(__dirname, '.env');
  
  const generateAndUpdateApiKey = (dataToHash) => {
    const hashValue = generateHash(dataToHash);
  
    let envContent = fs.readFileSync(envPath, 'utf-8');
    const regen = /API_KEY=.*/;
  
    if (envContent.match(regen)) {
      envContent = envContent.replace(regen, `API_KEY=${hashValue}`);
    } else {
      envContent += `\nAPI_KEY=${hashValue}\n`;
    }
  
    fs.writeFileSync(envPath, envContent);
  
    console.log('Original Data:', dataToHash);
    console.log('Hashed Data:', hashValue);
    console.log('.env updated successfully.');
  
    return hashValue;
  };
  
module.exports = { generateHash, generateAndUpdateApiKey };