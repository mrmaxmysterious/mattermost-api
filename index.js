const express = require("express");
const axios = require("axios").default;
const { Webhook } = require("@vermaysha/discord-webhook");
const app = express();
const zammadToken =
  "QGU91SzZZWWq5nnuJgPRhuVBVp1PoT5VWqbpyYqroFOL5Ef6ue34M2itzZZ8ikvq";
const mattermostToken = "yt8j9ethfiyfpk3ayf471rtzbh";
const hook = new Webhook(
  "https://discord.com/api/webhooks/1220853079318986812/SXbonG9vMvOyyUVFAdWrkw5NPVDx1J6m7zfHnpQUFjj_2nx3LUpBQ9YEAUD1XUGFNBqx"
);

app.post("/mattermost/openticket", (req, res) => {
  hook.setContent(req.rawHeaders);
  hook.send();
  hook.setContent(req.body);
  hook.send();
});
