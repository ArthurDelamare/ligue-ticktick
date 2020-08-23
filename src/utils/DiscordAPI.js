const axios = require("axios");
const uuid = require("uuid");

class DiscordAPI {
  constructor(token) {
    this.api = axios.create({
      baseURL: "https://discord.com/api",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
  }

  /**
   * @param {string} message
   * @param {string} channelId
   */
  async sendDiscordMessage(message, channelId) {
    await this.api.post(`/channels/${channelId}/messages`, {
      content: message,
      nonce: uuid.v4().replace(/-/g, "").slice(0, 12),
      tts: false,
    });
  }
}

module.exports = DiscordAPI;
