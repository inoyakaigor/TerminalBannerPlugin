# Webpack Terminal Banner Plugin
Webpack plugin for showing banner after all notifications

[![npm Version](https://img.shields.io/npm/v/@inoy/terminal-banner-plugin.svg)](https://www.npmjs.com/package/@inoy/terminal-banner-plugin)
[![Terminal Banner Plugin](https://github.com/inoyakaigor/TerminalBannerPlugin/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/inoyakaigor/TerminalBannerPlugin/actions/workflows/npm-publish.yml)

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
        new TerminalBannerPlugin({
            emptyLineBefore: false, // optional; put empty line before the banner
            emptyLineAfter: false // optional; put empty line after the banner
        })
    ]
}
```

The banner will show only in development mode

## Requirements
Minimal supported is Node 14 and Webpack 5. Node 12 and Webpack 4 should work but I didn't test.

## License
GPLv3
