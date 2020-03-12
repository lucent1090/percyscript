const PercyScript = require('@percy/script');

const websiteDEId = '7hTdOumEmWUmcuwi6ykKg2';

async function getRoutes() {
    const response = await client.getEntries({
            content_type: "route",
            include: 1,
            locale: 'de-DE',
            'fields.websites.sys.id': websiteDEId
          });
          
    return response.items;
};

// A script to navigate our app and take snapshots with Percy.
PercyScript.run(async (page, percySnapshot) => {

    const routes = await getRoutes();

    routes.slice(0, 5).forEach(route => {
        await page.goto(route);
        await percySnapshot(route);
    });
//   await page.goto('http://google.com');
//   await percySnapshot('Google home page');

//   await page.type('.gLFyf', 'test input 222');
//   await percySnapshot('Google input test')
  // Enter a new to-do.
  // await page.type('.new-todo', 'A really important todo');
  // await page.keyboard.press('Enter');
  // await percySnapshot('TodoMVC with a new todo', { widths: [768, 992, 1200] });
});