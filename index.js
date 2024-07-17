const express = require("express");
const axios = require("axios").default;
const { Webhook } = require("@vermaysha/discord-webhook");
const env = require("dotenv").config();
const app = express();
const zammadToken = proces.ENV.ZAMMAD_TOKEN;
const mattermostToken = process.ENV.MATTERMOST_TOKEN;
const hook = new Webhook(process.ENV.DISCORD_WEBHOOK);

app.post("/mattermost/openticket", (req, res) => {
  hook.setContent(req.rawHeaders);
  hook.send();
  hook.setContent(req.body);
  hook.send();
});
