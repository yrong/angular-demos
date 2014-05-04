function RefreshCtrl($scope,$compile){
    $scope.refresh = function(){
        $("#dynamicContent").html(
          $compile(
            "<button ng-click='count = count + 1' ng-init='count=0'>Increment</button><span>count: {{count}} </span>"
          )($scope));
        $scope.$apply();
    };
	
	/*
	$(document).ready(function(){
	   $("#myRefreshButton").on('click',function() {
		  var scope = angular.element('#dynamicContent').scope();
		  scope.refresh();
		});        
	})
	*/
	
}

	
        
  