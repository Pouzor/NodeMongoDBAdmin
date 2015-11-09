'use strict';

/**
 * Module dependencies.
 */
var meanio = require('meanio');
var config = meanio.loadConfig();
var ObjectID = require('mongodb').ObjectID;
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;
var MongoClient = require('mongodb').MongoClient;


function getRequest(request) {
    request = JSON.stringify(request);
    request = request.replace(/MONGO_OPERATOR/g, "$");// Cause $ get disepear when stringify

    var dateTimeReviver = function (key, value) {
        var a;
        if (typeof value === 'string') {
            a = /Date\(([:a-zA-Z0-9_-]*)\)/.exec(value);
            if (a) {
                console.log(a[1]);

                return new Date(a[1]);
            }

            a = /ObjectId\(([a-f0-9]*)\)/.exec(value);
            if (a) {
                return new ObjectID(a[1]);
            }
        }

        return value;
    };

    return JSON.parse(request, dateTimeReviver);
}


exports.all = function (req, res) {

    MongoClient.connect(config.db + '/admin', function (err, db) {

        // Use the admin database for the operation
        db.authenticate(config.mongoUser, config.mongoPass, function (err, result) {
            var adminDb = db.admin();

            // List all the available databases
            adminDb.listDatabases(function (err, dbs) {
                res.json(dbs.databases);
                db.close();
            });
        });
    });
};


exports.getCollections = function (req, res) {

    MongoClient.connect(config.db + '/' + req.params.id, function (err, db) {
        db.authenticate(config.mongoUser, config.mongoPass, function (err, result) {
            db.listCollections().toArray(function (err, collections) {
                res.json({"collections": collections});
                db.close();

            });
        });
    });

};


exports.request = function (req, res) {
    var data = req.body;

    try {

        MongoClient.connect(config.db + '/' + data.database, function (err, db) {
            db.authenticate(config.mongoUser, config.mongoPass, function (err, result) {

                var request = getRequest(data.request);
                var update = getRequest(data.update);

                // FIND REQUEST
                if (data.type == 'find') {

                    var col = db.collection(data.collection);
                    col.find(request).limit(data.limit).sort(data.sort).maxTimeMS(3000000).toArray(function (err, docs) {

                        if (err) {
                            res.json([{"Error at find": err}]);
                            console.log(err);

                            return;
                        }

                        res.json(docs);
                        db.close();
                    });

                } else
                // UPDATE REQUEST
                if (data.type == 'update') {

                    var col = db.collection(data.collection);

                    col.update(request, update, function (err, docs) {
                        if (err) {
                            res.json([{"Error": err}]);
                            console.log("Error" + err);

                            return;
                        }

                        res.json([{"status": "ok"}]);
                        db.close();
                    });

                } else
                // REMOVE REQUEST
                if (data.type == 'remove') {

                    var col = db.collection(data.collection);
                    col.remove(request, function (err, docs) {

                        if (err) {
                            res.json([{"Error": err}]);
                            console.log(err);

                            return;
                        }

                        res.json([{"status": "ok"}]);
                        db.close();
                    });

                } else
                // COUNT REQUEST
                if (data.type == 'count') {

                    db.command({'count': data.collection, 'query': request}, function (err, count) {
                        if (err) {
                            res.json([{"Error": err}]);
                            console.log(err);
                            return;
                        }

                        res.json([{count: count}]);
                        db.close();
                    });

                } else if (data.type == 'aggregate') {

                    db.collection(data.collection).aggregate(request, function (err, docs) {

                        if (err) {
                            res.json([{"Error": err}]);
                            console.log(err);

                            return;
                        }

                        res.json(docs);
                        db.close();
                    });


                }

            });
        });

    } catch (ex) {
        console.log(ex);
        res.json([{"Error": ex}]);
    }
};