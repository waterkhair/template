let internalCallback = null;
const errorHandler = (err) => {
    if (err) {
        throw err;
    }
    if (internalCallback) {
        internalCallback();
    }
};

export default (callback) => {
    internalCallback = callback;

    return errorHandler;
};
