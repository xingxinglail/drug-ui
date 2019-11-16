const defaultPresets =
    process.env.BABEL_ENV === 'es'
        ? ['@babel/typescript', '@babel/preset-react']
        : ['@babel/preset-env', '@babel/typescript', '@babel/preset-react'];

module.exports = {
    presets: defaultPresets
};
