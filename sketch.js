let editor
let turtle
let show_token = false

function setup() {
    let canvas = createCanvas(400, 400)
    canvas.parent('sketch-div')
    background(0)
    angleMode(DEGREES)
    turtle = new Turtle(200, 200, 0)
    editor = select('#code')
    goTurtle()
    editor.input(goTurtle)

}

function execute(commands) {
    commands.forEach(command => {
        let name = command.name
        let arg = command.arg
        if (name == "repeat") {
            for (let i = 0 < 0; i < arg; i++)
                execute(command.commands)
        } else {
            commandLookup[name](arg)
        }
    })

}

function goTurtle() {
    background(0)
    push()

    turtle.reset()
    let code = editor.value()
        // let tokens = code.split(' ')
        // if (show_token) {
        //     console.table(tokens)
        //     console.log(tokens)
        // }

    let parser = new Parser(code)
    let commands = parser.parse()
    execute(commands)

    console.log(commands)
    pop()
}