const {
	EventEmitter
} = require('events')

class Sensors extends EventEmitter {
	/**
	 * @param {{imu: any, gps: any, thp: any}} sensors
	 */
	constructor(sensors) {
		super()

		this.SENSORS = {
			gps: false,
			imu: false,
			thp: false
		}

		this.SENSORS.gps = sensors.hasOwnProperty("gps")
		this.SENSORS.imu = sensors.hasOwnProperty("imu")
		this.SENSORS.thp = sensors.hasOwnProperty("thp")

		if (this.SENSORS.imu) {
			this.imu = sensors.imu
			this.imu.on('quaternion', (data) => {
				this.emit('quaternion', data)
			})
			this.imu.on('euler', (data) => {
				this.emit('euler', data)
			})
		}
		if (this.SENSORS.gps) {
			this.gps = sensors.gps
			this.gps.on("data", d => {
				this.emit("position", Object.assign({}, {
					latitude: d.latitude,
					longitude: d.longitude,
					altitude: d.altitude
				}))
				this.emit("rawposition", d)
			})
		}

		if (this.SENSORS.thp) {
			this.thp = sensors.thp
			this.thp.on("data", d => {
				this.emit("temperature", d.temperature_C)
			})
			this.thp.on("data", d => {
				this.emit("humidity", d.humidity)
			})
			this.thp.on("data", d => {
				this.emit("pressure", d.pressure_hPa)
			})
		}
	}

	status() {
		return {
			gps: this.gps.running,
			imu: this.imu.running,
			thp: this.thp.running
		}
	}

	gpsOn() {
		if (this.SENSORS.gps)
			this.gps.StopLoop()
	}

	gpsOff() {
		if (this.SENSORS.gps)
			this.gps.StopLoop()
	}

	imuOn() {
		if (this.SENSORS.imu)
			this.imu.startReading()
	}

	imuOff() {
		if (this.SENSORS.imu)
			this.imu.stopReading()
	}

	thpOn() {
		if (this.SENSORS.thp)
			this.thp.startReading()
	}

	thpOff() {
		if (this.SENSORS.thp)
			this.thp.stopReading()
	}

	stopAll() {
		this.thpOff()
		this.imuOff()
		this.gpsOff()
	}
}

/**
 * @param {{gps, imu}} sensors
 */
module.exports = Sensors
