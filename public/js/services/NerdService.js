angular.module('NerdService', []).service('Nerd', ['$http', function($http) {

	this.imageid;
	this.printImageId = function(){
		console.log(this.imageid);
	}

}]);