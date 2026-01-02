const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class MultipartParser {
  constructor(boundary) {
    // TODO: Initialize parser with boundary
  }

  parse(stream) {
    // TODO: Parse multipart stream
    // Return async iterator of { fieldname, filename, data }
  }
}

function getBoundary(contentType) {
  // TODO: Extract boundary from Content-Type header
}

function createUploadHandler(options = {}) {
  const {
    dest = './uploads',
    limits = { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter = () => true,
    generateFilename = () => crypto.randomBytes(16).toString('hex'),
  } = options;

  return async function uploadMiddleware(req, res, next) {
    // TODO: Parse multipart request
    // 1. Get boundary from Content-Type
    // 2. Parse parts
    // 3. For files: validate, stream to disk
    // 4. Attach files to req.files, fields to req.body
    // 5. Handle errors
  };
}

module.exports = { createUploadHandler, MultipartParser, getBoundary };

