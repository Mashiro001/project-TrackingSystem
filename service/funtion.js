//connection
const config = require("./dbConnect");
var cndb = config.connection();
const axios = require("axios");
const moment = require("moment");
const { response } = require("express");
const md5 = require("md5");

//get all data device
exports.getAlldevice = function (req, res) {
  const sql = `select * from device where flg = '1'`;
  cndb.query(sql, (error, td_device) => {
    try {
      if (error) {
        res.send({ status: "0", message: "Database is not data device" });
      } else {
        const context = { td_device };
        res.send({
          status: "1",
          rowCount: context.td_device.rowCount,
          data: context.td_device.rows,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//get one DeviceID
// exports.getOneDeviceID = function (req, res) {
//   const deviceID = req.body.device_id;

//   const sql = `select * from device where device_id = '${deviceID}'`;
//   cndb.query(sql, (error, OneDevice) => {
//     try {
//       if (OneDevice.rows == 0) {
//         res.send({ status: "0", message: "No data device" });
//       } else {
//         res.send({
//           status: "1",
//           rowCount: OneDevice.rowCount,
//           data: OneDevice.rows,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };

//add name device
exports.getOneDeviceID = async function (req, res) {
  const userLogin = req.body.user;
  console.log(userLogin);

  const sql = `Select * from owners JOIN device ON owners.device_id = device.device_id where owners.uid = '${userLogin}' AND flg = '1'`;
  cndb.query(sql, (error, deviceUser) => {
    console.log(deviceUser);
    try {
      if (deviceUser.rows == 0) {
        res.send({ status: "0", message: "No data in table Owners" });
      } else {
        res.send({
          status: "1",
          rowCount: deviceUser.rowCount,
          data: deviceUser.rows,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

exports.deviceAdd = function (req, res) {
  const deviceID = req.body.device_id;
  const deviceName = req.body.device_name;

  const sqlAll = `select * from device where device_id = '${deviceID}'`;
  cndb.query(sqlAll, (error, devicesAll, fields) => {
    try {
      console.log(devicesAll.rows);
      console.log(devicesAll.rows[0].device_name);
      if (devicesAll.rows[0].device_name == "") {
        const sql = `update device set device_name='${deviceName}' where device_id ='${deviceID}'`;
        cndb.query(sql, (error, devices, fields) => {
          try {
            if (error) {
              res.send({
                status: "0",
                message: "Cannot add name device",
              });
            } else {
              res.send({ status: "1", message: "add name succes" });
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//edit device name
exports.deviceEdit = function (req, res) {
  const deviceID = req.body.device_id;
  const deviceName = req.body.device_name;

  const sql = `update device set device_name='${deviceName}' where device_id ='${deviceID}'`;
  cndb.query(sql, (error) => {
    try {
      if (error) {
        res.send({
          status: "0",
          message: "Cannot update data",
        });
      } else {
        res.send({ status: "1", message: "Update succes" });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//delete device => edit flg = 0
exports.deviceDelete = function (req, res) {
  const deviceID = req.body.device_id;
  console.log(deviceID);
  const sql = `update device set flg='0' where device_id ='${deviceID}'`;
  cndb.query(sql, (error) => {
    try {
      if (error) {
        res.send({
          status: "0",
          message: "Cannot delete data",
        });
      } else {
        res.send({ message: "Delete succes" });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//upsert data input table realtime and insert data Sent from mobile to table history
exports.add_realtime = function (req, res) {
  const deviceID = req.body.device_id;
  const latitude = req.body.lat;
  const longitude = req.body.lng;
  const speedStatus = req.body.speed;
  const batteryP = req.body.battery;
  const sdFree = req.body.sdcard_free;
  const sdUnit = req.body.sdcard_free_unit;
  const stFree = req.body.storage_free;
  const stUnit = req.body.storage_free_unit;
  const gpsSpeed = req.body.gps_signal;
  const gsmSpeed = req.body.gsm_signal;
  const deviceTime = moment(req.body.device_time).format(
    "YYYY-MM-DD HH:mm:ss.SSS"
  );
  const receiveTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

  const sql = `insert into realtime (device_id, lat,lng,speed,battery,sdcard_free,sdcard_free_unit,storage_free,storage_free_unit,gps_signal,gsm_signal,device_time,receive_time) 
    values('${deviceID}','${latitude}','${longitude}','${speedStatus}','${batteryP}','${sdFree}','${sdUnit}','${stFree}','${stUnit}','${gpsSpeed}','${gsmSpeed}','${deviceTime}','${receiveTime}') 
    ON CONFLICT (device_id) 
    DO UPDATE SET lat = EXCLUDED.lat, lng = EXCLUDED.lng, speed = EXCLUDED.speed, battery = EXCLUDED.battery, sdcard_free = EXCLUDED.sdcard_free, sdcard_free_unit = EXCLUDED.sdcard_free_unit, 
    storage_free = EXCLUDED.storage_free, storage_free_unit = EXCLUDED.storage_free_unit, gps_signal = EXCLUDED.gps_signal, gsm_signal = EXCLUDED.gsm_signal, device_time = EXCLUDED.device_time,receive_time = EXCLUDED.receive_time`;
  cndb.query(sql, (error, realtimes, fields) => {
    try {
      if (error) {
        res.send({
          status: "error",
          message: "Can not add data to realtime table, Something is wrong",
        });
      } else {
        // console.log(realtimes);
        // insert to table history
        const require = `insert into history (device_id, device_time, lat,lng,speed,battery,sdcard_free,sdcard_free_unit,storage_free,storage_free_unit,gps_signal,gsm_signal,receive_time) 
          values('${deviceID}','${deviceTime}','${latitude}','${longitude}','${speedStatus}','${batteryP}','${sdFree}','${sdUnit}','${stFree}','${stUnit}','${gpsSpeed}','${gsmSpeed}','${receiveTime}')`;
        cndb.query(require, (error, historylist) => {
          try {
            if (error) {
              res.send({
                status: "0",
                message:
                  "Can not add data to history table, Something is wrong",
              });
            } else {
              console.log(historylist);
              res.send({ status: "1", message: "add succes" });
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//get table realtime
exports.getAll_realtime = function (req, res) {
  const sql = `select * from realtime INNER JOIN device ON device.device_id = realtime.device_id`;
  // INNER JOIN device ON device.device_id = realtime.device_id
  cndb.query(sql, (error, td_realtime) => {
    try {
      if (error) {
        res.send({ status: "0", message: "Database is not data realtime" });
      } else {
        const context = { td_realtime };
        const dateFormat = context.td_realtime.rows;
        dateFormat.map((df) => {
          (df.device_time = moment(df.device_time).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          )),
            (df.receive_time = moment(df.receive_time).format(
              "YYYY-MM-DD HH:mm:ss.SSS"
            ));
        });

        // res.send({
        //   status: "1",
        //   rowCount: context.td_realtime.rowCount,
        //   data: context.td_realtime.rows,
        // });

        return exports.get_GeoJSON(dateFormat, res);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

// //get one realtimeID
// exports.getOne_realTimeID = function (req, res) {
//   const deviceID = req.body.device_id;

//   const sql = `select * from realtime INNER JOIN device ON device.device_id = realtime.device_id where realtime.device_id = '${deviceID}'`;
//   cndb.query(sql, (error, OneRealtime) => {
//     try {
//       if (OneRealtime.rows == 0) {
//         res.send({ status: "0", message: "No data realtime" });
//       } else {
//         const context = { OneRealtime };
//         const dateFormat = context.OneRealtime.rows;
//         dateFormat.map((df) => {
//           (df.device_time = moment(df.device_time).format(
//             "YYYY-MM-DD HH:mm:ss.SSS"
//           )),
//             (df.receive_time = moment(df.receive_time).format(
//               "YYYY-MM-DD HH:mm:ss.SSS"
//             ));
//         });
//         res.send({
//           status: "1",
//           rowCount: context.OneRealtime.rowCount,
//           data: context.OneRealtime.rows,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   }

//get one realtimeID2
exports.getOne_realTimeID = async function (req, res) {
  const deviceID = req.body.device_id;
  console.log(deviceID);

  var str = "";
  for (var b = 0; b < deviceID.length; b++) {
    str += `'${deviceID[b]}'`;
    if (b < deviceID.length - 1) {
      str += ",";
    }
  }
  const sql = `Select * from realtime INNER JOIN device ON device.device_id = realtime.device_id where realtime.device_id in (${str}) AND flg = '1'`;
  cndb.query(sql, (error, OneRealtime) => {
    console.log(OneRealtime);
    try {
      if (OneRealtime.rows == 0) {
        res.send({
          status: "0",
          data: [],
          resData: [],
          message: "No data realtime"
        });
      } else {
        const context = { OneRealtime };
        const dateFormat = context.OneRealtime.rows;
        console.log(dateFormat);
        dateFormat.map((df) => {
          (df.device_time = moment(df.device_time).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          )),
            (df.receive_time = moment(df.receive_time).format(
              "YYYY-MM-DD HH:mm:ss.SSS"
            ));
        });
        // res.send({
        //   status: "1",
        //   rowCount: context.OneRealtime.rowCount,
        //   data: context.OneRealtime.rows,
        // });
        return exports.get_GeoJSON(dateFormat, res);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//get table history
exports.getAll_history = function (req, res) {
  const sql = `select * from history INNER JOIN device ON device.device_id = history.device_id`;
  cndb.query(sql, (error, td_history) => {
    try {
      if (error) {
        res.send({ status: "0", message: "Database is not data history" });
      } else {
        const context = { td_history };
        const dateFormat = context.td_history.rows;
        dateFormat.map((df) => {
          (df.device_time = moment(df.device_time).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          )),
            (df.receive_time = moment(df.receive_time).format(
              "YYYY-MM-DD HH:mm:ss.SSS"
            ));
        });
        res.send({
          status: "1",
          rowCount: context.td_history.rowCount,
          data: context.td_history.rows,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//get one HistoryID
// exports.getOne_historyID = function (req, res) {
//   const deviceID = req.body.device_id;

//   const sql = `select * from history INNER JOIN device ON device.device_id = history.device_id where history.device_id = '${deviceID}'`;
//   cndb.query(sql, (error, OneHistory) => {
//     try {
//       if (OneHistory.rows == 0) {
//         res.send({ status: "0", message: "No data history" });
//       } else {
//         const context = { OneHistory };
//         const dateFormat = context.OneHistory.rows;
//         dateFormat.map((df) => {
//           (df.device_time = moment(df.device_time).format(
//             "YYYY-MM-DD HH:mm:ss.SSS"
//           )),
//             (df.receive_time = moment(df.receive_time).format(
//               "YYYY-MM-DD HH:mm:ss.SSS"
//             ));
//         });
//         res.send({
//           status: "1",
//           rowCount: context.OneHistory.rowCount,
//           data: context.OneHistory.rows,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };
exports.getOne_historyID = async function (req, res) {
  const deviceID = req.body.device_id;
  console.log(deviceID);

  var str = "";
  for (var b = 0; b < deviceID.length; b++) {
    str += `'${deviceID[b]}'`;
    if (b < deviceID.length - 1) {
      str += ",";
    }
  }
  const sql = `Select * from history INNER JOIN device ON device.device_id = history.device_id where history.device_id in (${str})`;
  cndb.query(sql, (error, Onehistory) => {
    console.log(Onehistory);
    try {
      if (Onehistory.rows == 0) {
        res.send({ status: "0", message: "No data history" });
      } else {
        const context = { Onehistory };
        const dateFormat = context.Onehistory.rows;
        console.log(dateFormat);
        dateFormat.map((df) => {
          (df.device_time = moment(df.device_time).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          )),
            (df.receive_time = moment(df.receive_time).format(
              "YYYY-MM-DD HH:mm:ss.SSS"
            ));
        });
        // res.send({
        //   status: "1",
        //   rowCount: context.OneRealtime.rowCount,
        //   data: context.OneRealtime.rows,
        // });
        return exports.get_GeoJSON(dateFormat, res);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//get All table User
exports.get_user = function (req, res) {
  const sql = `select * from users`;
  cndb.query(sql, (error, users) => {
    try {
      if (error) {
        res.send({ status: "0", message: "Database is not data user" });
      } else {
        const context = { users };
        // const dateFormat = context.td_user.rows;
        // dateFormat.map((x) => {(x.device_id = JSON.parse(JSON.stringify(x.device_id)))
        // });
        // console.log(dateFormat)
        res.send({
          status: "1",
          rowCount: context.users.rowCount,
          data: context.users.rows,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//get one UserID
exports.getOne_UserID = function (req, res) {
  const userID = req.body.uid;
  const password = req.body.pwd;

  const sql = `select * from users 
  left JOIN owners ON users.uid = owners.uid
  where users.uid = '${userID}' AND pwd = '${password}' AND flg = '1'`;
  cndb.query(sql, (error, OneUser) => {
    try {
      if (OneUser.rows == 0) {
        res.send({ status: "0", message: "No data user in database" });
      } else {
        const context = { OneUser };

        try {
          res.send({
            status: "1",
            rowCount: context.OneUser.rowCount,
            data: context.OneUser.rows,
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//add user
exports.userAdd = function (req, res) {
  const userID = req.body.uid;
  const password = req.body.pwd;
  // const deviceID = JSON.stringify(req.body.device_id);
  // const deviceID = req.body.device_id;

  const sql = `insert into users (uid,pwd,flg) values ('${userID}','${password}','1')`;
  cndb.query(sql, (error, users, fields) => {
    try {
      if (error) {
        console.log(error);
        res.send({
          status: "0",
          message: "Cannot add user",
        });
      } else {
        res.send({ message: "add succes" });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//edit password user
exports.userEdit = function (req, res) {
  const userID = req.body.uid;
  const password = req.body.pwd;

  const sql = `update users set pwd='${password}' where uid ='${userID}'`;
  cndb.query(sql, (error) => {
    try {
      if (error) {
        res.send({
          status: "0",
          message: "Cannot update data",
        });
      } else {
        res.send({ status: "1", message: "Update succes" });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//delete device => edit flg = 0
exports.userDelete = function (req, res) {
  const userID = req.body.uid;

  const sql = `update users set flg='0' where uid ='${userID}'`;
  cndb.query(sql, (error) => {
    try {
      if (error) {
        res.send({
          status: "0",
          message: "Cannot delete data",
        });
      } else {
        res.send({ message: "Delete succes" });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//user register device =>update device
exports.registerDevice = function (req, res) {
  const userID = req.body.uid;
  const deviceX = req.body.device_id;
  const deviceName = req.body.device_name;

  const sql = `select * from device where device_id ='${deviceX}'`;
  cndb.query(sql, (error, regist) => {
    try {
      console.log(regist.rows);
      if (regist.rows.length > 0) {
        res.send({
          status: "0",
          message: "Cannot regist data, this device has been registered.",
        });
      } else {
        const sql = `insert into owners (uid,device_id) values ('${userID}','${deviceX}')`;
        cndb.query(sql, (error, registOwners) => {
          try {
            const sql = `insert into device (device_id,device_name,flg) values ('${deviceX}','${deviceName}','1')`;
            cndb.query(sql, (error, registdevice) => {
              try {
                res.send({
                  status: "1",
                  message: "add succes",
                });
              } catch (error) {
                console.log(error);
              }
            });
          } catch (error) {
            console.log(error);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

//searchHistory All
// exports.searchHistory = function (req, res) {
//   const deviceX = req.body.device_id;
//   const deviceTimeStart = req.body.device_timeStart;
//   const deviceTimeEnd = req.body.device_timeEnd;
//   // const receiveTimeStart = req.body.receive_timeStart;
//   // const receiveTimeEnd = req.body.receive_timeEnd;
//   try {
//     // if ((receiveTimeStart == undefined) && (receiveTimeEnd == undefined)) {
//       const sql = `select * from history INNER JOIN device ON device.device_id = history.device_id WHERE history.device_id = '${deviceX}' AND device_time >= '${deviceTimeStart}' AND device_time <= '${deviceTimeEnd}'`;
//       cndb.query(sql, (error, deviceTimeX) => {
//         try {
//           if (deviceTimeX.rows == 0) {
//             res.send({ status: "0", message: "No data history" });
//           } else {
//             const context = { deviceTimeX };
//             var dataResponse = context.deviceTimeX.rows;

//             dataResponse.map((df) => {
//               (df.device_time = moment(df.device_time).format(
//                 "YYYY-MM-DD HH:mm:ss.SSS"
//               )),
//                 (df.receive_time = moment(df.receive_time).format(
//                   "YYYY-MM-DD HH:mm:ss.SSS"
//                 ))
//             });

//             console.log(dataResponse)

//             var polygon = []
//             for(i = 0 ; i<dataResponse.length ; i++){
//               polygon.push(["test1","test1","test1",dataResponse[i].device_time,dataResponse[i].lat,dataResponse[i].lng])
//             }
//             console.log(polygon)
//             // result = dataResponse
//             // console.log(result)
//             res.send({
//               status: "1",
//               data: polygon,
//               resData: dataResponse
//             });
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       });
//     // }
//     // if ((deviceTimeStart == undefined) & (deviceTimeEnd == undefined)) {
//     //   const sql = `select * from history INNER JOIN device ON device.device_id = history.device_id WHERE history.device_id = '${deviceX}' AND receive_time >= '${receiveTimeStart}' AND receive_time <= '${receiveTimeEnd}'`;
//     //   cndb.query(sql, (error, receiveTimeX) => {
//     //     try {
//     //       if (receiveTimeX.rows == 0) {
//     //         res.send({ status: "0", message: "No data history" });
//     //       } else {
//     //         const context = { receiveTimeX };
//     //         const dateFormat = context.receiveTimeX.rows;
//     //         console.log(dateFormat);
//     //         dateFormat.map((df) => {
//     //           (df.device_time = moment(df.device_time).format(
//     //             "YYYY-MM-DD HH:mm:ss.SSS"
//     //           )),
//     //             (df.receive_time = moment(df.receive_time).format(
//     //               "YYYY-MM-DD HH:mm:ss.SSS"
//     //             ));
//     //         });
//     //         res.send({
//     //           status: "1",
//     //           rowCount: context.receiveTimeX.rowCount,
//     //           data: context.receiveTimeX.rows,
//     //         });
//     //       }
//     //     } catch (error) {
//     //       console.log(error);
//     //     }
//     //   });
//     // }
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.searchHistory = async (req, res, next) => {
  const deviceX = req.body.device_id;
  const deviceTimeStart = req.body.device_timeStart;
  const deviceTimeEnd = req.body.device_timeEnd;

  try {
    const sql = `select * from history INNER JOIN device ON device.device_id = history.device_id WHERE history.device_id = '${deviceX}' AND device_time >= '${deviceTimeStart}' AND device_time <= '${deviceTimeEnd}' AND flg = '1'`;
    cndb.query(sql, (error, deviceTimeX) => {
      try {
        if (deviceTimeX.rows == 0) {
          res.send({ status: "0", message: "No data history" });
        } else {
          const context = { deviceTimeX };
          var dataResponse = context.deviceTimeX.rows;

          dataResponse.map((df) => {
            (df.device_time = moment(df.device_time).format(
              "YYYY-MM-DD HH:mm:ss.SSS"
            )),
              (df.receive_time = moment(df.receive_time).format(
                "YYYY-MM-DD HH:mm:ss.SSS"
              ));
          });
          return exports.get_GeoJSON(dataResponse, res);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.get_GeoJSON = async (data, res) => {
  var geoLocate = [];
  for (let i = 0; i < data.length; i++) {
    var response = await axios.post(
      `https://www.deemap.com/DeeMap2WS_aeon/geocoding_aeon.jsp?lat=${data[i].lat}&lon=${data[i].lng}&radius=1`
    );
    geoLocate.push(response.data.tambon[0]);
  }

  var polygon = [];
  for (i = 0; i < data.length; i++) {
    polygon.push([
      geoLocate[i].TAM_TNAME,
      geoLocate[i].AMP_TNAME,
      geoLocate[i].PROV_TNAME,
      data[i].device_time,
      data[i].lat,
      data[i].lng,
    ]);
    data[i].location = geoLocate[i];
  }

  res.send({
    status: "1",
    data: polygon,
    resData: data,
  });
};
