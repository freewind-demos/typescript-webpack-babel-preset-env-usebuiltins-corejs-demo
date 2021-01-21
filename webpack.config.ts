import path from 'path';

function buildConfig(useBuiltIns: any) {
  return {
    mode: "development",
    devtool: false,
    entry: './hello',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `bundle-${useBuiltIns}.js`
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader', options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns,
                  corejs: {
                    version: '3.8', // works for "useBuiltIns: usage", just specify a.b, not a.b.c
                    proposals: true
                  },
                  targets: {ie: 11}
                }]
              ]
            }
          },
          'ts-loader'
        ]
      }]
    },
    plugins: []
  }
}

export default [
  buildConfig(false),
  buildConfig('entry'),
  buildConfig('usage'),
];
