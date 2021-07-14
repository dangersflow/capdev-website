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
    var stakeholder = req.body.stakeholder;
    var resource_sponsor = req.body.resource_sponsor;
    var aquisition_sponsor = req.body.acquisition_sponsor;
    var onr_po = req.body.onr_po;
    var cost = req.body.cost;
    var project_type = req.body.project_type;
    var operation_concept = req.body.operation_concept;
    var created_at = new Date().toISOString;

    title = title.replace("'", "\\'");
    statement = statement.replace("'", "\\'");
    milestone = stakeholder.replace("'", "\\'");
    resource_sponsor = resource_sponsor.replace("'", "\\'");
    aquisition_sponsor = aquisition_sponsor.replace("'", "\\'");
    onr_po = onr_po.replace("'", "\\'");
    project_type = project_type.replace("'", "\\'");
    operation_concept = operation_concept.replace("'", "\\'");

    var sql = "INSERT INTO project.projectinfo (" +
        "CREATOR," +
        "DATECREATED," +
        "TITLE," +
        "STATEMENT," +
        "NEXTMILESTONE," +
        "STAKEHOLDERS," +
        "RESOURCESPONS," +
        "AQUISITIONSPONS," +
        "ONRPO," +
        "RASPONSOR," +
        "COST," +
        "PROJECTTYPE," +
        "CLASSIFICATION" +
        ") VALUES(" +
        "'" + "TEST" + "'," +
        "NOW()," +
        "'" + title + "'," +
        "'" + statement + "'," +
        "'" + milestone + "'," +
        "'" + stakeholder + "'," +
        "'" + resource_sponsor + "'," +
        "'" + aquisition_sponsor + "'," +
        "'" + onr_po + "'," +
        "'" + "'," +
        "'" + cost + "'," +
        "'" + project_type + "'," +
        "'" + operation_concept + "'" +
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