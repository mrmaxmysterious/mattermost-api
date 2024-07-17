const express = require("express");
const axios = require("axios").default;
const { Webhook } = require("@vermaysha/discord-webhook");
const env = require("dotenv");
env.config();
const app = express();
const zammadToken = process.env.ZAMMAD_TOKEN;
const mattermostToken = process.env.MATTERMOST_TOKEN;
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

app.post("/mattermost/openticket", (req, res) => {
  hook.setContent(req.rawHeaders);
  hook.send();
  hook.setContent(req.body);
  hook.send();
});

app.listen(6262, () => {
  console.log("Online");
});
