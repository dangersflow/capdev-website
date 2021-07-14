var Connection = require('tedious').Connection;

var config = {
    server: 'testcapdev.database.windows.net', //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'xxxxx', //update me
            password: 'xxxxxx' //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'testcapdevdb' //update me
    }
};

var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.  
    console.log("Connected");
});

connection.connect();

module.exports = connection;