require("dotenv").config()
const accountSid = process.env.twillioSid;
const authToken = process.env.twillioAuthToken;
const schedule = require("node-schedule")
const client = require('twilio')(accountSid, authToken);
let pup = require("puppeteer")
async function run() {
    const browser = await pup.launch();
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    });
    await page.goto("https://leetcode.com/problemset/")


    await new Promise(resolve => setTimeout(resolve, 3000));

    const href = await page.evaluate(() => {
        const anchor = document.querySelector("#__next > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a");
        return anchor ? anchor.getAttribute('href') : null;
    });
    await page.goto("https://leetcode.com" + href);
    console.log("https://leetcode.com" + href)
    await new Promise(resolve => setTimeout(resolve, 3000));
    const content = await page.evaluate(() => {
        const contentElements = Array.from(document.querySelectorAll('p, pre, li'));
        const content = [];
        for (const el of contentElements) {
            const text = el.textContent.trim();
            if (text.startsWith("1. Please don't post any solutions in this discussion.")) {
                break;
            }
            content.push(text);
        }
        return content.join('\n');
    });

    console.log(content)

    await browser.close()

    client.messages
        .create({
            body: content,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:'+process.env.myWpNumber
        })
        .then(message => console.log(message.sid))
}
// schedule.scheduleJob("10 0 * * *",()=>{
//     console.log("schedule running")
//     run();
// })
schedule.scheduleJob("* * * * *",async()=>{
    console.log("schedule running")
    await run();
})

