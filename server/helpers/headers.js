/**
 * Creates a basic header object
 * @param {string} [token] - Signed token
 * @returns {object} HTTP Header
 */
const createRequestHeaders = (token) => {
    const requestHeader = {
        'Content-Type': 'application/json'
    };

    if (typeof token !== 'undefined') {
        requestHeader.Authorization = `Bearer ${token}`;
    }

    return requestHeader;
};

module.exports = {
    createRequestHeaders
};
