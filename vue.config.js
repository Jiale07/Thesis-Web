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
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }

}
