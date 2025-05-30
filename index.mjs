import path from 'path'
import cp from 'child_process'

class TerminalBannerPlugin {
    constructor() {
        this.isDevMode = false
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
        // COLORS https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        const RED = '\x1b[41m'
        const GREEN = '\x1b[32m'
        const BLUE = '\x1b[44m'
        const NC = '\x1b[0m' // no color
        const tag = this.getTag() ?? '<unknown>'
        const branch = this.getBranch() ?? '<unknown>'
        const folder = path.basename(process.cwd())

        const str = `⌫ ${tag} │ ⎇ ${branch}`

        setTimeout(() => { //hack:  print after all
            console.log(`\n${GREEN}┏${'━'.repeat(tag.length + 4)}┯${'━'.repeat(branch.length + 4)}┓`)
            console.log(`┃ ${str} ┃`)
            console.log(`┗${'━'.repeat(tag.length + 4)}┷${'━'.repeat(branch.length + 4)}┛${NC}`)

            console.log(`${BLUE} ${folder} ${NC}${RED} ${(new Date).toLocaleTimeString()} ${NC}\n`)
        }, 0)
    }
}

export default TerminalBannerPlugin
