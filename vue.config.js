// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function configSVGIcon(config) {
  config.module.rule('svg').uses.clear()
  // Exclude SVG sprite directory from default svg rule
  config.module.rule('svg').exclude.add(path.resolve(__dirname, './src/icons/svg')).end()

  // Options used by svgo-loader to optimize SVG files
  // https://github.com/svg/svgo#what-it-can-do
  const options = {
    plugins: [
      { cleanupAttrs: true },
      { cleanupEnableBackground: true },
      { cleanupIDs: true },
      { cleanupListOfValues: true },
      { cleanupNumericValues: true },
      { collapseGroups: true },
      // { convertColors: true },
      { convertPathData: true },
      { convertShapeToPath: true },
      { convertStyleToAttrs: true },
      { convertTransform: true },
      { mergePaths: true },
      { removeComments: true },
      { removeDesc: true },
      { removeDimensions: true },
      { removeDoctype: true },
      { removeEditorsNSData: true },
      { removeEmptyAttrs: true },
      { removeEmptyContainers: true },
      { removeEmptyText: true },
      { removeHiddenElems: true },
      { removeMetadata: true },
      { removeNonInheritableGroupAttrs: true },
      { removeRasterImages: true },
      { removeTitle: true },
      { removeUnknownsAndDefaults: true },
      { removeUselessDefs: true },
      { removeUnusedNS: true },
      { removeUselessStrokeAndFill: true },
      {
        // removeAttrs: { attrs: 'fill' }, //移除fill属性
      },
      { removeXMLProcInst: true },
      { removeStyleElement: true },
      { removeUnknownsAndDefaults: true },
      { sortAttrs: true }
    ]
  }

  // Include only SVG sprite directory for new svg-icon rule
  // Use svg-sprite-loader to build SVG sprite
  // Use svgo-loader to optimize SVG files
  config.module
    .rule('svg-icon')
    .test(/\.svg$/)
    .include.add(path.resolve(__dirname, './src/icons/svg'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
    .end()
    .use('svgo-loader')
    .loader('svgo-loader')
    .options(options)
    .end()
}

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.optimization.splitChunks({
      ...config.optimization.get('splitChunks'),
      automaticNameDelimiter: '-'
    })
    configSVGIcon(config)
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({
        esModule: false
      })
      .tap(options => Object.assign(options, { limit: 10240 }))

    const time = Date.now()
    config.output.filename(`js/[name].[hash:5].${time}.js`).chunkFilename(`js/[name].[hash:5].${time}.js`)

    config.plugin('html').tap(args => {
      // title lynk
      args[0].title = 'Công Vinh Clock '

      // title cleverme
      // args[0].title = 'CleverMe - Invest in real estate with crypto, cleverly'

      return args
    })
  }
}
