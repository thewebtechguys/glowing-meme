'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  _ = require('lodash');


/**
 * Find project by id
 */
exports.project = function(req, res, next, id) {
  Project.load(id, function(err, project) {
    if (err) return next(err);
    if (!project) return next(new Error('Failed to load project ' + id));
    req.project = project;
    next();
  });
};

/**
 * Create an project
 */
exports.create = function(req, res) {
  var project = new Project(req.body);
  project.user = req.user;

  project.save(function(err) {
    if (err) {
      process.stdout.write('hihi' + err);
      return res.json(500, {
        error: 'Cannot save the project'
      });
    }
    res.json(project);

  });
};

/**
 * Update an project
 */
exports.update = function(req, res) {
  var project = req.project;

  project = _.extend(project, req.body);

  project.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the project'
      });
    }
    res.json(project);

  });
};

/**
 * Delete an project
 */
exports.destroy = function(req, res) {
  var project = req.project;

  project.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the project'
      });
    }
    res.json(project);

  });
};

/**
 * Show a project
 */
exports.show = function(req, res) {
  res.json(req.project);
};

/**
 * List of Projects
 */
exports.all = function(req, res) {
  Project.find().sort('-created').populate('user', 'name username').exec(function(err, projects) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the projects'
      });
    }
    res.json(projects);

  });
};
