/**
 * Creates a admin scope validator
 * @param {object} store - Redux store
 * @return {undefined}
 */
export const adminScopeValidator = (store) => (nextState, replaceState) => {
    let sessionState = store.getState().session;

    if (!sessionState.isAuthenticated) {
        sessionState = Object.assign(sessionState, {
            navigation: {
                loginLocation: nextState.location.pathname
            }
        });

        replaceState({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    } else if (sessionState.credentials.scope !== 'admin') {
        replaceState({
            pathname: '/',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
};

/**
 * Creates a user scope validator
 * @param {object} store - Redux store
 * @return {undefined}
 */
export const userScopeValidator = (store) => (nextState, replaceState) => {
    let sessionState = store.getState().session;

    if (!sessionState.isAuthenticated) {
        sessionState = Object.assign(sessionState, {
            navigation: {
                loginLocation: nextState.location.pathname
            }
        });

        replaceState({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
};
