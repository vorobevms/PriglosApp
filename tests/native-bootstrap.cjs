const {app}=require('electron'),path=require('node:path'),fs=require('node:fs');
const profile=path.resolve(process.env.PRIGLOS_TEST_PROFILE);fs.mkdirSync(profile,{recursive:true});app.setPath('userData',profile);
require('../src/main.cjs');
