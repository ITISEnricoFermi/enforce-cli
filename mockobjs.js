module.exports = {
    camera: {
        kill() {},
        start() {},
        send(c) {},
    },
    pilot: {
        disableAutopilot() {},
        enableAutopilot() {},
        status() {}
    },
    motors: {
        setRight(motorState) {},
        setLeft(motorState) {},
        getStatus() {}
    },
    sensors: {
        gpsOff() {},
        gpsOn() {},
        thpOff() {},
        thpOn() {},
        imuOff() {},
        imuOn() {},
        status() {}
    },
    targeter: {}
}