const Page = require("./helpers/page");

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto("http://localhost:3000");
});

afterEach(async () => {
    await page.close();
});

describe("When not logged in", async () => {
    const actions = [{
            method: 'post',
            path: '/api/blogs',
            data: {
                title: "My Title",
                content: "My Content"
            }
        },
        {
            method: 'get',
            path: '/api/blogs',
        }
    ];

    test('Blog related actions are prohibited', async () => {
        const results = await page.execRequests(actions);
        results.map(result => (
            expect(result.error).toEqual("You must log in!")
        ))
    });
});

describe("When logged in", async () => {
    beforeEach(async () => {
        await page.login();
        await page.click("a.btn-floating");
    });

    test("can see blog create form", async () => {
        const label = await page.getContent("form label");

        expect(label).toEqual("Blog Title");
    });

    describe("And using invalid inputs", async () => {
        beforeEach(async () => {
            await page.click("form button");
        });

        test("the form shows an error message", async () => {
            const titleError = await page.getContent(".title .red-text");
            const contentError = await page.getContent(".content .red-text");

            expect(titleError).toEqual("You must provide a value");
            expect(contentError).toEqual("You must provide a value");
        });
    });

    describe("And using valid inputs", async () => {
        beforeEach(async () => {
            await page.type(".title input", "My test title");
            await page.type(".content input", "My test content");
            await page.click("form button");
        });

        test("Submitting takes user to review screen", async () => {
            const reviewText = await page.getContent("h5");

            expect(reviewText).toEqual("Please confirm your entries");
        });

        test("Submitting then saving adds blog to index page", async () => {
            await page.click("button.green");

            await page.waitFor(".card");

            const postTitle = await page.getContent(".card-title");
            const postContent = await page.getContent("p");

            expect(postTitle).toEqual("My test title");
            expect(postContent).toEqual("My test content");
        });
    });
});