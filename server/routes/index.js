// Modules
const HomeRoutes = require('./home'),
    SessionRoutes = require('./session'),
    SettingsRoutes = require('./settings'),
    UsersRoutes = require('./users');

module.exports = [
    HomeRoutes.HomeRoute,
    SessionRoutes.CloseAccountRoute,
    SessionRoutes.SignInRoute,
    SessionRoutes.SignUpRoute,
    SessionRoutes.UpdateProfileRoute,
    SettingsRoutes.GetSettingsRoute,
    SettingsRoutes.UpdateSettingsRoute,
    UsersRoutes.GetUsersRoute,
    UsersRoutes.SetUserRoleRoute
];
