angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http, Nerd, $location) {

	$("#qrgenerator").css("display", "none");
  $scope.classNames = Nerd.classNames;
  $scope.subjects = Nerd.subjects;
  Nerd.isConnected();
	$scope.showStuff = function(){
		$http({
          method: 'GET',
          url: Nerd.serverUrl + '/showQRCodes'
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
    $location.path( '/geeks' );
  }
	$scope.zipDownload = function(filterData, filterData1){
    if(filterData){
      if(filterData1){
        filterData = filterData + "-" + filterData1;
      }
    } else {
      filterData = filterData1;  
    }
    
    console.log("zipDownload filterData:: " + filterData)
    $http({
          method: 'GET',
          url: Nerd.serverUrl + '/downloadImages',
          params: {filterData: filterData}
        }).then(function successCallback(response) {
          console.log("Image saved successfully :: " + JSON.stringify(response));
          $scope.filesZipped = response.data.name;
          
        }, function errorCallback(response) {
          console.log("Error could not save image::" + JSON.stringify(response));
        });
  }

  $scope.generateNewQR = function(){
    $location.path( '/' );
  }

  $scope.changePage = function(loc){
   console.log('/' + loc)
     $location.path( '/nerds' );
  }

});