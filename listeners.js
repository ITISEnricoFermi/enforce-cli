const debug = require("debug")("enforce-cli:l")

function _motors(opts) {
	debug("Motors command: %o", opts)
	if (opts.l) {
		debug("Motor left: %s", opts.l)
		this.opts.motors.setLeft(opts.l !== "0" ? true : false)
	}
	if (opts.r) {
		debug("Motor right: %s", opts.r)
		this.opts.motors.setLeft(opts.r !== "0" ? true : false)
	}
}


function _sensors(opts) {
	debug("Sensors command: %o", opts)
	const s = this.opts.sensors
	if (opts.i) {
		s.setImu(opts.i !== "0" ? true : false)
	}
	if (opts.g) {
		s.setGps(opts.g !== "0" ? true : false)
	}
	if (opts.t) {
		s.setThp(opts.t !== "0" ? true : false)
	}
}

function _camera(opts) {
	debug("Camera command: %o", opts)
	if (opts.s) {
		if (opts.s === "kill") {
			this.opts.camera.kill()
		}
		if (opts.s === "streamonly") {
			this.opts.camera.stop()
		}
		if (opts.s === "start") {
			this.opts.camera.start()
		}
	}

}

function _pilot(opts) {
	debug("Pilot command: %o", opts)

}

function _target(opts) {
	debug("Target command: %o", opts)

}

function _status(opts) {
	debug("Status command: %o", opts)
	this.comms.send("status", Object.assign({}, this.opts.sensors.status(), this.opts.motors.getStatus(), this.opts.pilot.status()))
}

module.exports = {
	_camera,
	_motors,
	_pilot,
	_sensors,
	_status,
	_target
}
