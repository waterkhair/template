/**
 * Creates a HTTP header object
 * @param {string} token - Signed token
 * @return {object} Returns a HTTP header object
 */
export const createRequestHeaders = (token) => {
    const requestHeader = {
        'Content-Type': 'application/json'
    };

    if (typeof token !== 'undefined') {
        requestHeader.Authorization = `Bearer ${token}`;
    }

    return requestHeader;
};
