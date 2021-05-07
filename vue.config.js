const {resolve} = require('path')

module.exports={
    publicPath:process.env.NODE_ENV === 'production' ? './btf-template' :'./',
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('src'))
        .set('@assets',resolve('src/assets'))
    }
}