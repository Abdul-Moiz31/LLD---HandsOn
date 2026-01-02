const crypto = require('crypto');
const fs = require('fs');

function hashString(str, algorithm = 'sha256') {
  // TODO: Return hex hash of string
}

async function hashFile(filePath) {
  // TODO: Return hash of file contents
}

function generateRandomString(length) {
  // TODO: Return cryptographically secure random string
}

function encrypt(text, key) {
  // TODO: AES-256 encrypt, return { iv, encrypted }
}

function decrypt(encrypted, key, iv) {
  // TODO: AES-256 decrypt
}

module.exports = { hashString, hashFile, generateRandomString, encrypt, decrypt };

