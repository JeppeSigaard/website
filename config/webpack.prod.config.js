const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { generateConfig, baseDir } = require('./webpack.base.config.js');
const ChunkManifestPlugin = require('@ussu/chunk-manifest-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;


const config = generateConfig();

const extractCSS = new MiniCssExtractPlugin({
  filename: 'union.[contenthash].[name].css',
});

config.bail = true;
config.profile = false;
config.devtool = 'source-map';

config.performance = {
  hints: false,
  maxEntrypointSize: 500000,
};

config.mode = 'production';

config.output = {
  path: path.resolve(path.join(baseDir, 'dist')),
  publicPath: 'https://du9l8eemj97rm.cloudfront.net/',
  filename: 'union.[name].[hash].js',
  chunkFilename: 'union.[name].[hash].js',
};

config.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};


// config.optimization = {
//   splitChunks: {
//     chunks: 'all',
//     cacheGroups: {
//       vendor: {
//         name: 'vendor',
//         minChunks: 3,
//       },
//       default: {
//         minChunks: 2,
//         priority: -20,
//         reuseExistingChunk: true
//       }
//     }
//   }
// };

config.plugins = config.plugins.concat([
  // new BundleAnalyzerPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      HYDROLEAF_MODE: JSON.stringify('RENDER_COMPONENT'),
      COMP_NODE: '0',
    },
  }),
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(baseDir),
  }),
  // new webpack.HashedModuleIdsPlugin(),
  extractCSS,
  new ChunkManifestPlugin({
    filename: 'manifest.json',
    manifestVariable: 'chunkManifest',
  }),
  new CopyWebpackPlugin([{ from: './src/img/favicons', to: './branding' }]),
  new AssetsWebpackPlugin(),
]);

config.module.rules = config.module.rules.concat([
  {
    test: /\.css$/,
    loader: [MiniCssExtractPlugin.loader, 'css-loader?importLoaders=1', 'postcss-loader'],
  },
]);

module.exports = config;
