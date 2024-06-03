module.exports = {
    parser: 'babel-eslint',
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        // your custom rules here
    },
};
