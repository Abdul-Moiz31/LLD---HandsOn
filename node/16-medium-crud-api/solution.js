class InMemoryStore {
  constructor() {
    // TODO: Initialize storage
  }

  getAll() {}
  getById(id) {}
  create(data) {}
  update(id, data) {}
  delete(id) {}
}

function createCRUDHandler(resourceName, options = {}) {
  const store = new InMemoryStore();

  return async function handler(req, res) {
    // TODO: Handle CRUD operations based on method and URL
    // GET /resource - list all
    // GET /resource/:id - get one
    // POST /resource - create
    // PUT /resource/:id - update
    // DELETE /resource/:id - delete
  };
}

module.exports = { createCRUDHandler, InMemoryStore };

