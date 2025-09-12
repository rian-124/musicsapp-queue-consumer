const { Pool } = require('pg');
const mapDBToPlaylistModel = require('./utils/mapDBToPlaylistModel');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs({ playlistId, owner }) {
    const query = {
      text: 'SELECT playlists.id, playlists.name, songs.id AS song_id, songs.title, songs.performer FROM playlists JOIN users ON playlists.owner = users.id LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id LEFT JOIN songs ON playlist_songs.song_id = songs.id LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id WHERE playlists.id = $1 AND (playlists.owner = $2 OR collaborations.user_id = $2)',
      values: [playlistId, owner],
    };

    const result = await this._pool.query(query);

    return mapDBToPlaylistModel(result.rows);
  }

  async getPlaylistOwner(playlistsId) {
    const query = {
      text: 'SELECT owner FROM playlists WHERE id = $1',
      values: [playlistsId],
    };

    const result = await this._pool.query(query);

    return result.rows[0].owner;
  }
}

module.exports = PlaylistsService;
