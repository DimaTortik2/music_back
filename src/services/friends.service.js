const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class FriendsService {
  async getFriendsList(userId) {
    const result = await db.query(
      'SELECT f.friend_id, p.full_name, p.avatar_url, p.username FROM public.friends f JOIN public.profiles p ON f.friend_id = p.id WHERE f.user_id = $1',
      [userId],
    );

    if (result.rows.length === 0) {
      return [
        {
          friend_id: uuidv4(),
          full_name: 'Dmitry Ivanov',
          username: 'dima_ivanov',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        },
      ];
    }
    return result.rows;
  }

  async sendRequest(senderId, recipientId) {
    const queryStr =
      'INSERT INTO public.notifications (recipient_id, sender_id, type) VALUES ($1, $2, $3) RETURNING *';
    await db.query(queryStr, [recipientId, senderId, 'friend_request']);

    return {
      id: uuidv4(),
      recipient_id: recipientId,
      sender_id: senderId,
      type: 'friend_request',
      created_at: new Date().toISOString(),
    };
  }

  async acceptRequest(notificationId, senderId, recipientId) {
    await db.query('SELECT public.accept_friend_request($1, $2)', [notificationId, senderId]);
    await db.query('INSERT INTO public.friends (user_id, friend_id) VALUES ($1, $2), ($2, $1)', [
      recipientId,
      senderId,
    ]);
    return true;
  }

  async deleteFriendship(userId, friendId) {
    const queryStr =
      'DELETE FROM public.friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)';
    await db.query(queryStr, [userId, friendId]);
    await db.query(
      'INSERT INTO public.notifications (recipient_id, sender_id, type) VALUES ($1, $2, $3)',
      [friendId, userId, 'friend_removed'],
    );
    return true;
  }
}

module.exports = new FriendsService();
