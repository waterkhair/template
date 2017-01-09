let internalCallback = null;
const registerPluginHandler = (err) => {
    if (err) {
        throw err;
    }
    if (internalCallback) {
        internalCallback();
    }
};

export default (callback) => {
    internalCallback = callback;

    return registerPluginHandler;
};
