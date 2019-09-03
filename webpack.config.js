var webpack = require('webpack');
var path = require('path');
var PROD = JSON.parse(process.env.PROD_DEV || '0');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        'app': './components/app.js'
    },
    output: {
        path: './dist/js',
        filename: PROD ? '[name].js' : '[name].js'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': '$'
    },
    resolve: {
        alias: {
            'react$'      : path.resolve(__dirname, 'node_modules/react/dist/react.js'),
            'react-dom$': path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.js')
        }
    },
    devtool: 'cheap-module-source-map', //init compile fast, recompile also very fast,
    module: {
        loaders: [
          {
            test: /\.js?$/, 
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-0','react']
            }
          },
          { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=img/home/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
        noParse: [
            path.resolve(__dirname, 'node_modules/react/dist/react-with-addons.js')
        ]
    },
    plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      },
      minimize: true
    }), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
    new CompressionPlugin({  
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    })
  ]
}
