const puppeteer = require("puppeteer");
const tokenFactory = require("../factories/tokenFactory");
// const userFactory = require('../factories/userFactory');

class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function(target, property) {
                return (
                    customPage[property] || browser[property] || page[property]
                );
            }
        });
    }

    constructor(page) {
        this.page = page;
    }

    async login() {
        const userId = 43;
        const token = tokenFactory(userId);
        await this.page.evaluate(token => {
            localStorage.setItem("jwtToken", token);
        });
        await this.page.goto("localhost:3000");
    }
}

module.exports = CustomPage;