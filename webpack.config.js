const TerserPlugin = require('terser-webpack-plugin');
const webpack=require('webpack');
require('dotenv').config();
module.exports = {
  mode: "production",
  entry: "./content.js",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY),

    })
  ],
  output: {
    filename: "content.bundle.js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: {
            ascii_only: true
          },
        },
      }),
    ],
  }
};
