const pc = false
const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');
const { MongoClient } = require('mongodb');
const path = require("path");
const express = require("express");
const app = express(); // start an express app
const cors = require('cors')
const router = express.Router(); // further configuration

const { Keyboard } = require('puppeteer');
require("dotenv").config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());



const pc_args = {headless:false, args:[
  '--no-sandbox',
  '--disable-gpu',
  '--enable-webgl',
  '--window-size=800,800',
  `--user-data-dir=./viewclass`,
  '--disable-blink-features=AutomationControlled'
]};


const non_pc_args = {
args: [
  "--disable-setuid-sandbox",
  "--no-sandbox",
  "--single-process",
  "--no-zygote",
],
executablePath:
  process.env.NODE_ENV === "production"
    ? process.env.PUPPETEER_EXECUTABLE_PATH
    : puppeteer.executablePath(),
};



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




app.post('/status', (req, res) => {
  async function status() {
    data = req.body //get the data
    status_result = await client.db("viewclass").collection("status").findOne({identity: "status"});
    var status = status_result["status"]

    res.json(status);
    // if (code_result == null) {
    //   let login = false;
    //   login_data_response = {
    //     login   
    //   }
    //   res.json(login_data_response);

    //   return;
    // }
    // var rand = () => {
    //   return Math.random().toString(36).substr(2);
    // };
    // let token;
    // var looper = true
    // while (looper == true) {
    //   token = rand() + rand();
    //   token_result = await client.db("his-news").collection("tokens").findOne({_id: "6468fd6976e98bb754035079"});
    //   let token_array = token_result["tokens"];

    //   if (token_array.includes(token)) {
    //     looper = true
    //   } else {
    //     looper = false
    //   }
    // }
    // let result = await client.db("his-news").collection("tokens").updateOne(
    //   { _id: "6468fd6976e98bb754035079" },
    //   { $push: { tokens: token } }
    // );


    // result = await client.db("his-news").collection("accounts").updateOne(
    //   { code: data['code'] },
    //   { $push: { tokens: token } }
    // );
    


    // let login = true;
    
    // let name = code_result['name']
    // console.log(`${name} has logged in`)
    //   login_data_response = {
    //     login,
    //     name,
    //     token
    //   }
    //   res.json(login_data_response);
    

  }
  status()
  
  
})



var browser;
var page;
var frameHandle;
var frame;




app.post('/login', (req, res) => {
  async function login() {
    data = req.body //get the data
    status_result = await client.db("viewclass").collection("status").findOne({identity: "status"});
    var status = status_result["status"]
    var username = data["args"][0]
    var password = data["args"][1]

    if (username == undefined || password == undefined) {
      res.json(0);
    }
    else {
      if (pc) {
        browser = await puppeteer.launch(pc_args);
      }
      else {
        browser = await puppeteer.launch(non_pc_args);
      }
  
      page = await browser.newPage();
      await page.emulateTimezone('Asia/Riyadh');
  
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'; 
  
      await page.setUserAgent(ua);
  
      await page.goto("https://my.viewclass.com/login?lang=en");
      title = await page.evaluate(() => document.title)

      // Find the username and password input fields and enter the desired values
      await page.type('input[name="username"]', username);
      await page.type('input[name="password"]', password);

      // Switch to reCAPTCHA iframe
      await page.waitForSelector('iframe[title="reCAPTCHA"]');
      frameHandle = await page.$('iframe[title="reCAPTCHA"]');
      await new Promise(resolve => setTimeout(resolve, 2000));
      frame = await frameHandle.contentFrame();

      // Click on reCAPTCHA checkbox
      await frame.waitForSelector('#recaptcha-anchor-label');
      await frame.click('#recaptcha-anchor-label');
      console.log("shit")
      await new Promise(resolve => setTimeout(resolve, 7000));
      if (await page.evaluate(() => document.title) == "Home | ViewClass LMS") {
        
        var response = 1
        console.log(response)
        res.json(response);
      }
      else {
        const isErrorPresent = await page.$$eval('span', spans => 
        spans.some(span => span.textContent === 'Username or password incorrect')
      );

      if (isErrorPresent) {
        var response = 2
        console.log(response)
        res.json(response);
      } else {
        
          await page.waitForSelector('iframe[title="recaptcha challenge expires in two minutes"]');
          frameHandle = await page.$('iframe[title="recaptcha challenge expires in two minutes"]');
          frame = await frameHandle.contentFrame();
          await new Promise(resolve => setTimeout(resolve, 5000));
          await frame.waitForSelector('#recaptcha-audio-button');
          await new Promise(resolve => setTimeout(resolve, 5000));
          await frame.click('#recaptcha-audio-button');
          await new Promise(resolve => setTimeout(resolve, 4000));
          const href = await frame.$eval('a.rc-audiochallenge-tdownload-link', element => element.href);
          console.log('Href:', href);
    
    
          var title = await page.evaluate(() => document.title)
    
          var response = {title: title, href: href}
    
          res.json(response);
        }

        
      }
      
    }


    
    

  }
  login()
  
  
})


app.post('/recaptcha', (req, res) => {
  async function recaptcha() {
    data = req.body
    var text = data["result"]
    await frame.waitForSelector('#audio-response');
    await frame.type('input[id="audio-response"]', text);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await frame.waitForSelector('#recaptcha-verify-button');
    await frame.click('#recaptcha-verify-button');

    
    console.log(data)
    console.log(await page.evaluate(() => document.title))

    await new Promise(resolve => setTimeout(resolve, 7000));
    if (await page.evaluate(() => document.title) == "Home | ViewClass LMS") {
      
      var response = 1
      console.log(response)
      res.json(response);
    }

    else {
      var response = 0
      console.log(response)
      res.json(response);
    }

  }
  recaptcha()
})




app.post('/logout', (req, res) => {
  async function logout() {
    data = req.body
    await browser.close();
    var out = true;
    res.json(out);
  }
  logout()
})



app.post('/assignments', (req, res) => {
  async function assignments() {
    data = req.body
    await page.goto("https://my.viewclass.com/student/subject/homework");
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.waitForSelector('div.dataTables_scroll');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Extract the HTML content of the element
    const assignmentsHTML = await page.$eval('div.dataTables_scroll', element => element.innerHTML);
  
    // Parse the HTML content to extract assignment data
    const assignments = [];
    const $ = cheerio.load(assignmentsHTML);
    $('tbody tr').each((index, element) => {
      const cells = $(element).find('td');
      const assignment = {
        title: $(cells[0]).text().trim(),
        course: $(cells[1]).text().trim(),
        publish_date: $(cells[2]).text().trim(),
        cutoff_date: $(cells[3]).text().trim(),
        submit: $(cells[4]).text().trim(),
        mark: $(cells[5]).text().trim(),
        correcting: $(cells[6]).text().trim(),
        action: $(cells[7]).find('a').text().trim() || ''
      };
      assignments.push(assignment);
    });
    res.json(assignments)
  }
  assignments()
})

console.log("Started")
async function run(){
    var browser;
    //const browser = await puppeteer.launch({headless:false, userDataDir: './viewclass'});
    if (pc) {
      browser = await puppeteer.launch(pc_args);
    }
    else {
      browser = await puppeteer.launch(non_pc_args);
    }
    

    const page = await browser.newPage();
  
    await page.emulateTimezone('America/Chicago');
    //const response = await page.goto('http://scooterlabs.com/echo.json');



    
    //here

    //console.log(await response.json());


    

    // const loginUrl = "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en";
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'; 

    await page.setUserAgent(ua);
    // await page.goto(loginUrl, { waitUntil: 'networkidle2' });
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // await page.type('input[type="email"]', googleUsername, { delay: 50 });
    // await page.keyboard.press('Enter');
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // await page.type('input[type="password"]', googlePassword, { delay: 50 });
    // await page.keyboard.press('Enter');

    // await new Promise(resolve => setTimeout(resolve, 5000 * 60));

    //await page.goto("https://example.com/");
    //console.log(await page.evaluate(() => document.title))
    
    await page.goto("https://my.viewclass.com/login?lang=en");
    console.log(await page.evaluate(() => document.title))
    var username = "20180055";
    var password = "802330";
    //var account_result = await client.db("viewclass").collection("accounts").findOne({username: username});
    //console.log(account_result)
    var account_result = null
    var result
    if (account_result == null) {
        console.log("Account not found")
        // Find the username and password input fields and enter the desired values
        await page.type('input[name="username"]', username);
        await page.type('input[name="password"]', password);

        // Switch to reCAPTCHA iframe
        await page.waitForSelector('iframe[title="reCAPTCHA"]');
        var frameHandle = await page.$('iframe[title="reCAPTCHA"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        var frame = await frameHandle.contentFrame();

        // Click on reCAPTCHA checkbox
        await frame.waitForSelector('#recaptcha-anchor-label');
        await frame.click('#recaptcha-anchor-label');

        await new Promise(resolve => setTimeout(resolve, 5000));
        await page.waitForSelector('iframe[title="recaptcha challenge expires in two minutes"]');
        frameHandle = await page.$('iframe[title="recaptcha challenge expires in two minutes"]');
        frame = await frameHandle.contentFrame();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await frame.waitForSelector('#recaptcha-audio-button');
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("waited")
        await frame.click('#recaptcha-audio-button');
        await new Promise(resolve => setTimeout(resolve, 4000));
        const href = await frame.$eval('a.rc-audiochallenge-tdownload-link', element => element.href);
        console.log('Href:', href);


        var title = await page.evaluate(() => document.title)
        console.log(title)
        if (title == "Home | ViewClass LMS") {
            await page.goto("https://my.viewclass.com/student/subject/homework");
            await new Promise(resolve => setTimeout(resolve, 5000));
            await page.waitForSelector('div.dataTables_scroll');

            // Extract the HTML content of the element
            const assignmentsHTML = await page.$eval('div.dataTables_scroll', element => element.innerHTML);
          
            // Parse the HTML content to extract assignment data
            const assignments = [];
            const $ = cheerio.load(assignmentsHTML);
            $('tbody tr').each((index, element) => {
              const cells = $(element).find('td');
              const assignment = {
                title: $(cells[0]).text().trim(),
                course: $(cells[1]).text().trim(),
                publish_date: $(cells[2]).text().trim(),
                cutoff_date: $(cells[3]).text().trim(),
                submit: $(cells[4]).text().trim(),
                mark: $(cells[5]).text().trim(),
                correcting: $(cells[6]).text().trim(),
                action: $(cells[7]).find('a').text().trim() || ''
              };
              assignments.push(assignment);
            });
          
            console.log(assignments);
            await page.goto("https://my.viewclass.com/logout");
            
            if (await page.evaluate(() => document.title == "تسجيل الدخول | فيوكلاس LMS")) {console.log("logged out successfuly")} 
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
    await new Promise(resolve => setTimeout(resolve, 1000*120));
    // await page.screenshot({path: "screenshot.png", fullPage: true})
    // await page.pdf({path: "screenshot.pdf", format: "A4"})
    console.log("Closing Browser")
    await browser.close();
}


const port = process.env.PORT || 5002
app.use("/", router)
app.listen(port, () => {
    console.log(new Date().toLocaleString())
})

// app.listen(5000, () => {
//   console.log(new Date().toLocaleString())
// })