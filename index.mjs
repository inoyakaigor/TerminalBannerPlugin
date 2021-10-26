import path from 'path'
import cp from 'child_process'

class TerminalBannerPlugin {
    constructor() {
        this.VERSION = this.getVersion()
        this.BRANCH = this.getBranch()
        this.folder = path.basename(process.cwd())
    }

    getVersion = () => cp.execSync('git describe --abbrev=0 --tags').toString().trim()
    getBranch = () => cp.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

    apply = compiler => {
        compiler.hooks.done.tap('TerminalBannerPlugin', this.compilationDone)
    }

    compilationDone = () => {
        // COLORS https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        const RED = '\x1b[41m'
        const GREEN = '\x1b[32m'
        const BLUE = '\x1b[44m'
        const NC = '\x1b[0m' // no color

        const str = `⌫ ${this.VERSION} │ ⎇ ${this.BRANCH}`

        setTimeout(() => { //hack:  print after all
            console.log(`\n${GREEN}┏${'━'.repeat(this.VERSION.length + 4)}┯${'━'.repeat(this.BRANCH.length + 4)}┓`)
            console.log(`┃ ${str} ┃`)
            console.log(`┗${'━'.repeat(this.VERSION.length + 4)}┷${'━'.repeat(this.BRANCH.length + 4)}┛${NC}`)

            console.log(`${BLUE} ${this.folder} ${NC}${RED} ${(new Date).toLocaleTimeString()} ${NC}\n`)
        }, 0)
    }
}

export default TerminalBannerPlugin
