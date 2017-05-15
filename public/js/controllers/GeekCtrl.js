angular.module('GeekCtrl', []).controller('GeekController', function($scope, $http,Nerd) {
	$("#qrgenerator").css("display", "none");
	$scope.classNames = ['1', '2', '3', '4', '5', '6', '7', '8']; //TODO Put in service
	$scope.subjects = ["Hindi", "EVS", "Social_Studies", "Science", "Maths", "English"]; //TODO Put in service
	$scope.assets = ["image", "video", "activity", "others"];
	$scope.isSuccess = false;
	$scope.Board = "NextCurriculum";
	$scope.editAsset = true;

	$scope.getQRDetails = function(){
		console.log("Image id from server" + Nerd.imageid);
		$http({
              method: 'GET',
              url: '/getImageDetails',
              params: {image_title: Nerd.imageid}
            }).then(function successCallback(response) {
	        	console.log("Data recieved successfully :: " + JSON.stringify(response.data));
	        	var respnsedata = response.data[0];
	        	$scope.img = respnsedata.path;
	        	$scope.image_title = respnsedata.image_title;
	        	$scope.image_id = respnsedata.image_id;
	        	$scope.image_description = respnsedata.image_description
	        	$scope.isSuccess = true;

	 			$http({
		              method: 'GET',
		              url: '/getMappedData',
		              params: {image_id: $scope.image_id}
		            }).then(function successCallback(response) {
			        	console.log("Data recieved successfully :: " + JSON.stringify(response.data));
			        	$scope.mappedData = response.data;
			        }, function errorCallback(response) {
			           	console.log("Error in fetching data from server::" + JSON.stringify(response));         
			        });       	


	        }, function errorCallback(response) {
	           	console.log("Error in fetching data from server::" + JSON.stringify(response));         
	        });
	}
	
	$scope.addMapping = function(){
		for(var i = 0; i < Nerd.syllabusData.length; i++){
			if(Nerd.syllabusData[i].Subject == $scope.subjectName && Nerd.syllabusData[i].Class == $scope.class_name){
				$scope.syllabus_id = Nerd.syllabusData[i].Syllabus;
			}
		}
		if(!$scope.syllabus_id){
			alert("Add correct mapping for class and subject::" + $scope.subjectName + " class:: " + $scope.class_name);
			return;
		}
		$http({
              method: 'POST',
              url: '/addMappingToDataBase',
              data: {asset_type: $scope.asset_type, 
              	class_name: $scope.class_name, 
              	syllabus_id: $scope.syllabus_id, 
              	chapter_no: $scope.chapter_no, 
              	chapter_name: $scope.chapter_name, 
              	concept_name: $scope.concept_name, 
              	content_id: $scope.content_id, 
				image_id: $scope.image_id, 
              	asset_description: $scope.asset_description,
              	board : $scope.Board
              }
            }).then(function successCallback(response) {
	        	console.log("Data saved successfully :: " + JSON.stringify(response.data));
	        	clearData();
	        }, function errorCallback(response) {
	           console.log("Error could not save mapping data::" + JSON.stringify(response));
	        });
	}

	function clearData(){

	}

	$scope.submitEdit = function(mapped){
		$http({
              method: 'POST',
              url: '/editMappingToDataBase',
              data: { asset_id: mapped.asset_id,
              	asset_type: mapped.asset_type, 
              	class_name: mapped.class_name, 
              	syllabus_id: mapped.syllabus_id, 
              	chapter_no: mapped.chapter_no, 
              	chapter_name: mapped.chapter_name, 
              	concept_name: mapped.concept_name, 
              	content_id: mapped.content_id, 
				image_id: mapped.image_id, 
              	asset_description: mapped.asset_description,
              	board : mapped.Board
              }
            }).then(function successCallback(response) {
	        	console.log("Data saved successfully :: " + JSON.stringify(response.data));
	        	clearData();
	        }, function errorCallback(response) {
	           console.log("Error could not save mapping data::" + JSON.stringify(response));
	        });
	}

});