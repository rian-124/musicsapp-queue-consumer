const nodemailer = require('nodemailer');
const config = require('./utils/config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });

    this.sendMail;
  }

  sendMail(targetEmail, content) {
    const message = {
      from: 'Musics Apps',
      to: targetEmail,
      subject: 'Export Playlist songs',
      text: 'Attached is the result of the notes export.',
      attachments: [
        {
          filename: 'playlistSongs.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
