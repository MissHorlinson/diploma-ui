const { loginUrl, logoutUrl } = require("./url");

export const logIn = (creds) => fetch(loginUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(creds)
}).then(resp => {
    if (resp.ok) {
        return resp.json().then(data => ({ status: resp.status, body: data }))
    } else {
        return { status: resp.status, body: {} }
    }
});

export const logOut = () => fetch(logoutUrl, {
    method: "POST"
}).then(resp => resp.json());