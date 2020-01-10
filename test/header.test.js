const CustomPage = require('./helpers/page');
let superPage;
beforeEach(async () => {
  superPage = await CustomPage.build();
  await superPage.goto('localhost:3000');
});
afterEach(async () => {
  await superPage.close();
});
test('The header has the correct text logo', async () => {
  const text = await superPage.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toEqual('Blogster');
});

test('When login button is clicked the browser navigates to google auth domain', async () => {
  await superPage.click('.right a');
  const url = await superPage.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test('When singed in shows the logout button', async () => {
  await superPage.login();
  const text = await superPage.$eval(
    'a[href="/auth/logout"]',
    el => el.innerHTML
  );
  expect(text).toEqual('Logout');
});
