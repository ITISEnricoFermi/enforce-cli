const imu = new (require("../mock/imu"))()
const thp = new (require("../mock/thp"))()
const gps = new (require("../mock/gps"))()
const xbee = new (require("../mock/XBee").XBee)()

const comms = new (require("../mock/comms"))(xbee)
const sensors = new (require("../mock/sensors"))({imu, thp, gps})
const motors = new (require("../mock/motors"))()

const cli = new (require("../cli"))(comms, {sensors, motors})

