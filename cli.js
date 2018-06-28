const {
	EventEmitter
} = require("events")

const options = require("./commands")
const mock = require("./mockobjs")
const listeners = require("./listeners")

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

	on(event, listener) {
		if (_COMMANDS.indexOf(event) === -1) {
			_COMMANDS.push(event)
		}
		super.on(event, listener.bind(this))
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
	cli.on("motors", listeners._motors)
	cli.on("sensors", listeners._sensors)
	cli.on("pilot", listeners._pilot)
	cli.on("status", listeners._status)
	cli.on("camera", listeners._camera)
	cli.on("target", listeners._target)
}

module.exports = CLI

/*
	motors: motors [-lr [0-1]]
	sensors: sensors [-igt [0-1]]
	camera:	camera
	pilot: pilot
	status: status
*/
