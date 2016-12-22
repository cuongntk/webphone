'use strict';

// Configuring the Articles module
angular.module('friends').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Friends',
      state: 'friends',
      type: 'dropdown',
      roles: ['user', 'admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'friends', {
      title: 'List Friends',
      state: 'friends.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'friends', {
      title: 'Add Friends',
      state: 'friends.create',
      roles: ['user']
    });
  }
]);
