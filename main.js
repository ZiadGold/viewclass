const pc = false

// const puppeteer = require('puppeteer');
const { MongoClient } = require('mongodb');
const path = require("path");
const express = require("express");
const app = express(); // start an express app
const cors = require('cors')
const router = express.Router(); // further configuration
router.use(cors())
app.use(express.static('public'));
  //CHUNK 2
  // DATA PARSING
  
app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());


router.get('/', (req, res) => {//second parameter is
  res.sendFile(path.join(__dirname, "/public/home/home.html"))


  const ip = 
  req.headers['cf-connecting-ip'] ||
  req.headers['x-real-ip'] ||
  req.header['x-forwarded-for'] ||
  req.socket.remoteAddress || '';
  // console.log(ip)
  // a function
  
  //res.redirect('/home');
  
})

const { Keyboard } = require('puppeteer');
require("dotenv").config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const googleUsername = "helomen321@gmail.com";
const googlePassword = "helomen321@1234";



async function main() {
    const uri = "mongodb+srv://azozomessenger:123QMZzo91iap@cluster0.xdshdrw.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
    } catch (e){
      console.error(e);
    } finally {
      await client.close();
    }
  
  }
  
main().catch(console.error);

const uri = "mongodb+srv://azozomessenger:123QMZzo91iap@cluster0.xdshdrw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

console.log("Started")
async function run(){
    var browser;
    //const browser = await puppeteer.launch({headless:false, userDataDir: './viewclass'});
    if (pc) {
      browser = await puppeteer.launch({headless:false, args:[
        '--no-sandbox',
        '--disable-gpu',
        '--enable-webgl',
        '--window-size=800,800'
     ]});
    }
    else {
      browser = await puppeteer.launch({
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      });
    }
    const page = await browser.newPage();

    // const loginUrl = "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en";
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'; 

    await page.setUserAgent(ua);
    // await page.goto(loginUrl, { waitUntil: 'networkidle2' });
    // await page.type('input[type="email"]', googleUsername);
    // await page.keyboard.press('Enter');
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // await page.type('input[type="password"]', googlePassword);
    // await page.keyboard.press('Enter');

    // await new Promise(resolve => setTimeout(resolve, 5000));

    await page.goto("https://example.com/");
    console.log(await page.evaluate(() => document.title))
    await page.goto("https://my.viewclass.com/login?lang=en");
    console.log(await page.evaluate(() => document.title))
    var username = "20180055";
    var password = "802330";
    var account_result = await client.db("viewclass").collection("accounts").findOne({username: username});
    console.log(account_result)
    var result
    if (account_result == null) {
        console.log("Account not found")
        // Find the username and password input fields and enter the desired values
        await page.type('input[name="username"]', username);
        await page.type('input[name="password"]', password);
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Switch to reCAPTCHA iframe
        await page.waitForSelector('iframe[title="reCAPTCHA"]');
        const frameHandle = await page.$('iframe[title="reCAPTCHA"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        const frame = await frameHandle.contentFrame();

        // Click on reCAPTCHA checkbox
        await frame.waitForSelector('#recaptcha-anchor-label');
        await frame.click('#recaptcha-anchor-label');
        await new Promise(resolve => setTimeout(resolve, 8000));


        var title = await page.evaluate(() => document.title)
        console.log(title)
        if (title == "Home | ViewClass LMS") {
            await page.goto("https://my.viewclass.com/student/subject/homework");
            await new Promise(resolve => setTimeout(resolve, 3000));

            var assignments = await page.evaluate(() => {
                const rows = Array.from(document.querySelectorAll('#viewTable tbody tr'));
                return rows.map(row => {
                  const columns = row.querySelectorAll('td');
                  return {
                    title: columns[0].innerText,
                    course: columns[1].innerText,
                    publish_date: columns[2].innerText,
                    cutoff_date: columns[3].innerText,
                    submit: columns[4].innerText.trim(),
                    mark: columns[5].innerText,
                    correcting: columns[6].innerText,
                    action: columns[7].querySelector('a').innerText.toLowerCase()
                  };
                });
              });
            console.log(assignments)
        }
        else {
            console.log(`Login to ${username} with ${password} was not successful.`)
        }
        
        //result = await client.db("viewclass").collection("accounts").insertOne({username: username}); 
        //console.log(result)
    }
    // await page.screenshot({path: "screenshot.png", fullPage: true})
    // await page.pdf({path: "screenshot.pdf", format: "A4"})

    // const html = await page.content();

    // const title = await page.evaluate(() => document.title)

    

    // Wait for reCAPTCHA challenge completion (adjust the time as needed)
    await new Promise(resolve => setTimeout(resolve, 1000*60*60));
    await page.screenshot({path: "screenshot.png", fullPage: true})
    await page.pdf({path: "screenshot.pdf", format: "A4"})
    await browser.close();
}

run();

app.use("/", router)
app.listen(5000, () => {
    console.log(new Date().toLocaleString())
})
