const express = require("express");
const axios = require("axios").default;
const { Webhook } = require("@vermaysha/discord-webhook");
const env = require("dotenv");
env.config();
const app = express();
const bodyParser = require("body-parser");
const zammadToken = process.env.ZAMMAD_TOKEN;
const mattermostToken = process.env.MATTERMOST_TOKEN;
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// https://zammad.maxhenson.co.uk/api/v1/users
// https://zammad.maxhenson.co.uk/api/v1/tickets

app.post("/mattermost/openticket", urlencodedParser, async (req, res) => {
  if (req.headers.authorization != mattermostToken)
    return res.send({
      text: "Authorization tokens do not match. Please check the token provided in the API ENV."
    });
  let ticketData = req.body.text.split(" | ");
  let email = ticketData[0];
  let title = ticketData[1];
  let description = ticketData[2];
  let users = await axios.get("https://zammad.maxhenson.co.uk/api/v1/users", {
    headers: {
      Authorization: zammadToken
    }
  });
  let user = users.data.filter((user) => {
    return user.email === email;
  });
  if (user.length > 1)
    return res.send({
      text: "Internal server error while filtering the users from Zammad."
    });
  //console.log(user, email, title, description, ticketData);
  let ticketCreate = await axios.post(
    "https://zammad.maxhenson.co.uk/api/v1/tickets",
    {
      title: title,
      group: process.env.DEFAULT_GROUP,
      customer_id: user[0].id,
      article: {
        from: email,
        subject: title,
        internal: false,
        sender: "Customer",
        type: "note",
        body: description
      }
    },
    {
      headers: {
        Authorization: zammadToken
      }
    }
  );
  if (ticketCreate.status === 201) {
    return res.send({ text: "Created Ticket#" + ticketCreate.data.number });
  }
  res.send({ text: "Unknown error occured." });
});

app.listen(6262, () => {
  console.log("Online");
});

setInterval(() => {
  axios.get(
    "https://kuma.maxhenson.co.uk/api/push/5AWn2PNzYv?status=up&msg=OK&ping="
  );
}, 20000);
