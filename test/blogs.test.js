const CustomPage = require('./helpers/page');
let superPage;
beforeEach(async () => {
  superPage = await CustomPage.build();
  await superPage.goto('localhost:3000');
});
afterEach(async () => {
  await superPage.close();
});

describe('When logged in', () => {
  beforeEach(async () => {
    await superPage.login();
    await superPage.click('a.btn-floating');
  });
  test('in can see blog create form', async () => {
    const text = await superPage.getContentsOf('form label');
    expect(text).toEqual('Blog Title');
  });

  //   describe('And using valid inputs', () => {
  //     beforeEach(async () => {
  //       await superPage.type('.title input', 'My Title');
  //       await superPage.type('.content input', 'My Content');
  //       await superPage.click('form button');
  //     });
  //     test('takes user to review screen', async () => {
  //       const text = await superPage.getContentsOf('h5');
  //       expect(text).toEqual('Please confirm your entries');
  //     });
  // test('submitting then saving adds blog to index page', async () => {
  //   await superPage.click('button.green');
  //   await superPage.waitFor('.card');
  //   const title = await superPage.getContentsOf('.card-title');
  //   const content = await superPage.getContentsOf('p');
  //   expect(title).toEqual(titleText);
  //   expect(content).toEqual(contentText);
  // });
  //   });
  describe('And using invalid inputs', () => {
    beforeEach(async () => {
      await superPage.click('form button');
    });
    test('the form shows an error message', async () => {
      const titleError = await superPage.getContentsOf('.title .red-text');
      const contentError = await superPage.getContentsOf('.content .red-text');
      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
});
