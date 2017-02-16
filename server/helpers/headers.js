exports.createRequestHeaders = (token) => {
    const requestHeader = {
        'Content-Type': 'application/json'
    };

    if (typeof token !== 'undefined') {
        requestHeader.Authorization = `Bearer ${token}`;
    }

    return requestHeader;
};
