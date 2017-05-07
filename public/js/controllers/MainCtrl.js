angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.qrCode;
	$scope.classNames = ['1', '2', '3', '4', '5', '6', '7', '8'];
	//$scope.tagline = 'To the moon and back!';
	$scope.generateQRCode = function(){

	}

	var qrcode = new QRCode(document.getElementById("qrcode"), {
		width : 100,
		height : 100
	});

	function makeCode () {		
	var elText = document.getElementById("text");
	
	if (!elText.value) {
		alert("Input a text");
		elText.focus();
		return;
	}
	
	qrcode.makeCode(elText.value);
	}

	makeCode();

	$("#text").
	on("blur", function () {
		makeCode();
	}).
	on("keydown", function (e) {
		if (e.keyCode == 13) {
			makeCode();
		}
	});
});