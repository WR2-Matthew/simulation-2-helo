const bcrypt = require('bcryptjs');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body
    const db = req.app.get('db');

  }
}