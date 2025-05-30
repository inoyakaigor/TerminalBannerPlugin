import path from 'path'
import cp from 'child_process'
import { styleText } from 'node:util'

class TerminalBannerPlugin {
    constructor({ emptyLineBefore, emptyLineAfter } = {}) {
        this.isDevMode = false
        this.putEmptyLineBefore = emptyLineBefore ?? true
        this.putEmptyLineAfter = emptyLineAfter ?? true
    }

    getTag = () => {
        try {
            return cp.execSync('git describe --abbrev=0 --tags', { encoding: 'utf8' }).toString().trim()
        } catch (error) {
            console.log('Got error with message:', error.stderr.toString())
            return
        }
    }

    getBranch = () => {
        try {
            return cp.execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).toString().trim()
        } catch (error) {
            console.log('Got error with message:', error.stderr.toString())
            return
        }
    }

    apply = compiler => {
        if (compiler.options.mode == 'development') {
            this.isDevMode = true
        }

        compiler.hooks.done.tap('TerminalBannerPlugin', this.compilationDone)
    }

    compilationDone = () => {
        if (!this.isDevMode) {
            return
        }

        const tag = this.getTag() ?? '<unknown>'
        const branch = this.getBranch() ?? '<unknown>'
        const folder = path.basename(process.cwd())

        const topBorder = styleText('green', `┏${'━'.repeat(tag.length + 4)}┯${'━'.repeat(branch.length + 4)}┓`)
        const contentLine = styleText('green', `┃ ⌫ ${tag} │ ⎇ ${branch} ┃`)
        const bottomBorder = styleText('green', `┗${'━'.repeat(tag.length + 4)}┷${'━'.repeat(branch.length + 4)}┛`)
        const folderText = styleText('bgBlue', styleText('whiteBright', ` ${folder} `))
        const dateText = styleText('bgRed', styleText('whiteBright', ` ${(new Date).toLocaleTimeString()} `))

        setTimeout(() => { //hack:  print after all
            if (this.putEmptyLineBefore) {
                console.log('\n')
            }

            console.log(`${topBorder}`)
            console.log(contentLine)
            console.log(bottomBorder)

            console.log(`${folderText}${dateText}`)

            if (this.putEmptyLineAfter) {
                console.log('\n')
            }
        }, 0)
    }
}

export default TerminalBannerPlugin
