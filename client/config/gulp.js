// Gulp configuration
const BUILD_CLIENT_TASK_NAME = 'build-client';
const START_CLIENT_SERVER_TASK_NAME = 'start-client-server';
const START_SCRIPT_PATH = '../server.js';
const TASKS_PATH = 'tasks';
const WATCH_EXTENSIONS = 'js jsx css jpg png gif';
const WATCH_IGNORE = [
    'dist',
    'node_modules'
];
const WATCH_PATTERNS = [
    '**/*'
];

module.exports = {
    BUILD_CLIENT_TASK_NAME,
    START_CLIENT_SERVER_TASK_NAME,
    START_SCRIPT_PATH,
    TASKS: [
        BUILD_CLIENT_TASK_NAME
    ],
    TASKS_PATH,
    WATCH_EXTENSIONS,
    WATCH_IGNORE,
    WATCH_PATTERNS
};
