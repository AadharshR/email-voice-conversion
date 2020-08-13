/**
 * Get the recent email from your Gmail account
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

'use strict';
const say = require('say')
const fs = require('fs');
const {promisify} = require('util');
const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
const gmail = google.gmail('v1');

// Promisify with promise
const readFileAsync = promisify(fs.readFile);
const gmailGetMessagesAsync = promisify(gmail.users.messages.get.bind(gmail));
const gmailListMessagesAsync = promisify(gmail.users.messages.list.bind(gmail));

const TOKEN_DIR = __dirname;
const TOKEN_PATH = TOKEN_DIR + '/token.json'; // Specify the access token file

const main = async () => {
    // Get credential information  & specify the client secret file
    const content = await readFileAsync(__dirname+'/client_secret.json'); 
    const credentials = JSON.parse(content); // credential

    // authentication
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
    const token = await readFileAsync(TOKEN_PATH);
    oauth2Client.credentials = JSON.parse(token);

// Access the gmail via API
let res = await gmailListMessagesAsync({
        auth: oauth2Client,
        userId: "me",
        maxResults: 1, 
// Only get the recent email - 'maxResults' parameter
      });

      // Get the message id which we will need to retreive tha actual message next.
      const newestMessageId = res["data"]["messages"][0]["id"];
      // Retreive the actual message using the message id
      res = await gmailGetMessagesAsync({
        auth: oauth2Client,
        userId: "me",
        id: newestMessageId,  
      });
      
      //Then we will need to decode the base64 encoded message.
    let body_content = JSON.stringify(res.data.payload.body.data);
    let data, buff, text;
    data = body_content;
    buff = new Buffer.from(data, "base64");
    let mailBody = buff.toString();
    // display the result
    // console.log(mailBody);
    let plainText = mailBody.replace(/<[^>]+>/g, '');
    console.log("plain",plainText)
    say.speak(plainText)
};

main();