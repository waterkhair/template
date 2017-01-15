// Gulp configuration
const BUILD_SERVER_TASK_NAME = 'build-server';
const START_SERVER_TASK_NAME = 'start-server';
const START_SCRIPT_PATH = 'build/Release/server/server.js';
const TASKS_PATH = 'tasks';
const WATCH_EXTENSIONS = 'js';
const WATCH_PATTERNS = [
    '**/*'
];

module.exports = {
    BUILD_SERVER_TASK_NAME,
    START_SCRIPT_PATH,
    START_SERVER_TASK_NAME,
    TASKS: [
        BUILD_SERVER_TASK_NAME
    ],
    TASKS_PATH,
    WATCH_EXTENSIONS,
    WATCH_PATTERNS
};
