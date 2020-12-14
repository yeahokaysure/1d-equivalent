LEDvalues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
pic = []

def on_button_pressed_a():
    navigate()
input.on_button_pressed(Button.A, on_button_pressed_a)
def on_button_pressed_b():
    reverse_values()
input.on_button_pressed(Button.B, on_button_pressed_b)

def showValuesOnMicrobit():
    for x in range(5):
        for y in range(5):
            led.plot_brightness(x, y, LEDvalues[x*5+y] * 255)

def randomise():
    for i in range(len(LEDvalues)):
        LEDvalues[i] = randint(0,1)

def reverse_values():
    for i in range(25):
        LEDvalues[i]= 1 - LEDvalues[i]

def wipe():
   for x in range(5):
        for y in range(4):
            LEDvalues[len(LEDvalues)-(x*5+y)-1] = LEDvalues[len(LEDvalues)-(x*5+y)-2]
        LEDvalues[x*5] = 0
    
def translate_horizontal():
    for y in range(5):
        a = LEDvalues[y]
        for x in range(4):
            LEDvalues[x*5+y]=LEDvalues[x*5+5+y]
        LEDvalues[20+y] = a

def translate_vertical():
    for x in range(5):
        a = LEDvalues[len(LEDvalues)-1-(x*5)]
        for y in range(4):
            LEDvalues[len(LEDvalues)-(x*5+y)-1] = LEDvalues[len(LEDvalues)-(x*5+y)-2]
        LEDvalues[len(LEDvalues)-(5+x*5)] = a
    
def rotate():
    c = 0
    copyLED = [0]
    copyLED = copyLED[1:]      
    for i in range(len(LEDvalues)):
        value = LEDvalues[i]
        copyLED.append(value)
    for a in range(5):
        for i in range(5):
            LEDvalues[c] = copyLED[a+20-(5*i)]
            c = c+1


def navigate():
    s = 8
    global pic
    pic = [0,0,0,0,1,0,0,
    0,0,1,1,0,0,0,
    0,1,0.7,0.7,1,0,0,
    0,0,1,0.3,0.5,1,0,
    0,1,0.7,0.7,1,0,0,
    0,0,1,1,0,0,1,
    1,1,1,1,0,0,0]
    for x in range(5):
        for y in range(5):
            LEDvalues[x*5+y] = pic[s+y+x*7]


def on_forever():
    showValuesOnMicrobit()
basic.forever(on_forever)