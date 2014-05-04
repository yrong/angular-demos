'use strict';

/* Controllers */

function DemoCompileController($scope, $route, $routeParams,$location,$compile,$rootScope,$state) {

    $scope.iframeLink = '';
	
	$scope.setLink = function(link){
      $scope.iframeLink = link;
    }
	/*
	if($rootScope.currentNode.newwin){
		$route.current.templateUrl = "partials/home.html";
	}
	*/
	$route.current.templateUrl = 'partials/' + $routeParams.nodeUrl + ".html";
	 
	var find = false;
	gTplMap.each(function(key,value,index){  
        if(key == $routeParams.nodeUrl){
			$('#myview').html($compile(value)($scope));
			find = true;
		}
    });
	if(find){
		//return;
	}
	
	//$state.go('home');
    $.get($route.current.templateUrl, function (data) {
		gTplMap.put($routeParams.nodeUrl,data);
		if($rootScope.currentNode.newwin){
			var newurl = $location.protocol() + '://' + $location.host() + ":" + $location.port() + "/app/partials/" + $rootScope.currentNode.nodeUrl + ".html";
			window.location.href = newurl;
			//window.open(newurl,'mywindow','width=400,height=200,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes');
			/*
			$scope.setLink(newurl);
			$scope.$apply(function () {
            $('#myview').html($compile(data)($scope));
			$scope.setLink(newurl);
			});
			*/
			return;
		}
		
		$scope.$apply(function () {
			
            $('#myview').html($compile(data)($scope));
			//$location.path($location.path() + '/' + $rootScope.currentNode.nodeUrl);
			//$('#uiroute').html('');
			$rootScope.uishow = false;
        });
		
		//$state.go('home');
    });
}
/*
CMSController.resolve = {
  scripts: function($q,$routeParams,$rootScope) {
    var deferred = $q.defer();
    var dependencies =
    [
        'js/' + $rootScope.currentNode.nodeUrl + '.js'
    ];
 
    $script(dependencies, function()
    {
		console.log("script loaded!");
		
        $rootScope.$apply(function()
        {
            deferred.resolve();
        });
		
    });
 
    return deferred.promise;
  }
};
CMSController.resolve.$inject = ['$scope', '$route', '$routeParams','$location','$compile'];
*/


(function(){
  
  angulardemo.controller('DemoTreeController', function($scope){

	$scope.demotree = mydemotree;
  });
  
})();

(function(){
  
  angulardemo.controller('DemoIframeController', function($scope,$rootScope){

	$scope.iframeLink = '';
	
	$scope.setLink = function(link){
      $scope.iframeLink = link;
    }
  });
  
})();



//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
