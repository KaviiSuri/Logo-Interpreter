class Parser {
    constructor(text) {
        this.text = text
        this.index = 0
    }
    nextToken() {
        let char = this.text.charAt(this.index)
        let token = ''
        if (char === ' ') {
            this.index++
                return this.nextToken()
        }
        if (char === '[' || char === ']') {
            this.index++
                return this.nextToken()
        }
        while (char !== ' ' && this.remainingTokens()) {
            token += char
            char = this.text.charAt(++this.index)
        }
        return token
    }

    remainingTokens() {
        return this.index < this.text.length
    }
    getRepeat() {
        // let char = this.text.charAt(this.index)
        while (this.text.charAt(this.index++) !== '[' && this.remainingTokens()) {}
        let start = this.index
        let bracketCount = 1;
        while (bracketCount > 0) {
            let char = this.text.charAt(this.index++)
            if (char === '[')
                bracketCount++
                else if (char === ']')
                    bracketCount--
        }
        let end = this.index
        return this.text.substring(start, end - 1)
    }
    parse() {
        let movement = /^[fb]d|[lr][t]$/
        let pen = /^p/
        let repeat = /^repeat$/
        let commands = []
        while (this.remainingTokens()) {
            let token = this.nextToken()
            if (movement.test(token)) {
                let cmd = new Command(token, this.nextToken())
                commands.push(cmd)
            } else if (pen.test(token)) {
                let cmd = new Command(token)
                commands.push(cmd)
            } else if (repeat.test(token)) {
                let cmd = new Command(token, this.nextToken())
                commands.push(cmd)
                let toRepeat = this.getRepeat()
                let subparser = new Parser(toRepeat)
                cmd.commands = subparser.parse()
            }
        }
        return commands
    }
}