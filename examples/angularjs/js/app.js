/// <reference path="../node_modules/angular-cc-appinsights/dist/angular-cc-appinsights.d.ts" />

/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute', 'ngResource', 'cc-appinsights'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'TodoCtrl',
			templateUrl: 'todomvc-index.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	})
	.config(function (ccAppInsightsProvider) {
		ccAppInsightsProvider.configure({
			telemetryInitializers: ['sessionIdTelemetryInitializer', function(envelope) {
				envelope.tags['ai.user.id'] = 'christianacca';
			}]
		});
    });	
