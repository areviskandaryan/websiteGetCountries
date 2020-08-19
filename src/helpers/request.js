let request = (url, method = "GET", body = null) => {
    const requestConfig = {
        method,
        headers: {
            // "Content-Type": "application/json;charset=utf-8",
        },
    };

    if (body) {
        requestConfig.body = JSON.stringify(body);
    }

    return fetch(url, requestConfig).then((r) => r.json());
};

export const doGet = (url) => request(url, "GET");

export const doPost = (url, body) => request(url, "POST", body);
