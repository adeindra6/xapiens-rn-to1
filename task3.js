const fs = require('fs');

let message;

class Log {
	static setLogTask1(writeLog) {
		fs.writeFile("task1.log", writeLog, function(err) {
			if(err) {
				message = err;
			}
			message = "task1.log created";
		});
	}

	static setLogTask2(writeLog) {
		fs.writeFile("task2.log", writeLog, function(err) {
			if(err) {
				message = err;
			}
			message = "task2.log created";
		});
	}
}

module.exports = Log;