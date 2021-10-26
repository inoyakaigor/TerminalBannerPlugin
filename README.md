# Webpack Terminal Banner Plugin
Webpack plugin for showing banner after all notifications

[![npm Version](https://img.shields.io/npm/v/@inoy/terminal-banner-plugin.svg)](https://www.npmjs.com/package/@inoy/terminal-banner-plugin)

![Terminal banner screenshot](screenshot.png)

## Using
```js
// webpack.config.js
const TerminalBannerPlugin = require('@inoy/terminal-banner-plugin')
// other code

module.exports = {
    //… rest of your webpack config
    plugins: [
        new WebpackNotifier2Plugin(/* check out my other plugin ;-) */),
        new TerminalBannerPlugin()
    ]
}
```

## Requirements
Minimal supported is Node 14 and Webpack 5. Node 12 and Webpack 4 should work but I didn't test.

## License
GPLv3
