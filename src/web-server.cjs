const _http = require("http");
const _fs = require("fs");
const _path = require("path");
const _URL = require("url");

const _webServerPort = 5210;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types
const _mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json"
};

const _webServer = _http.createServer(
    function(pRequest, pResponse)
    {
        const tmpURL = _URL.parse(pRequest.url, true);

        // return dummy data
        if ( tmpURL.pathname.startsWith("/api/events/"))
        {
            // todo: parse more parts of the URL later
            // for now return static data just to test
            let tmpData = [
                { year: 2025, month: 11, day: 5, text: "some event", completed: false},
                { year: 2025, month: 11, day: 5, text: "some other event", completed: false},
                { year: 2025, month: 11, day: 5, text: "some other different event", completed: true}
            ];
            
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
            // send the header for the success (200) and the type of data (json)
            pResponse.writeHead(200, {"content-type": _mimeTypes[".json"]});

            // send the data
            pResponse.end(JSON.stringify(tmpData));

            // the request is complete
            return;
        }

        // serve static files
        if (( tmpURL.pathname == "/index.html") || ( tmpURL.pathname == "/") || ( tmpURL.pathname == ""))
        {
            const tmpIndexFile = _fs.readFileSync("./src/index.html");
            pResponse.writeHead(200, {"content-type": _mimeTypes[".html"]});

            // send the data
            pResponse.end(tmpIndexFile);

            return;
        }
        if ( tmpURL.pathname == "/render-calendar.js")
        {
            const tmpJavascriptFile = _fs.readFileSync("./src/render-calendar.js");
            pResponse.writeHead(200, {"content-type": _mimeTypes[".js"]});

            // send the data
            pResponse.end(tmpJavascriptFile);

            return;
        }
        if ( tmpURL.pathname == "/style.css")
        {
            const tmpCSSFile = _fs.readFileSync("./src/style.css");
            pResponse.writeHead(200, {"content-type": _mimeTypes[".css"]});

            // send the data
            pResponse.end(tmpCSSFile);

            return;
        }

        pResponse.writeHead(404);
    });

_webServer.listen(_webServerPort, 
    function()
    {
        console.log(`server started at: ${_webServerPort}`);
    });

