const yargs = require("yargs")

const args = yargs
// Motors
.options({
	l: {
		alias: "left",
		string: true
	},
	r: {
		alias: "right",
		string: true
	}
})
// Sensors
.options({
	g: {
		alias: "gps",
		string: true
	},
	i: {
		alias: "imu",
		string: true
	},
	t: {
		alias: "thp",
		string: true
	}
})
// TODO: Camera
.options({
	
})

module.exports = args
