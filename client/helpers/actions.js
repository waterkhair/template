export const createAction = (type) => (params) => ({
    ...params,
    type
});
