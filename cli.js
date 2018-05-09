const {
	EventEmitter
} = require("events")

const options = require("./commands")
const mock = require("./mockobjs")

const debug = require("debug")("enforce-cli")

/**
 *@type CLI
 */
let cli = null

let _COMMANDS = ["motors","sensors","pilot","status","camera"]

class CLI extends EventEmitter {
	/**
	 * @param {*} comms
	 * @param {{sensors: *, motors: *, pilot: *, camera: *, targeter: *}} opts
	 */
	constructor(comms, opts) {
		super()
		if (!comms) throw new Error("...")
		this.comms = comms

		if (cli) throw new Error("There is already an instace of enforce cli")

		cli = this

		this.opts = Object.assign({}, opts)

		this._init()

		this.comms.on("command", c => this._parseCommand(c))
		// Setting up the aviable commands
		_initListeners()
	}

	_init() {
		if (!("sensors" in this.opts)) {
			this.opts.sensors = mock.sensors
		}
		if (!("motors" in this.opts)) {
			this.opts.motors = mock.motors
		}
		if (!("pilot" in this.opts)) {
			this.opts.pilot = mock.pilot
		}
		if (!("camera" in this.opts)) {
			this.opts.camera = mock.camera
		}
		if (!("targeter" in this.opts)) {
			this.opts.targeter = mock.targeter
		}
	}

	/**
	 * @param {string} command
	 */
	_parseCommand(command) {
		debug("Received command: " + command)
		let comm = options.parse(command)
		for (let i = 0; i < comm._.length; i++) {
			if (_COMMANDS.indexOf(comm._[i]) !== -1) {
				this.emit(comm._[i], comm)
			} else {
				debug("Command %s not found", comm._[i])
			}
		}
	}
}

function _initListeners() {
	cli.on("motors", _motors)
	cli.on("sensors", _sensors)
	cli.on("pilot", _pilot)
	cli.on("status", _status)
	cli.on("camera", _camera)
}

function _motors(opts) {
	debug("Motors command: %o", opts)
	if (opts.l) {
		debug("Motor left: %s", opts.l)
		cli.opts.motors.setLeft(opts.l !== "0" ? true : false)
	}
	if (opts.r) {
		debug("Motor right: %s", opts.r)
		cli.opts.motors.setLeft(opts.r !== "0" ? true : false)
	}
}


function _sensors(opts) {
	debug("Sensors command: %o", opts)
	const s = cli.opts.sensors
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
			cli.opts.camera.kill()
		}
		if (opts.s === "streamonly") {
			cli.opts.camera.stop()
		}
		if (opts.s === "start") {
			cli.opts.camera.start()
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
	cli.comms.send("status", Object.assign({}, cli.opts.sensors.status(), cli.opts.motors.getStatus(), cli.opts.pilot.status()))
}

module.exports = CLI

/*
	motors: motors [-lr [0-1]]
	sensors: sensors [-igt [0-1]]
	camera:	camera
	pilot: pilot
	status: status
*/
