function WatcherCtrl($scope) {
    $scope.updated = 0;

    $scope.stop = function() {
    
    textWatch();
    
    };
    
    
    
    var textWatch = $scope.$watch('text', function(newVal, oldVal) {
    
    if (newVal === oldVal) { return; }
    
    $scope.updated++;
    
    });

}