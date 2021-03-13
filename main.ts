input.onButtonPressed(Button.A, function () {
    moving = true
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
    indicate("left")
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, turnSpeed)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
    basic.pause(2000)
    Kitronik_Move_Motor.stop()
    moving = false
})
function indicate (direction: string) {
    indicating = true
    if (direction == "left") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    } else if (direction == "right") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    }
    indicating = false
}
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
    basic.pause(2000)
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 180)
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.Off)
})
let indicating = false
let moving = false
let turnSpeed = 0
let speed = 0
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
speed = 50
turnSpeed = 20
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
moving = false
basic.forever(function () {
    if (!(indicating)) {
        if (input.lightLevel() < 50 && moving) {
            headlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
            rearlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
        } else {
            moveMotorZIP.clear()
            moveMotorZIP.show()
        }
    }
})
