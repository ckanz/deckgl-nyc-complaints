module.exports = {
  // mode: 'development',
  entry: {
    app: './app.js'
  },
  output: {
    library: 'App'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.csv$/,
        loader: 'file-loader'
      }
    ]
  }
}
