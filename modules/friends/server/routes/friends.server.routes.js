'use strict';

/**
 * Module dependencies.
 */
var friendsPolicy = require('../policies/friends.server.policy'),
  friends = require('../controllers/friends.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/friends').all(friendsPolicy.isAllowed)
    .get(friends.list)
    .post(friends.create);

  // Single article routes
  app.route('/api/friends/:articleId').all(friendsPolicy.isAllowed)
    .get(friends.read)
    .put(friends.update)
    .delete(friends.delete);

  // Finish by binding the article middleware
  app.param('articleId', friends.articleByID);
};
