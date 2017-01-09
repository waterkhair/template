// Modules
import Config from '../config/main';
import Good from 'good';

export default {
    options: Config.Hapi.goodOptions,
    register: Good
};
