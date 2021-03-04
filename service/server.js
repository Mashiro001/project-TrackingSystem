let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.json());

let fn = require('./funtion')

app.post('/getLocation', fn.get_GeoJSON)
//device
app.post('/getAllDevice', fn.getAlldevice)
app.post('/getOneDeviceID', fn.getOneDeviceID)
app.post('/addDevice', fn.deviceAdd)
app.post('/editDevice',fn.deviceEdit)
app.post('/deleteDevice',fn.deviceDelete)
app.post('/userRegistDevice',cors(),fn.registerDevice)


//realtime
app.post('/addrealtime',fn.add_realtime)
app.post('/getAllrealtime',fn.getAll_realtime)
app.post('/getOnerealTimeID',fn.getOne_realTimeID)

//history
app.post('/getAllhistory',fn.getAll_history)
app.post('/getOneHistoryID',fn.getOne_historyID)
app.post('/searchHistoryTime',fn.searchHistory)

//user
app.post('/getAllUser',fn.get_user)
app.post('/getOneUser',fn.getOne_UserID)
app.post('/addUser', fn.userAdd)
app.post('/editUser',fn.userEdit)
app.post('/deleteUser',fn.userDelete)


app.listen(4000, () => {
  console.log("Start server at port 4000.");
});
