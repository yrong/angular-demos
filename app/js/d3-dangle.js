function D3DemoCtrl($scope) {
	 var resultsA = {
        	facets: {
    			Product : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Prod-A",
        				count : 306
      				},{
        				term : "Prod-B",
        				count : 148
      				},{
      					term : "Prod-C",
      					count : 62
      				}]
    			},
    			Sex : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Male",
        				count : 36
      				},{
        				term : "Female",
        				count : 148
      				}]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [{
	        			time : 1341100800000,
	        			count : 9
	      			}, {
	        			time : 1343779200000,
	        			count : 32
	      			}, {
	        			time : 1346457600000,
	        			count : 78
	      			}, {
	        			time : 1349049600000,
	        			count : 45
	      			}, {
	        			time : 1351728000000,
	        			count : 134
	      			}]
        		}
        	}
        };

        var resultsB = {
        	facets: {
    			Product : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Prod-A",
        				count : 306
      				},{
        				term : "Prod-B",
        				count : 148
      				},{
                        term : "Prod-C",
                        count : 0
                    }]
    			},
    			Sex : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Male",
        				count : 36
      				}]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [{
	        			time : 1341100800000,
	        			count : 9
	      			}, {
	        			time : 1343779200000,
	        			count : 32
	      			}, {
	        			time : 1346457600000,
	        			count : 78
	      			}]
        		}
        	}
        };

        $scope.filterSearchA = function(type, term) {
            switch(currentResults) {
                case 'A':
                    $scope.results = resultsB;
                    currentResults = 'B';
                    break;
                case 'B':
                    $scope.results = resultsA;
                    currentResults = 'A';
                    break;
            }
        };

        $scope.results = resultsA;
        var currentResults = 'A'; 
}




var _gaq = _gaq || [];
          var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
          _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
          _gaq.push(['_setAccount', 'UA-12991832-4']);
          _gaq.push(['_setDomainName', 'fullscale.co']);
          _gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

angular.module('d3demo', ['dangle', 'd3demo.controllers']);



angular.module('d3demo.controllers', [])
    .controller('DemoCtrl', function($scope) {
        'use strict';

        var resultsA = {
        	facets: {
    			Product : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Prod-A",
        				count : 306
      				},{
        				term : "Prod-B",
        				count : 148
      				},{
      					term : "Prod-C",
      					count : 62
      				}]
    			},
    			Sex : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Male",
        				count : 36
      				},{
        				term : "Female",
        				count : 148
      				}]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [{
	        			time : 1341100800000,
	        			count : 9
	      			}, {
	        			time : 1343779200000,
	        			count : 32
	      			}, {
	        			time : 1346457600000,
	        			count : 78
	      			}, {
	        			time : 1349049600000,
	        			count : 45
	      			}, {
	        			time : 1351728000000,
	        			count : 134
	      			}]
        		}
        	}
        };

        var resultsB = {
        	facets: {
    			Product : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Prod-A",
        				count : 306
      				},{
        				term : "Prod-B",
        				count : 148
      				},{
                        term : "Prod-C",
                        count : 0
                    }]
    			},
    			Sex : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Male",
        				count : 36
      				}]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [{
	        			time : 1341100800000,
	        			count : 9
	      			}, {
	        			time : 1343779200000,
	        			count : 32
	      			}, {
	        			time : 1346457600000,
	        			count : 78
	      			}]
        		}
        	}
        };

        $scope.filterSearchA = function(type, term) {
            switch(currentResults) {
                case 'A':
                    $scope.results = resultsB;
                    currentResults = 'B';
                    break;
                case 'B':
                    $scope.results = resultsA;
                    currentResults = 'A';
                    break;
            }
        };

        $scope.results = resultsA;
        var currentResults = 'A';

    });