const contentful = require("contentful");
const PercyScript = require('@percy/script');
const _ = require('lodash');

const websiteDEId = '7hTdOumEmWUmcuwi6ykKg2';

const client = contentful.createClient({
    space: "txhaodyqr481",
    accessToken: "1ae7da438a372b631dd85dd0569282a2829f8e75f062bba38922f5e22158bd32",
    environment: "master",
    host: "cdn.contentful.com"
  });

async function getRoutes() {
    const response = await client.getEntries({
            content_type: "route",
            include: 1,
            locale: 'de-DE',
            'fields.websites.sys.id': websiteDEId
          });
          
    return response.items.map(item => (item.fields.url));
};

// A script to navigate our app and take snapshots with Percy.
PercyScript.run(async (page, percySnapshot) => {

    const routes = await getRoutes();
    const query = routes.slice(0, 3).map(route => {
        return async route => {
            await page.goto(route);
            await percySnapshot(route);
        };
    });
    Promise.all(query)

    // const url1 = routes[0].fields.url;
    // await page.goto(url1);
    // await percySnapshot(url1);
//   await page.goto('http://google.com');
//   await percySnapshot('Google home page');

//   await page.type('.gLFyf', 'test input 222');
//   await percySnapshot('Google input test')
  // Enter a new to-do.
  // await page.type('.new-todo', 'A really important todo');
  // await page.keyboard.press('Enter');
  // await percySnapshot('TodoMVC with a new todo', { widths: [768, 992, 1200] });
});