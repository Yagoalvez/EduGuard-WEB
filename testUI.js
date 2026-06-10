const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
    
    // Fill login
    await page.type('#email', 'Romulo@diretor.com');
    await page.type('#senha', '12345678');
    await page.click('button[type="submit"]');
    
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.goto('http://localhost:5173/ponto', { waitUntil: 'networkidle0' });
    
    await new Promise(r => setTimeout(r, 2000));
    
    // Check if there are any tr tags in table
    const rows = await page.$$('tr');
    console.log('Table rows count:', rows.length);
    
    // Check select options
    const options = await page.$$('option');
    console.log('Select options count:', options.length);
    for(let opt of options) {
       let optText = await page.evaluate(el => el.textContent, opt);
       console.log(' - option:', optText);
    }
    
    // Check what text is visible
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('Body Text snippet:', bodyText.substring(0, 500));
    
  } catch (err) {
    console.error('Script Error:', err);
  } finally {
    await browser.close();
  }
})();
