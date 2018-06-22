module.exports = {
	camera: {
		start() {},
		stop() {}
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
