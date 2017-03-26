// Modules
import DefaultLayout from '../react/layouts/default';
import HomePage from '../react/pages/auth/home/home';
import LoginPage from '../react/pages/public/login/login';
import React from 'react';

/**
 * Creates a admin scope validator
 * @param {object} store - Redux store
 * @param {ReactComponent} Component - React component
 * @return {ReactComponent} - Returns ReactComponent
 */
export const adminScopeValidator = (store, Component) => (mapProps) => {
    const sessionState = store.getState().session;

    if (sessionState.credentials.scope === 'admin') {
        return <DefaultLayout {...mapProps} children={<Component {...mapProps} />} />;
    }

    return userScopeValidator(store, HomePage);
};

/**
 * Creates a user scope validator
 * @param {object} store - Redux store
 * @param {ReactComponent} Component - React component
 * @return {ReactComponent} - Returns ReactComponent
 */
export const userScopeValidator = (store, Component) => (mapProps) => {
    const sessionState = store.getState().session;

    if (sessionState.isAuthenticated) {
        return <DefaultLayout {...mapProps} children={<Component {...mapProps} />} />;
    }

    return <LoginPage {...mapProps} />;
};
