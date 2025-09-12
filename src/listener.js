class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );
      console.log(`target email: ${targetEmail}`);

      const owner = await this._playlistsService.getPlaylistOwner(playlistId);

      const playlistSongs = await this._playlistsService.getPlaylistSongs({
        playlistId,
        owner,
      });
      console.log(`data playlist ${playlistSongs}`);

      const result = await this._mailSender.sendMail(
        targetEmail,
        JSON.stringify(playlistSongs)
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
