module.exports = {
    devtool: 'source-map',
    resolve: {
        fallback: {
            "process": require.resolve("process"),
        }
    }
};
