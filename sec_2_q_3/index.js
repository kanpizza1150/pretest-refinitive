const puppeteer = require('puppeteer')
const key = process.argv[2]

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://codequiz.azurewebsites.net/')
  await page.waitForSelector('input[type=button]')
  await page.$eval('input[type=button]', (el) => el.click())

  await page.waitForSelector('p')
  const rows = await page.$$eval('tr', (elements) => elements.map((item) => item.innerHTML))
  const found = rows
    .find((str) => str.includes(key))
    .split('<td>')[2]
    .replace('</td>', '')
  console.log(found || 'not found')
  await browser.close()
})()
