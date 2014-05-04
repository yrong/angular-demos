'use strict';
var mydemotree = [
        { "nodeName" : "angularstrap", "nodeId" : "angularstrap", "children" : [
          { "nodeName" : "accordion", "nodeId" : "accordion", "children" : [],"nodeUrl":"accordion","nodeJs":["accordion"]},
		  { "nodeName" : "tooltip", "nodeId" : "tooltip", "children" : [],"nodeUrl":"tooltip","nodeJs":["tooltip"]}
        ]},
		{ "nodeName" : "jqueryui", "nodeId" : "jqueryui", "children" : [
          { "nodeName" : "autocomplete", "nodeId" : "autocomplete", "children" : [],"nodeUrl":"myautocomplete","nodeJs":["myautocomplete"]},
		  { "nodeName" : "slider", "nodeId" : "slider", "children" : [],"nodeUrl":"jq-slider","nodeJs":["jq-slider"]},
		  { "nodeName" : "progressbar", "nodeId" : "progressbar", "children" : [],"nodeUrl":"jq-progressbar","nodeJs":["progressbar"]}
        ]},
		{ "nodeName" : "d3", "nodeId" : "d3", "children" : [
          { "nodeName" : "d3-dangle", "nodeId" : "d3-dangle", "children" : [],"nodeUrl":"d3-dangle","nodeJs":["d3-dangle"]},
		  { "nodeName" : "nvd3-1", "nodeId" : "nvd3-1", "children" : [],"nodeUrl":"nvd3-1","nodeJs":["nvd3-1"]}, 
		  { "nodeName" : "nvd3-chart1", "nodeId" : "nvd3-chart1", "children" : [],"nodeUrl":"nvd3-chart","nodeJs":["stream_layers","nvd3-chart"]},
		  { "nodeName" : "directive-d3", "nodeId" : "directive-d3", "children" : [],"nodeUrl":"directive-d3","nodeJs":["reuseable_barchart","directive-d3"]}		  
        ]},
		{ "nodeName" : "directive", "nodeId" : "directive", "children" : [
          { "nodeName" : "rank", "nodeId" : "rank", "children" : [],"nodeUrl":"rank","nodeJs":["rank"]},
		  { "nodeName" : "choicetree", "nodeId" : "choicetree", "children" : [],"nodeUrl":"choicetree","nodeJs":["choicetree"]},
		  { "nodeName" : "mytimer", "nodeId" : "mytimer", "children" : [],"nodeUrl":"mytimer","nodeJs":["mytimer"]}
        ]},
		{ "nodeName" : "uistate", "nodeId" : "uistate", "children" : [
          { "nodeName" : "myuistate", "nodeId" : "myuistate", "children" : [],"nodeState":"uistate","noloader":true},
		  { "nodeName" : "iframe", "nodeId" : "iframe", "children" : [],"nodeUrl":"iframe","newwin":true,"noloader":true}	
        ]},
		
		{ "nodeName" : "concept", "nodeId" : "concept", "children" : [
          { "nodeName" : "compile", "nodeId" : "compile", "children" : [],"nodeUrl":"compile","nodeJs":["compile"] },
		  //{ "nodeName" : "test", "nodeId" : "test", "children" : [],"nodeUrl":"test","newwin":true,"noloader":true},
		  { "nodeName" : "ngclass", "nodeId" : "ngclass", "children" : [],"nodeUrl":"ngclass","noloader":true },
		  { "nodeName" : "ngrepeat", "nodeId" : "ngrepeat", "children" : [],"nodeUrl":"ngrepeat","noloader":true },	  
		  { "nodeName" : "ng-template", "nodeId" : "ng-template", "children" : [],"nodeUrl":"ng-template","noloader":true },
		  { "nodeName" : "ng-href", "nodeId" : "ng-href", "children" : [],"nodeUrl":"ng-href","noloader":true },
		  { "nodeName" : "mywatcher", "nodeId" : "mywatcher", "children" : [],"nodeUrl":"mywatcher","nodeJs":["mywatcher"] },
		  { "nodeName" : "ngform", "nodeId" : "ngform", "children" : [],"nodeUrl":"ng-form","nodeJs":["ng-form"] }
        ]},
		
		{ "nodeName" : "integration", "nodeId" : "integration", "children" : [
          { "nodeName" : "switchablegrid", "nodeId" : "switchablegrid", "children" : [],"nodeUrl":"switchablegrid","nodeJs":["switchablegrid"]}
        ]},
      ];


/* App Module */

var angulardemo = angular.module('angulardemo', [/*'phonecatFilters', 'phonecatServices',*/'ngResource','angularTreeview','ui.router','ui.bootstrap','dangle','charts']).
  config(['$routeProvider','$stateProvider', function($routeProvider,$stateProvider,$location) {
  $routeProvider.
	  /*
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/phones'}
	  */
	  when('/demotree', {templateUrl: 'partials/demotree.html'}).
      when('/demotree/:nodeUrl', {
	  templateUrl: 'partials/home.html',
	  
	  resolve:{deps:function($q, $rootScope)
        {
            var deferred = $q.defer();
			var dependencies = [];
			if($rootScope.currentNode.noloader)
			{
				dependencies =
				[
					'js/nothing.js'
				];
			}
			else
			{
				$rootScope.currentNode.nodeJs.forEach(function(e){
					dependencies.push('js/' + e + '.js');
				})
			}
			$script(dependencies, function()
			{
				// all dependencies have now been loaded by $script.js so resolve the promise
				$rootScope.$apply(function()
				{
					deferred.resolve();
				});
			});
            return deferred.promise;
        }},
	   controller: DemoCompileController
	  }).
	  /*
	  when('/route1',{templateUrl: 'partials/route1.html'}).
	  when('/route1/list',{templateUrl: 'partials/route1.list.html',controller: function($scope){
                $scope.items = ["A", "List", "Of", "Items"];
              }}).
	  when('/route2',{templateUrl: 'partials/route2.html'}).
	  when('/route2/list',{templateUrl: 'partials/route2.list.html',controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }}).
			  */
      otherwise({redirectTo: '/demotree'}
	  );
	  
	  $stateProvider
		.state('home', {
            url: "/home",
            templateUrl: "partials/home.html"			
        })
	  
	  $stateProvider
		.state('uistate', {
            url: "/uistate",
            templateUrl: "partials/uistate.html"
			
        })
        .state('uistate.route1', {
            url: "/route1",
            templateUrl: "partials/route1.html"
			
        })
          .state('uistate.route1.list', {
              url: "/list",
              templateUrl: "partials/route1.list.html",
              controller: function($scope,$location){
                $scope.items = ["A", "List", "Of", "Items"];
              }
          })
          
        .state('uistate.route2', {
            url: "/route2",
            templateUrl: "partials/route2.html"
			
        })
          .state('uistate.route2.list', {
              url: "/list",
              templateUrl: "partials/route2.list.html",
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          })
		  
}]);

var gTplMap = new Map();


