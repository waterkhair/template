/**
 * Creates an action object creator
 * @param {string} type - Action type
 * @return {function} Returns an action object creator
 */
export const createAction = (type) => (params) => ({
    ...params,
    type
});
