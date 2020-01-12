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
	test.only('in can see blog create form', async () => {
		const text = await superPage.getContentsOf('form label');
		expect(text).toEqual('Blog Title');
	});
	describe('And using invalid inputs', () => {
		beforeEach(async () => {
			superPage.click('form button');
		});
		test('the form shows an error message', async () => {
			const titleError = superPage.getContentsOf('.title .red-text');
			expect(titleError).toEqual('You must provide a value');
		});
		const contentError = superPage.getContentsOf('.content .red-text');
		expect(contentError).toEqual('You must provide a value');
	});
});
