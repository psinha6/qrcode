angular.module('GeekCtrl', []).controller('GeekController', function($scope, $http,Nerd) {
	$("#qrgenerator").css("display", "none");
	$scope.getQRDetails = function(){
		console.log("Image id from server" + Nerd.imageid);
		$http({
              method: 'GET',
              url: '/getImageDetails',
              params: {image_title: Nerd.imageid}
            }).then(function successCallback(response) {
	        	console.log("Data recieved successfully :: " + JSON.stringify(response.data));
	        }, function errorCallback(response) {
	           	console.log("Error in fetching data from server::" + JSON.stringify(response));         
	        });
	}

});