# File Upload Handler

**Difficulty:** Hard

## Problem Statement

Implement multipart/form-data file upload handling without external libraries.

## Requirements

1. Parse multipart/form-data
2. Stream large files to disk
3. File size limits
4. File type validation
5. Multiple file upload
6. Progress tracking

## Function Signature

```javascript
function createUploadHandler(options) {
  // options: { dest, limits, fileFilter }
  // Return middleware
}
```

