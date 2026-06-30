const { v4: uuidv4 } = require('uuid');

class ConnectionPool {
  constructor(config) {
    this.config = config;
  }

  async query(sqlText, params = []) {
    const table = sqlText.toLowerCase();

    if (table.includes('profiles')) {
      return {
        rows: [
          {
            id: params[0] || uuidv4(),
            full_name: 'Alex Johnson',
            username: 'alex_j',
            avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
            avatar_lqip: 'data:image/webp;base64,UklGR',
            progress_state: { active_module: 12, completed_steps: [1, 2, 3] },
            shortcut_state: { navigation: 'expanded' },
            can_upload_avatar: true,
            can_cloud_audio: true,
            can_use_gradient: true,
            use_gradient: true,
            can_use_presence: true,
            can_use_friends: true,
            can_use_chats: true,
            can_use_notes: true,
            updated_at: new Date().toISOString(),
          },
        ],
        rowCount: 1,
      };
    }

    if (table.includes('shared_trees')) {
      return {
        rows: [
          {
            id: uuidv4(),
            user1_id: params[0] || uuidv4(),
            user2_id: params[1] || uuidv4(),
            progress_state: { synchronised: true, node_count: 42 },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        rowCount: 1,
      };
    }

    if (table.includes('active_devices')) {
      return {
        rows: [
          {
            id: uuidv4(),
            user_id: params[0] || uuidv4(),
            device_name: 'Desktop App (macOS)',
            device_type: 'desktop',
            ip_address: '185.120.45.12',
            last_active: new Date().toISOString(),
            created_at: new Date(Date.now() - 172800000).toISOString(),
          },
        ],
        rowCount: 1,
      };
    }

    return { rows: [], rowCount: 0 };
  }
}

const pool = new ConnectionPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
