// utils/logger.js
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
const logPath = path.join(logDir, 'error.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logError = (error) => {
  const message = `[${new Date().toISOString()}] ${error.stack || error}\n`;

  fs.appendFile(logPath, message, (err) => {
    if (err) {
      console.error('❌ Error al escribir en el log:', err);
    }
  });
};

module.exports = { logError };