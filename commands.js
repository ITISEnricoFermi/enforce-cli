const yargs = require("yargs")

const args = yargs
// all
.options({
	s: {
		alias: "status",
		string: true
	}
})
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
.options({
	x: {
		alias: "longitude",
		string: true
	},
	y: {
		alias: "latitude",
		string: true
	}
})

module.exports = args
