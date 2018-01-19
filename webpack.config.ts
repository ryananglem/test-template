import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

const config: webpack.Configuration = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],

  output: {
    filename: 'app.[hash].js',
    path: path.join(__dirname, './dist')
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      ['web-workers']: path.resolve(__dirname, 'src/web-workers')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        loaders: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader'
        ],
        test: /\.tsx?$/
      },

      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/
      },
      {
        test: /\.worker\.ts$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: 'WorkerName.[hash].js'
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    port: 3005
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}

export default config
