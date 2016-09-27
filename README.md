# Weblinks for javascript

This project creates pagination links for REST endpoints in accordance with [RFC5988](https://tools.ietf.org/html/rfc5988).

## Install

```bash
npm install --save weblinks
```

## Usage

### create

```javascript
const weblinks = require("weblinks");

weblinks.create("http://website.com", 2 /*page*/, 10 /*pageCount*/, 100 /*totalCount*/);

{ url: 'http://website.com',
  self:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 2, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  first:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 1, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  last:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 10, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  prev:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 1, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  next:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 3, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  linkHeader: `<http://website.com/?page=2&page_size=10>; rel="self",
               <http://website.com/?page=1&page_size=10>; rel="first",
               <http://website.com/?page=10&page_size=10>; rel="last",
               <http://website.com/?page=3&page_size=10>; rel="next",
               <http://website.com/?page=1&page_size=10>; rel="prev"` }
```

### Parse Header

```javascript
const weblinks = require("weblinks");

const header = `<http://website.com/?page=2&page_size=10>; rel="self",
               <http://website.com/?page=1&page_size=10>; rel="first",
               <http://website.com/?page=10&page_size=10>; rel="last",
               <http://website.com/?page=3&page_size=10>; rel="next",
               <http://website.com/?page=1&page_size=10>; rel="prev"`;

{ url: 'http://website.com',
  self:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 2, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  first:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 1, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  last:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 10, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  prev:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 1, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] },
  next:
   Url {
     protocol: 'http:',
     slashes: true,
     auth: null,
     host: 'website.com',
     port: null,
     hostname: 'website.com',
     hash: null,
     query: { page: 3, page_size: 10 },
     pathname: '/',
     path: '/',
     href: 'http://website.com/',
     toString: [Function] } }
