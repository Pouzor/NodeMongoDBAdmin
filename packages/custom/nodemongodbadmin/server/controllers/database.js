'use strict';

/**
 * Module dependencies.
 */
var meanio = require('meanio');
var config = meanio.loadConfig();
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;
var MongoClient = require('mongodb').MongoClient;

exports.all = function (req, res) {

    var db = new Db('test', new Server(config.mongoShortUrl, config.mongoPort), {safe: false});
    db.open(function (err, db) {
        if (err) {
            console.log(err);
        }

        var adminDb = db.admin();
        adminDb.authenticate(config.mongoUser, config.mongoPass, function (err, result) {
            if (err) {
                console.log(err);
            }

            adminDb.listDatabases(function (err, dbs) {

                if (err) {
                    console.log(err);
                    res.json(err);
                }

                res.json(dbs.databases);
                db.close();
            });

        });
    });

   // res.json([{"toto" : config.mongoPort}]);
};


exports.getCollections = function (req, res) {

    MongoClient.connect(config.db + '/' + req.params.id, function(err, db) {
        if(err) throw err;

        db.listCollections().toArray(function(err, collections) {
            console.log(collections);

            res.json({"collections": collections});
        });
    });
};