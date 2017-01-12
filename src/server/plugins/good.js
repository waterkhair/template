// Modules
import Config from '../config/main';
import Good from 'good';

export default {
    options: Config.HAPI.GOOD_OPTIONS,
    register: Good
};
