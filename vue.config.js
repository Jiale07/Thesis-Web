const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir);
}


module.exports = {
    devServer: {
        // open: process.platform === 'darwin',
        host: 'localhost', port: 3000, proxy: {
            '/thesisApi': {
                target: `http://localhost:8080`, pathRewrite: {'^/thesisApi': ''},
            }
        }, disableHostCheck: true
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
    }
}
