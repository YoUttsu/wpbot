const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();
const {run} =require("./scrapper")
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});
// Define the regular expression
const regex = /^\/lc\s\d+$/;

client.on('message', async (message) => {
    if (message.body === "/lc daily") {
        await message.reply("fetching daily")
        let content =await run("daily")
        await message.reply(content)
    }else if(message.body==="/lc random"){
        await message.reply("getting random question")
        let content = await run("random")
        await message.reply(content)
    }
    // Check if the message matches the regex
    else if (regex.test(message.body)) {
        // Your code here
        let number = Number(message.body.split(" ")[1]);
        await message.reply(await run(number));

    }
});


client.initialize();
