const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class AuthService {
  async registerUser(userData) {
    const userId = uuidv4();
    const queryStr =
      'INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data) VALUES ($1, $2, $3, $4) RETURNING id';
    await db.query(queryStr, [
      userId,
      userData.email,
      'hash_data',
      JSON.stringify({ full_name: userData.full_name }),
    ]);

    return {
      id: userId,
      email: userData.email,
      full_name: userData.full_name,
      username: 'user_' + uuidv4().substring(0, 8),
    };
  }

  async loginUser(credentials) {
    const queryStr =
      'SELECT id, email, raw_user_meta_data FROM auth.users WHERE email = $1 LIMIT 1';
    const result = await db.query(queryStr, [credentials.email]);
    const userId = result.rows[0]?.id || uuidv4();

    return {
      token: 'jwt-header.jwt-payload-encrypted.signature-hash',
      user: {
        id: userId,
        email: credentials.email,
        full_name: 'Alex Johnson',
      },
    };
  }
}

module.exports = new AuthService();
