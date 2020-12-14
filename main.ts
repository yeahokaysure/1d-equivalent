let LEDvalues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let pic = []
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    navigate()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    reverse_values()
})
function showValuesOnMicrobit() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            led.plotBrightness(x, y, LEDvalues[x * 5 + y] * 255)
        }
    }
}

function randomise() {
    for (let i = 0; i < LEDvalues.length; i++) {
        LEDvalues[i] = randint(0, 1)
    }
}

function reverse_values() {
    for (let i = 0; i < 25; i++) {
        LEDvalues[i] = 1 - LEDvalues[i]
    }
}

function wipe() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 4; y++) {
            LEDvalues[LEDvalues.length - (x * 5 + y) - 1] = LEDvalues[LEDvalues.length - (x * 5 + y) - 2]
        }
        LEDvalues[x * 5] = 0
    }
}

function translate_horizontal() {
    let a: number;
    for (let y = 0; y < 5; y++) {
        a = LEDvalues[y]
        for (let x = 0; x < 4; x++) {
            LEDvalues[x * 5 + y] = LEDvalues[x * 5 + 5 + y]
        }
        LEDvalues[20 + y] = a
    }
}

function translate_vertical() {
    let a: number;
    for (let x = 0; x < 5; x++) {
        a = LEDvalues[LEDvalues.length - 1 - x * 5]
        for (let y = 0; y < 4; y++) {
            LEDvalues[LEDvalues.length - (x * 5 + y) - 1] = LEDvalues[LEDvalues.length - (x * 5 + y) - 2]
        }
        LEDvalues[LEDvalues.length - (5 + x * 5)] = a
    }
}

function rotate() {
    let i: number;
    let value: number;
    let c = 0
    let copyLED = [0]
    copyLED = copyLED.slice(1)
    for (i = 0; i < LEDvalues.length; i++) {
        value = LEDvalues[i]
        copyLED.push(value)
    }
    for (let a = 0; a < 5; a++) {
        for (i = 0; i < 5; i++) {
            LEDvalues[c] = copyLED[a + 20 - 5 * i]
            c = c + 1
        }
    }
}

function navigate() {
    let s = 8
    
    pic = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0.7, 0.7, 1, 0, 0, 0, 0, 1, 0.3, 0.5, 1, 0, 0, 1, 0.7, 0.7, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            LEDvalues[x * 5 + y] = pic[s + y + x * 7]
        }
    }
}

basic.forever(function on_forever() {
    showValuesOnMicrobit()
})
