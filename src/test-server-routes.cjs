console.log(`Starting to test the server routes.`);

const route = "/api/events/for/2025/11/10";

function checkRoute(pRoute)
{
    const splitRoute = pRoute.split("/");
    console.log(splitRoute);
    if (splitRoute.length < 7)
    {
        return false;
    }
    if (splitRoute[2] == "events")
    {
        getDateOfEvent(route);
    }
    else if (splitRoute[2] == "users")
    {
        getUserInfo(route);
    }
}

function getUserInfo(pRoute)
{
    const tmpRootUsername = splitRoute[4];
    const tmpRootUserEmail = splitRoute[5];
    const tmpRootUserPassword = splitRoute[6];
    console.log(`Username: ${tmpRootUsername} Email: ${tmpRootUserEmail} Password: ${tmpRootUserPassword}`);
    return {
        username: tmpRootUsername,
        email: tmpRootUserEmail,
        password: tmpRootUserPassword
    };
}

// function getDateOfEvent(pRoute)
// {
//     const tmpRouteYear = parseInt(splitRoute[4]);
//     const tmpRouteMonth = parseInt(splitRoute[5]);
//     const tmpRouteDay = parseInt(splitRoute[6]);
//     console.log(`Year: ${tmpRouteYear} Month: ${tmpRouteMonth} Day: ${tmpRouteDay}`);
//     return {
//         year: tmpRouteYear,
//         month: tmpRouteMonth,
//         day: tmpRouteDay
//     };
// }

checkRoute();

console.log(`Done testing server routes.`); 