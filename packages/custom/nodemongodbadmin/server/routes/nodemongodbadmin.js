'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Nodemongodbadmin, app, auth, database) {

  app.get('/api/nodemongodbadmin/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/nodemongodbadmin/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/nodemongodbadmin/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/nodemongodbadmin/example/render', function(req, res, next) {
    Nodemongodbadmin.render('index', {
      package: 'nodemongodbadmin'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
