const commandLookup = {
    "fd": function(amt) {
        turtle.forward(amt);
    },
    "bd": function(amt) {
        turtle.forward(-amt);
    },
    "rt": function(angle) {
        turtle.right(angle);
    },
    "lt": function(angle) {
        turtle.right(-angle);
    },
    "pu": function() {
        turtle.pen = false;
    },
    "pd": function() {
        turtle.pen = true;
    }
}
class Turtle {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.dir = angle;
    }
    reset() {
        // console.log(this.x, this.y, this.dir)
        translate(this.x, this.y)
        rotate(this.dir)
        this.pen = true

    }
    runCode(tokens) {
        let index = 0;

        while (index < tokens.length) {
            let token = tokens[index++]
            let amt, angle
            switch (token) {
                case 'fd':
                    amt = parseInt(tokens[index++])
                    this.forward(amt)
                    break;
                case 'bd':
                    console.log("bd")
                    amt = parseInt(tokens[index++])
                    this.forward(-amt)
                    break;
                case 'rt':
                    angle = tokens[index++]
                    this.right(angle)
                    break;
                case 'lt':
                    angle = parseInt(tokens[index++])
                    this.right(-angle)
                    break;
                case 'pu':
                    this.pen = false
                    break;
                case 'pd':
                    this.pen = true
                    break;
                default:
                    console.log("Invalid Token at ", index - 1)
                        // console.log(tokens)
                    break;
            }
            // index++;
            angle = undefined
            amt = undefined
        }
    }


    forward(amt) {
        if (this.pen == true) {
            stroke(255)
            strokeWeight(2)
            line(0, 0, amt, 0)
        }
        translate(amt, 0)
    }
    right(angle) {
        rotate(angle);
    }
}