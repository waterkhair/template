// Modules
import 'rxjs/add/observable/of';
import Config from '../config/main';
import {Observable} from 'rxjs/Observable';

const ajaxErrorHandler = (code, errorType, xhr, type) => {
    const message = xhr.response && xhr.response.message ? xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

    return Observable.of({
        code,
        errorType,
        message,
        milliseconds: Config.ERRORS.MILLISECONDS,
        type
    });
};

export default {
    ajaxErrorHandler
};
