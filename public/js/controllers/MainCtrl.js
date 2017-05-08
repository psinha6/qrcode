angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$("#qrgenerator").css("display", "block");
	$scope.qrCode;
	$scope.classNames = ['1', '2', '3', '4', '5', '6', '7', '8'];
	//$scope.tagline = 'To the moon and back!';
	$scope.generateQRCode = function(){
		var error;
		if(!$scope.syllabusNo){
			error = "Please enter syllabus id";
		} else if(!$scope.contentId){
			if(error){
				error += "and content id";
			} else {
				error = "Please enter content id";
			}
		} else if(!$scope.className){
			if(error){
				error += "and class number";
			} else {
				error = "Please enter class number";
			}
		}
		if(error){
			alert(error);
			return;	
		}
		var url = "www.nexteducation.com?syllabus=" + $scope.syllabusNo + "&csid=" + $scope.contentId;
		makeCode(url);
	}

	$('img.downloadable').each(function(){
		var $this = $(this);
		$this.wrap('<a href="' + $this.attr('src') + '" download />')
	});
	$scope.download = function(){
		
	}
});