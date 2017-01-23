// Modules
import HomeRoutes from './home';
import SessionRoutes from './session';
import SettingsRoutes from './settings';
import UsersRoutes from './users';

export default [
    HomeRoutes.HomeRoute,
    SessionRoutes.GetProfileRoute,
    SessionRoutes.SignInRoute,
    SessionRoutes.SignUpRoute,
    SessionRoutes.UpdateProfileRoute,
    SettingsRoutes.GetSettingsRoute,
    SettingsRoutes.UpdateSettingsRoute,
    UsersRoutes.GetUsersRoute,
    UsersRoutes.SetUserRoleRoute
];
