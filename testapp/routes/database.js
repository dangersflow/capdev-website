/*
var Connection = require('tedious').Connection;

var config = {
    server: 'testcapdev.database.windows.net', //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'frank', //update me
            password: 'testcapdev123!' //update me
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

*/
var Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

var sequelize = new Sequelize('testcapdevdb', 'frank', 'testcapdev123!', {
    host: 'testcapdev.database.windows.net',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        encrypt: true
    }
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;