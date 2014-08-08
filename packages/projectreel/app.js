'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Projectreel = new Module('projectreel');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Projectreel.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Projectreel.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Projectreel.menus.add({
    title: 'projectreel example page',
    link: 'projectreel example page',
    roles: ['authenticated'],
    menu: 'main'
  });

  Projectreel.menus.add({
    title: 'create project',
    link: 'create project',
    roles: ['admin'],
    menu: 'main'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Projectreel.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Projectreel.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Projectreel.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Projectreel;
});
