// Modules
import Config from '../config/main';
import HapiSwagger from 'hapi-swagger';

export default {
    options: Config.HAPI.HAPI_SWAGGER_OPTIONS,
    register: HapiSwagger
};
