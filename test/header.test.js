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
	const text = await superPage.getContentsOf('a.brand-logo');
	expect(text).toEqual('Blogster');
});

test('When login button is clicked the browser navigates to google auth domain', async () => {
	await superPage.click('.right a');
	const url = await superPage.url();
	expect(url).toMatch(/accounts\.google\.com/);
});

test('When singed in shows the logout button', async () => {
	await superPage.login();
	const text = await superPage.getContentsOf('a[href="/auth/logout"]');
	expect(text).toEqual('Logout');
});
