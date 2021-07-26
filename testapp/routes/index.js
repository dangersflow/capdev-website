var express = require('express');
const { state } = require('../routes/database');
var router = express.Router();
var db = require('../routes/database');
const { Connection, Request } = require("tedious");
const { Sequelize, DataTypes } = require('sequelize');
const { QueryTypes } = require('sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CAPDEV Tracker' });
});

router.get('/database', async function(req, res, next) {
    var mysql = "SELECT * FROM projects";
    var columnsObject;

    /*
    request = new Request("SELECT * FROM projects",
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`)
            }
        });

    request.on("row", columns => {
        //console.log(columns);
        columnsObject = columns;
        var jsonString = JSON.stringify(columnsObject);
        //console.log(jsonString);
        /*
        columns.forEach(column => {
            //console.log("%s\t%s", column.metadata.colName, column.value);
        });
        
    });

    db.execSql(request);
    */
    results = await executeQuery(mysql);
    console.log(results);

    res.render('database', { results: JSON.stringify(results) });

});

async function executeQuery(mysql) {
    const results = await db.query(mysql, {
        logging: console.log,
        plain: false,
        raw: true,
        type: QueryTypes.SELECT
    });

    //console.log(results);
    console.log(JSON.stringify(results));
    return results;

}

async function executeInsert(statement) {
    await db.query(statement, {
        type: QueryTypes.INSERT
    });
}

async function executeUpdate(statement) {
    await db.query(statement, {
        type: QueryTypes.UPDATE
    });
}

router.get('/graphs', async function(req, res, next) {
    var mysql = "SELECT * FROM projects";
    var columnsObject;

    results = await executeQuery(mysql);
    console.log(results);

    res.render('graphs', { results: JSON.stringify(results) });
});
/*
router.update("/update", function(req, res, next) {

})

router.delete("/delete", function(req, res, next) {

})

*/

router.post('/update', async function(req, res, next) {
    const userDetails = req.body;

    var id = req.body.id;
    var title = req.body.title;
    var statement = req.body.statement;
    var commanderIntent = req.body.commanderIntent;
    var quadchart = req.body.quadchart;
    var milestone = req.body.milestone;
    var testevent = req.body.testevent;
    var LAO = req.body.LAO;
    var LAOPOC = req.body.LAOPOC;
    var ResourceSponsor = req.body.ResourceSponsor;
    var ResourceSponsorPOC = req.body.ResourceSponsorPOC;
    var AquisitionSponsor = req.body.AquisitionSponsor;
    var AquisitionSponsorPOC = req.body.AquisitionSponsorPOC;
    var ProgramOffice = req.body.ProgramOffice;
    var CAPGAP1 = req.body.CAPGAP1;
    var CAPGAP2 = req.body.CAPGAP2;
    var CAPGAP3 = req.body.CAPGAP3;
    var RASponsor = req.body.RASponsor;
    var STobj = req.body.STobj;
    var TRL = req.body.TRL;
    var TRLJ = req.body.TRLJ;
    var cost = req.body.cost;
    var projectType = req.body.projectType;
    var status = req.body.status;


    var created_at = new Date().toISOString;

    title = title.replace("'", "\\'");
    statement = statement.replace("'", "\\'");
    commanderIntent = commanderIntent.replace("'", "\\'");
    milestone = milestone.replace("'", "\\'");
    testevent = testevent.replace("'", "\\'");
    LAO = LAO.replace("'", "\\'");
    LAOPOC = LAOPOC.replace("'", "\\'");
    ResourceSponsor = ResourceSponsor.replace("'", "\\'");
    ResourceSponsorPOC = ResourceSponsorPOC.replace("'", "\\'");
    AquisitionSponsor = AquisitionSponsor.replace("'", "\\'");
    AquisitionSponsorPOC = AquisitionSponsorPOC.replace("'", "\\'");
    ProgramOffice = ProgramOffice.replace("'", "\\'");
    CAPGAP1 = CAPGAP1.replace("'", "\\'");
    CAPGAP2 = CAPGAP2.replace("'", "\\'");
    CAPGAP3 = CAPGAP3.replace("'", "\\'");
    RASponsor = RASponsor.replace("'", "\\'");
    STobj = STobj.replace("'", "\\'");
    TRL = TRL.replace("'", "\\'");
    TRLJ = TRLJ.replace("'", "\\'");
    cost = cost.replace("'", "\\'");
    projectType = projectType.replace("'", "\\'");
    status = status.replace("'", "\\'");

    var sql = "UPDATE projects " +
        "SET " +
        "title = '" + title + "'," +
        "projectdesc = '" + statement + "'," +
        "commanderintent = '" + commanderIntent + "'," +
        "imageURL = '" + quadchart + "'," +
        "nextmilestone = '" + milestone + "'," +
        "nexttestevent = '" + testevent + "'," +
        "lao = '" + LAO + "'," +
        "laopoc = '" + LAOPOC + "'," +
        "resourcesponsor = '" + ResourceSponsor + "'," +
        "resourcepoc = '" + ResourceSponsorPOC + "'," +
        "acquisitionsponsor = '" + AquisitionSponsor + "'," +
        "acquisitionpoc = '" + AquisitionSponsorPOC + "'," +
        "programoffice = '" + ProgramOffice + "'," +
        "capabilitygap1 = '" + CAPGAP1 + "'," +
        "capabilitygap2 = '" + CAPGAP2 + "'," +
        "capabilitygap3 = '" + CAPGAP3 + "'," +
        "rasponsor = '" + RASponsor + "'," +
        "stobjectives = '" + STobj + "'," +
        "trl = '" + TRL + "'," +
        "trljustification = '" + TRLJ + "'," +
        "cost = '" + cost + "'," +
        "projecttype = '" + projectType + "'," +
        "projectstatus = '" + status + "'" +
        " WHERE id = " + id + ";";

    //sql = sql.replace(/[\n\r\t]/g, "");
    console.log(sql);

    await executeUpdate(sql);

    res.redirect('/database');
})

router.post('/create', async function(req, res, next) {
    const userDetails = req.body;

    var title = req.body.title;
    var statement = req.body.statement;
    var commanderIntent = req.body.commanderIntent;
    var quadchart = req.body.quadchart;
    var milestone = req.body.milestone;
    var testevent = req.body.testevent;
    var LAO = req.body.LAO;
    var LAOPOC = req.body.LAOPOC;
    var ResourceSponsor = req.body.ResourceSponsor;
    var ResourceSponsorPOC = req.body.ResourceSponsorPOC;
    var AquisitionSponsor = req.body.AquisitionSponsor;
    var AquisitionSponsorPOC = req.body.AquisitionSponsorPOC;
    var ProgramOffice = req.body.ProgramOffice;
    var CAPGAP1 = req.body.CAPGAP1;
    var CAPGAP2 = req.body.CAPGAP2;
    var CAPGAP3 = req.body.CAPGAP3;
    var RASponsor = req.body.RASponsor;
    var STobj = req.body.STobj;
    var TRL = req.body.TRL;
    var TRLJ = req.body.TRLJ;
    var cost = req.body.cost;
    var projectType = req.body.projectType;
    var status = req.body.status;


    var created_at = new Date().toISOString;

    title = title.replace("'", "\\'");
    statement = statement.replace("'", "\\'");
    commanderIntent = commanderIntent.replace("'", "\\'");
    milestone = milestone.replace("'", "\\'");
    testevent = testevent.replace("'", "\\'");
    LAO = LAO.replace("'", "\\'");
    LAOPOC = LAOPOC.replace("'", "\\'");
    ResourceSponsor = ResourceSponsor.replace("'", "\\'");
    ResourceSponsorPOC = ResourceSponsorPOC.replace("'", "\\'");
    AquisitionSponsor = AquisitionSponsor.replace("'", "\\'");
    AquisitionSponsorPOC = AquisitionSponsorPOC.replace("'", "\\'");
    ProgramOffice = ProgramOffice.replace("'", "\\'");
    CAPGAP1 = CAPGAP1.replace("'", "\\'");
    CAPGAP2 = CAPGAP2.replace("'", "\\'");
    CAPGAP3 = CAPGAP3.replace("'", "\\'");
    RASponsor = RASponsor.replace("'", "\\'");
    STobj = STobj.replace("'", "\\'");
    TRL = TRL.replace("'", "\\'");
    TRLJ = TRLJ.replace("'", "\\'");
    cost = cost.replace("'", "\\'");
    projectType = projectType.replace("'", "\\'");
    status = status.replace("'", "\\'");




    var sql = "INSERT INTO projects " +
        "VALUES(" +
        "GETDATE()," +
        "'" + title + "'," +
        "'" + statement + "'," +
        "'" + commanderIntent + "'," +
        "'" + quadchart + "'," +
        "'" + milestone + "'," +
        "'" + testevent + "'," +
        "'" + LAO + "'," +
        "'" + LAOPOC + "'," +
        "'" + ResourceSponsor + "'," +
        "'" + ResourceSponsorPOC + "'," +
        "'" + AquisitionSponsor + "'," +
        "'" + AquisitionSponsorPOC + "'," +
        "'" + ProgramOffice + "'," +
        "'" + CAPGAP1 + "'," +
        "'" + CAPGAP2 + "'," +
        "'" + CAPGAP3 + "'," +
        "'" + RASponsor + "'," +
        "'" + STobj + "'," +
        "'" + TRL + "'," +
        "'" + TRLJ + "'," +
        "'" + cost + "'," +
        "'" + projectType + "'," +
        "'" + status + "'" +
        ");";

    //sql = sql.replace(/[\n\r\t]/g, "");
    console.log(sql);
    /*

    db.query(sql, function(err, data) {
        if (err) throw err;
        console.log("record inserted!")
    });

    */

    /*
    //make request object
    request = new Request(sql,
        function(err) {
            if (err) {
                console.log(err);
            }
        });

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function(rowCount, more) {
        //db.close();
    });

    //execute the request made
    db.execSql(request);

    */

    await executeInsert(sql);

    res.redirect('/database');

    //console.log(userDetails);

})

module.exports = router;