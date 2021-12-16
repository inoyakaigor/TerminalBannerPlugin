import path from 'path'
import cp from 'child_process'

class TerminalBannerPlugin {
    constructor() {
        this.TAG = this.getTag()
        this.BRANCH = this.getBranch()
        this.folder = path.basename(process.cwd())
    }

    getTag = () => {
        try {
            return cp.execSync('git describe --abbrev=0 --tags', {encoding: 'utf8'}).toString().trim()
        } catch (error) {
            console.log('Got error with message:', error.stderr.toString())
            return '<unknown>'
        }
    }

    getBranch = () => {
        try {
            return cp.execSync('git rev-parse --abbrev-ref HEAD', {encoding: 'utf8'}).toString().trim()
        } catch (error) {
            console.log('Got error with message:', error.stderr.toString())
            return '<unknown>'
        }
    }

    apply = compiler => {
        compiler.hooks.done.tap('TerminalBannerPlugin', this.compilationDone)
    }

    compilationDone = () => {
        // COLORS https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        const RED = '\x1b[41m'
        const GREEN = '\x1b[32m'
        const BLUE = '\x1b[44m'
        const NC = '\x1b[0m' // no color

        const str = `⌫ ${this.TAG} │ ⎇ ${this.BRANCH}`

        setTimeout(() => { //hack:  print after all
            console.log(`\n${GREEN}┏${'━'.repeat(this.TAG.length + 4)}┯${'━'.repeat(this.BRANCH.length + 4)}┓`)
            console.log(`┃ ${str} ┃`)
            console.log(`┗${'━'.repeat(this.TAG.length + 4)}┷${'━'.repeat(this.BRANCH.length + 4)}┛${NC}`)

            console.log(`${BLUE} ${this.folder} ${NC}${RED} ${(new Date).toLocaleTimeString()} ${NC}\n`)
        }, 0)
    }
}

export default TerminalBannerPlugin
