// Gulp configuration
const START_SERVER_TASK_NAME = 'start-server';
const TEST_SERVER_TASK_NAME = 'test-server';
const START_SCRIPT_PATH = '../server.js';
const TASKS_PATH = 'tasks';
const WATCH_EXTENSIONS = 'js';
const WATCH_PATTERNS = [
    '**/*'
];

module.exports = {
    START_SCRIPT_PATH,
    START_SERVER_TASK_NAME,
    TASKS: [],
    TASKS_PATH,
    TEST_SERVER_TASK_NAME,
    WATCH_EXTENSIONS,
    WATCH_PATTERNS
};
