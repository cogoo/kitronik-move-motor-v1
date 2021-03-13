def on_button_pressed_a():
    global moving
    moving = True
    Kitronik_Move_Motor.turn_radius(Kitronik_Move_Motor.TurnRadii.TIGHT)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, speed)
    basic.pause(2000)
    Kitronik_Move_Motor.stop()
    indicate("left")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.LEFT, speed)
    basic.pause(2000)
    Kitronik_Move_Motor.stop()
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, speed)
    basic.pause(2000)
    Kitronik_Move_Motor.stop()
    moving = False
input.on_button_pressed(Button.A, on_button_pressed_a)

def indicate(direction: str):
    global indicating
    indicating = True
    if direction == "left":
        for index in range(4):
            moveMotorZIP.set_zip_led_color(0,
                Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.ORANGE))
            moveMotorZIP.set_zip_led_color(3,
                Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.ORANGE))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
    elif direction == "right":
        for index2 in range(4):
            moveMotorZIP.set_zip_led_color(1,
                Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.ORANGE))
            moveMotorZIP.set_zip_led_color(2,
                Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.ORANGE))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
    indicating = False

def on_button_pressed_b():
    Kitronik_Move_Motor.sound_siren(Kitronik_Move_Motor.OnOffSelection.ON)
    Kitronik_Move_Motor.write_servo_pin(Kitronik_Move_Motor.ServoSelection.SERVO1, 90)
    basic.pause(2000)
    Kitronik_Move_Motor.write_servo_pin(Kitronik_Move_Motor.ServoSelection.SERVO1, 0)
    Kitronik_Move_Motor.sound_siren(Kitronik_Move_Motor.OnOffSelection.OFF)
input.on_button_pressed(Button.B, on_button_pressed_b)

indicating = False
moving = False
speed = 0
moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = None
moveMotorZIP = Kitronik_Move_Motor.create_move_motor_zipled(4)
headlights = moveMotorZIP.range(0, 2)
rearlights = moveMotorZIP.range(2, 2)
speed = 50

def on_forever():
    if not (indicating):
        if input.light_level() < 50 and moving:
            headlights.show_color(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.WHITE))
            rearlights.show_color(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.RED))
        else:
            moveMotorZIP.clear()
            moveMotorZIP.show()
basic.forever(on_forever)
