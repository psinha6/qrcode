angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

	$("#qrgenerator").css("display", "none");

	$scope.showStuff = function(){
		$http({
          method: 'GET',
          url: '/showQRCodes'
        }).then(function successCallback(response) {
            console.log("Image saved successfully :: " + JSON.stringify(response));
            $scope.qrcodes = response.data;
          }, function errorCallback(response) {
            console.log("Error could not save image::" + JSON.stringify(response));
          });
	}

	$scope.tagline = '';

});