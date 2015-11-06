'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Nodemongodbadmin = new Module('nodemongodbadmin');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Nodemongodbadmin.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Nodemongodbadmin.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Nodemongodbadmin.menus.add({
        title: 'nodemongodbadmin example page',
        link: 'nodemongodbadmin example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    Nodemongodbadmin.aggregateAsset('css', 'nodemongodbadmin.css');
  //  Nodemongodbadmin.angularDependencies(['jsonFormatter']);
    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Nodemongodbadmin.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Nodemongodbadmin.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     Nodemongodbadmin.settings(function(err, settings) {
        //you now have the settings object
    });
     */

    return Nodemongodbadmin;
});
