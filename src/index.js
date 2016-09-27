const URL = require("url");
const qs = require("querystring");

/**
 * Weblinks
 * @typedef {Object} Weblinks
 * @property {Url} self - url which points to the current page
 * @property {Url} next - url which points to the next page
 * @property {Url} prev - url which points to the previous page
 * @property {Url} first - url which points to the first page
 * @property {Url} last - url which points to the last page
 * @property {String} linkHeader - value to be added to the Link header on the response
 */

module.exports = {
    /**
     * create weblinks
     * @param {String} url - the url which pagination will be appended to
     * @param {Number} page - the page which will resolve to rel=self
     * @param {Number} pageSize - how many items per page
     * @param {Number=} totalCount - how many items total. Defaults to pageSize.
     * @returns {Weblinks} - resulting weblinks
     */
    create: (url, page, pageSize, totalCount) => {
        totalCount = totalCount || pageSize;

        const res = {
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
    },
    /**
     * parseHeader parses a Link header
     * @param {String} headerVal - the value of the Link header
     * @returns {Weblinks} the resulting links
     */
    parseHeader: (headerVal) => {
        if (!headerVal) {
            return null;
        }
        const lines = headerVal.split(",\n");
        const res = {};

        const re = /<([^>]+)>; rel="([^"]+)"/;
        lines.forEach((line) => {
            const match = re.exec(line);
            if (match) {
                const parsed = URL.parse(match[1]);
                parsed.query = qs.parse(parsed.query);
                res[match[2]] = parsed;
            }
        });

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


