const URL = require("url");
const qs = require("querystring");

module.exports = {
    create: (url, page, pageSize, totalCount) => {
        const res = {
            url: url,
            self: makeURL(url, page, pageSize),
            first: makeURL(url, 1, pageSize),
            last: makeURL(url, Math.ceil(totalCount / pageSize), pageSize),
        };

        if (page > 1) {
            res.prev = makeURL(url, page - 1, pageSize);
        }

        if (totalCount > page * pageSize) {
            const nextPage = (page || 1) + 1; // page 0 needs to result in page 2
            res.next = makeURL(url, nextPage, pageSize);
        }


        res.linkHeader = ["self", "first", "last", "next", "prev"]
            .filter((key) => res[key] != null)
            .map((key) => {
                return `<${res[key]}>; rel="${key}"`;
            })
            .join(",\n");

        return res;
    }
};

/**
 * make a url from params
 * @param {String} baseURL - the base url of the endpoint
 * @param {Number} page - which page to make the URL for
 * @param {Number} pageSize - how large pageSize should be
 * @returns {Object} URL object - toString of object creates the full url
 */
function makeURL(baseURL, page, pageSize) {
    if (page < 1) {
        return null;
    }
    const url = URL.parse(baseURL);
    url.query = Object.assign({}, qs.parse(url.query), {
        page: page,
        page_size: pageSize
    });
    Reflect.deleteProperty(url, "search");
    url.toString = () => {
        return URL.format(url);
    };
    return url;
}


