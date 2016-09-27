/* eslint-env node, mocha */
/* eslint no-undefined: off */

const expect = require("expect.js");
const weblinks = require("../src");

describe("create", () => {
    it("should set self with current params", () => {
        const links = weblinks.create("http://www.google.com/", 1, 20, 200);
        expect(links.self).to.have.key("query");
        expect(links.self.query.page).to.be(1);
        expect(links.self.query.page_size).to.be(20);
    });

    it("should set next when page*pageCount is less than totalCount", () => {
        const links = weblinks.create("http://www.google.com/", 1, 20, 200);
        expect(links.next).to.have.key("query");
        expect(links.next.query.page).to.be(2);
        expect(links.next.query.page_size).to.be(20);
    });

    it("should NOT set next when page*pageCount is greater than totalCount", () => {
        let links;

        links = weblinks.create("http://www.google.com/", 1, 20, 10);
        expect(links.next).to.be(undefined);

        links = weblinks.create("http://www.google.com/", 2, 20, 39);
        expect(links.next).to.be(undefined);
    });

    it("should set prev when page is greater than 1", () => {
        const links = weblinks.create("http://www.google.com/", 2, 20, 200);
        expect(links.prev).to.have.key("query");
        expect(links.prev.query.page).to.be(1);
        expect(links.prev.query.page_size).to.be(20);
    });

    it("should NOT set prev when page is less than 2", () => {
        const links = weblinks.create("http://www.google.com/", 1, 20, 200);
        expect(links.prev).to.be(undefined);
    });

    it("should create first with page 1", () => {
        const links = weblinks.create("http://www.google.com/", 1, 1, 1);
        expect(links.first).to.have.key("query");
        expect(links.first.query.page).to.be(1);
    });

    it("should create last to cover every item", () => {
        const page = 1;
        const pageSize = 10;
        const totalCount = 101;

        const links = weblinks.create("http://www.google.com/", page, pageSize, totalCount);

        expect(links.last).to.have.key("query");
        expect(links.last.query.page).to.be(11);
        expect(links.last.query.page_size).to.be(10);
    });

    it("should not remove custom query string", () => {
        const links = weblinks.create("http://www.google.com/?foo=bar", 1, 1, 1);

        expect(links.last).to.have.key("query");
        expect(links.last.query.foo).to.be("bar");
        expect(links.last.query.page).to.be(1);
        expect(links.last.query.page_size).to.be(1);
    });

});

describe("linkHeader", () => {
    it("should not have next unless it exists", () => {
        const links = weblinks.create("http://www.google.com/", 1, 1, 1);
        expect(links.linkHeader).not.to.match(/rel="next"/);
    });

    it("should properly format for every line", () => {
        const links = weblinks.create("http://www.google.com/", 1, 10, 100);
        links.linkHeader.split(",\n").forEach((line) => {
            expect(line).to.match(/<[^>]+>; rel="[^"]+"/);
        });
    });
});
