

const pup = require("puppeteer-extra")
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
pup.use(StealthPlugin())
const {executablePath} =require("puppeteer")
async function run(input) {
    if (input=="random") {
        //click event is not working so quick fix for some time 
        // const browser = await pup.launch({headless:true,executablePath:executablePath()})
        // const page = await browser.newPage()
        // await page.goto("https://leetcode.com/problemset/")
        // await new Promise(resolve => setTimeout(resolve, 3000));
        // await page.click("#__next > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1)> div:nth-child(4)> div:nth-child(1) > div:nth-child(1)> div:nth-child(5)> div:nth-child(3) >span:nth-child(2)");
        
        // await new Promise(resolve => setTimeout(resolve, 5999));
        // await page.screenshot({ 
        //     path: 'fullpage.png', // path where to save the screenshot
        //     fullPage: true // capture full page
        // });
        const randomNumber = Math.floor(Math.random() * 3072) + 1;
        return await run(randomNumber)
        
        // await browser.close()
         
    }
    else if (input == "daily") {
        const browser = await pup.launch({headless:true,executablePath:executablePath()})
        const page = await browser.newPage()
        await page.goto("https://leetcode.com/problemset/")
        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.evaluate(() => {
            localStorage.setItem('dynamicIdeLayoutGuide', 'true');
            localStorage.setItem('used-dynamic-layout', 'true');
        });
        const href = await page.evaluate(() => {
            const anchor = document.querySelector("#__next > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a");
            return anchor ? anchor.getAttribute('href') : null;
        });
        await page.evaluate(() => {
            localStorage.setItem('dynamicIdeLayoutGuide', 'true');
            localStorage.setItem('used-dynamic-layout', 'true');
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

        

        await browser.close()
        console.log(content)
        return content

    } else if (Number.isInteger(input)) {
        const browser = await pup.launch({headless:true,executablePath:executablePath()})
        const page = await browser.newPage()
        await page.goto("https://leetcode.com/problemset/")
        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.type("#__next > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1)> div:nth-child(4)> div:nth-child(1) > div:nth-child(1)> div:nth-child(5)> div:nth-child(1)> div:nth-child(1)>input",String(input))
        await new Promise(resolve => setTimeout(resolve, 3000));
        const href = await page.evaluate(() => {
            const anchor = document.querySelector("#__next > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) >div:nth-child(2)>div:nth-child(2)>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>a ");
            return anchor ? anchor.getAttribute('href') : null;
        });
        // const browser = await pup.launch({
        //     executablePath: '/usr/bin/google-chrome', // Path to Chrome executable
        //     args: ['--no-sandbox', '--disable-setuid-sandbox'], // Additional arguments
        // });
    
        console.log("https://leetcode.com" +href)
        await page.evaluate(() => {
            localStorage.setItem('dynamicIdeLayoutGuide', 'true');
            localStorage.setItem('used-dynamic-layout', 'true');
        });
        
        await page.goto("https://leetcode.com" +href)
        await new Promise(resolve => setTimeout(resolve, 3000));

        
        // const html = await page.evaluate(() => {
        //     const element = document.querySelector("#__next > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) >div:nth-child(2)>div:nth-child(2)>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>a ");
        //     return element ? element.innerHTML : null;
        // });
    
        // if (html) {
        //     fs.writeFile("html.txt", html, err => {
        //         if (err) {
        //             console.error("Error writing to file:", err);
        //         } else {
        //             console.log("HTML content has been saved to html.txt");
        //         }
        //     });
        // } else {
        //     console.error("Could not find the specified element on the page.");
        // }
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

        

        await browser.close()
        console.log(content)
        return content
    
    }
}
module.exports = {run}
