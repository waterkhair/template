// Modules
const HomeRoutes = require('./home'),
    SessionRoutes = require('./session'),
    SettingsRoutes = require('./settings'),
    UsersRoutes = require('./users');

module.exports = [
    HomeRoutes.HomeRoute,
    SessionRoutes.LoginRoute,
    SettingsRoutes.GetSettingsRoute,
    SettingsRoutes.UpdateSettingsRoute,
    UsersRoutes.CreateUserRoute,
    UsersRoutes.DeleteUserRoute,
    UsersRoutes.GetUsersRoute,
    UsersRoutes.SetUserRoleRoute,
    UsersRoutes.UpdateUserRoute
];
