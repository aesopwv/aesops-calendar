const _http = require("http");
const _fs = require("fs");
const _path = require("path");
const _URL = require("url");

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'e#j"<x]T5H:(.MOZXs~Uzrg[}kyT[yMt',
    database : 'aesopsevents'
});

connection.connect();

const _webServerPort = 5210;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types
const _mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json"
};

// gets data for specific date in the URL
function getDateOfEvent(pRoute)
{
    const tmpSplitRoute = pRoute.split("/");
    console.log(tmpSplitRoute);
    if (tmpSplitRoute.length < 7)
    {
        return false;
    }

    const routeYear = parseInt(tmpSplitRoute[4]);
    const routeMonth = parseInt(tmpSplitRoute[5]);
    const routeDay = parseInt(tmpSplitRoute[6]);
    console.log(`Year: ${routeYear} Month: ${routeMonth} Day: ${routeDay}`);
    return {
        year: routeYear,
        month: routeMonth,
        day: routeDay
    };
}

// gets data for specific user in the URL
function getUserInfo(pRoute)
{
    const tmpSplitRoute = pRoute.split("/");
    console.log(tmpSplitRoute);
    if (tmpSplitRoute.length < 7)
    {
        return false;
    }
    const tmpRootUserId = tmpSplitRoute[4];
    const tmpRootUsername = tmpSplitRoute[5];
    const tmpRootUserEmail = tmpSplitRoute[6];
    console.log(`User id: ${tmpRootUserId} Email: ${tmpRootUserEmail} Password: ${tmpRootUserId}`);
    return {
        username: tmpRootUsername,
        email: tmpRootUserEmail,
        id: tmpRootUserId
    };
}

const _webServer = _http.createServer(
    function(pRequest, pResponse)
    {
        const tmpURL = _URL.parse(pRequest.url, true);

        // return events data
        if ( tmpURL.pathname.startsWith("/api/events"))
        {
            // 1. parse the URL for the date
            const tmpDateOfEvent = getDateOfEvent(tmpURL.pathname);
            // 2. read the events for our date from the database
            connection.query(`SELECT * FROM events_table WHERE event_year = ${tmpDateOfEvent.year} AND event_month = ${tmpDateOfEvent.month} AND event_day = ${tmpDateOfEvent.day}`,
                function (error, results, fields)
                {
                    // error will be an Error if one occurred during the query
                    // results will contain the results of the query
                    // fields will contain information about the returned results fields (if any)
                    // 3. send the events as JSON
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
                    // send the header for the success (200) and the type of data (json)
                    pResponse.writeHead(200, {"content-type": _mimeTypes[".json"]});

                    // send the data
                    pResponse.end(JSON.stringify(results));
                    console.log(results);
                    });
            return;
        }
            // // todo: parse more parts of the URL later
            // // for now return static data just to test
            // let tmpData = [
            //     { year: 2025, month: 11, day: 5, text: "some event", completed: false},
            //     { year: 2025, month: 11, day: 5, text: "some other event", completed: false},
            //     { year: 2025, month: 11, day: 5, text: "some other different event", completed: true}
            // ];
            
            // // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
            // // send the header for the success (200) and the type of data (json)
            // pResponse.writeHead(200, {"content-type": _mimeTypes[".json"]});

            // // send the data
            // pResponse.end(JSON.stringify(tmpData));

            // the request is complete

        // return user data
        if ( tmpURL.pathname.startsWith("/api/users"))
        {
            // 1. parse the URL for the date
            const tmpUserInfo = getUserInfo(tmpURL.pathname);
            // 2. read the events for our date from the database
            connection.query(`SELECT * FROM user_table WHERE user_id = ${tmpUserInfo.id} AND user_email = ${tmpUserInfo.email} AND username = ${tmpUserInfo.username}`,
                function (error, results, fields) {
                    // error will be an Error if one occurred during the query
                    // results will contain the results of the query
                    // fields will contain information about the returned results fields (if any)
                    // 3. send the user info as JSON
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
                    // send the header for the success (200) and the type of data (json)
                    pResponse.writeHead(200, {"content-type": _mimeTypes[".json"]});

                    // send the data
                    pResponse.end(JSON.stringify(results));
                    console.log(results);
                });
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

