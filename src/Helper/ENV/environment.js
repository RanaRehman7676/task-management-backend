// -------------------------------------- GLOBAL VARIABLES ---------------------------------------------------------
const MODE = "development";


// -------------------------------------- SERVER PORTS AND URLs -----------------------------------------------------
const PORT = MODE == "development" ? 4000 : 8000;
const BASE_URL_FOR_API = `http://localhost:${PORT}`

// db string
const taskManagementInLocalMachine = "mongodb://localhost:27017/task_management";

const DB_STRING = taskManagementInLocalMachine;

// -------------------------------------- ENVIRONMENT OBJECT ----------------------------------------------------------
const ENV = {

  PORT,
  BASE_URL: BASE_URL_FOR_API,
  SESSION_OUT_AFTER: MODE == "development" ? `30d` : `5h`,
  IS_STG_OR_DEV: MODE == "development" ? true : false,
  // Salt Round for Hashing
  SALT_ROUND: 15,
  // DATABASE
  DB_STRING,
  // MAIL SERVER

  // JWT Authentication Secret
  TOKEN_SECRET: `JG84HG84HG98HGIRHG985HGHFG9HKHG98YKJG984JKHIGH98HKGLLABCDEFGHI1JKL2MNO73PQR84TU95V0WX6YZ`,

};
module.exports = ENV;













// for env 
          // .dev
// 2xDHd3s5HoWkmgHzksx5nmgeppRo2Ks5EcBnMTB9kkxcX2oxxyJpxQijM7pRVoWwtNJsBPSZCBYx6ew8VVarBjS3