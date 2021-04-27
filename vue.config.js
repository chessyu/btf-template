const {resolve} = require('path')

module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('src'))
        .set('@assets',resolve('src/assets'))
    }
}