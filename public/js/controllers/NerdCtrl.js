angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http, NerdService) {

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

  $scope.addMappingToImage = function(desc){
    console.log(desc);
    Nerd.imageid = desc;
    Nerd.printImageId();
  }
	$scope.tagline = '';

});