'use strict';

// The Package is passed automatically as first parameter
module.exports = function(Projects, app, auth, database) {

  app.get('/projects/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/projects/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/projects/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/projects/example/render', function(req, res, next) {
    Projects.render('index', {
      package: 'projects'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
