const defaultPresets =
    process.env.BABEL_ENV === 'es'
        ? [['@babel/typescript', { allowNamespaces: true }], '@babel/preset-react']
        : ['@babel/preset-env', ['@babel/typescript', { allowNamespaces: true }], '@babel/preset-react'];

module.exports = {
    presets: defaultPresets,
    plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-runtime'
    ],
    env: {
        test: {
            plugins: [
                ['@babel/plugin-transform-runtime', {
                    regenerator: true
                }]
            ]
        }
    }
};
