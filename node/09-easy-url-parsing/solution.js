const url = require('url');

function parseURL(urlString) {
  // TODO: Return { protocol, host, pathname, query, hash }
}

function parseQueryString(qs) {
  // TODO: Parse ?key=value&key2=value2 to object
}

function buildQueryString(params) {
  // TODO: Build query string from object
}

function buildURL(base, path = '', params = {}) {
  // TODO: Combine base, path, and query params
}

module.exports = { parseURL, parseQueryString, buildQueryString, buildURL };

