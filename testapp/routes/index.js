var express = require('express');
const { state } = require('../routes/database');
var router = express.Router();
var db = require('../routes/database');
const { Connection, Request } = require("tedious");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CAPDEV Tracker' });
});

router.get('/database', function(req, res, next) {
    var mysql = "SELECT * FROM projectinfo";
    /*
    db.query(mysql, function(err, data) {
        if (err) throw err;
        console.log("table retrieved!");
        var json = JSON.stringify(data);
        console.log(json);
        res.render('database', { projectInfo: json });
    });
    */

    request = new Request("SELECT * FROM projects",
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`)
            }
        });

    request.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    db.execSql(request);

    res.render('database');
});

router.get('/graphs', function(req, res, next) {
    res.render('graphs');
});
/*
router.update("/update", function(req, res, next) {

})

router.delete("/delete", function(req, res, next) {

})

*/

router.post('/create', function(req, res, next) {
    const userDetails = req.body;

    var title = req.body.title;
    var statement = req.body.statement;
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
    var commanderIntent = req.body.commanderIntent;

    var created_at = new Date().toISOString;

    title = title.replace("'", "\\'");
    statement = statement.replace("'", "\\'");
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
    commanderIntent = commanderIntent.replace("'", "\\'");



    var sql = "INSERT INTO project.projectinfo (" +
        "created," +
        "title," +
        "projectdesc," +
        "commanderintent" +
        "imageURL," +
        "nextmilestone," +
        "nexttestevent," +
        "lao," +
        "laopoc," +
        "resourcesponsor," +
        "resourcepoc," +
        "acquisitionsponsor," +
        "acquisitionpoc," +
        "programoffice," +
        "capabilitygap1," +
        "capabilitygap2," +
        "capabilitygap3," +
        "rasponsor," +
        "stobjectives," +
        "trl," +
        "trljustification," +
        "cost," +
        "projecttype," +
        "projectstatus," +
        ") VALUES(" +
        "NOW()," +
        "'" + title + "'," +
        "'" + statement + "'," +
        "'" + commanderIntent + "'," +
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

    sql = sql.replace(/[\n\r\t]/g, "");

    db.query(sql, function(err, data) {
        if (err) throw err;
        console.log("record inserted!")
    });

    res.redirect('/database');

    console.log(userDetails);

})

module.exports = router;