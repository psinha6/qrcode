angular.module('NerdService', []).service('Nerd', ['$http', function($http) {

     this.serverUrl = "";//"192.168.10.40:8080";
     this.getCurrentAdminUserId =  "http://192.168.10.18/admin/getCurrentAdminUserId.app"
	this.imageid;
     this.userLoggedIn = true;
	this.printImageId = function(){
		console.log("From Service" + this.imageid);
	}
     this.text = "www.nextcurriculum.in/app/qrcode/3";
    // this.options = "{"render":"image","crisp":true,"ecLevel":"H","minVersion":1,"fill":"#333333","back":"#ffffff","text":this.text,"size":43,"rounded":70,"quiet":2,"mode":"label","mSize":30,"mPosX":50,"mPosY":50,"label":"","fontname":"Ubuntu","fontcolor":"#ff9818","image":{}}";

     this.getImage = function(){
          return kjua(options);
     }
     this.isConnected = function(){
          $http({
              method: 'GET',
              url: this.getCurrentAdminUserId
            }).then(function successCallback(response) {
               this.userLoggedIn = true;
             }, function errorCallback(response) {
               this.userLoggedIn = false;
               //alert('Please login to continue' + JSON.stringify(response));
               //window.location = "http://192.168.10.18/admin/home.htm"
             });
     }
     this.booktypes =  ["Demo","CBSE","ICSE","East Edition","South Edition"]
	this.syllabusData = [
                    {"Syllabus": "1010853", "Subject": "English", "Class": "Nursery"},
                    {"Syllabus": "1010590", "Subject": "English", "Class": "5"},
                    {"Syllabus": "1010591", "Subject": "English", "Class": "LKG"},
                    {"Syllabus": "1010850", "Subject": "English", "Class": "UKG"},
                    {"Syllabus": "1010849", "Subject": "English", "Class": "2"},
                    {"Syllabus": "1010852", "Subject": "English", "Class": "4"},
                    {"Syllabus": "1010851", "Subject": "English", "Class": "3"},
                    {"Syllabus": "1010989", "Subject": "English", "Class": "7"},
                    {"Syllabus": "1010990", "Subject": "English", "Class": "8"},
                    {"Syllabus": "1010988", "Subject": "English", "Class": "6"},
                    {"Syllabus": "1010157", "Subject": "Maths", "Class": "LKG"},
                    {"Syllabus": "1010152", "Subject": "Maths", "Class": "Nursery"},
                    {"Syllabus": "1010162", "Subject": "Maths", "Class": "UKG"},
                    {"Syllabus": "1009416", "Subject": "Maths", "Class": "1"},
                    {"Syllabus": "1012412", "Subject": "Maths", "Class": "7"},
                    {"Syllabus": "1012411", "Subject": "Maths", "Class": "6"},
                    {"Syllabus": "1009417", "Subject": "Maths", "Class": "2"},
                    {"Syllabus": "1012413", "Subject": "Maths", "Class": "8"},
                    {"Syllabus": "1009418", "Subject": "Maths", "Class": "3"},
                    {"Syllabus": "1009419", "Subject": "Maths", "Class": "4"},
                    {"Syllabus": "1009420", "Subject": "Maths", "Class": "5"},
                    {"Syllabus": "1012357", "Subject": "Science", "Class": "2"},
                    {"Syllabus": "1012355", "Subject": "Science", "Class": "1"},
                    {"Syllabus": "1010604", "Subject": "Science", "Class": "5"},
                    {"Syllabus": "1010603", "Subject": "Science", "Class": "4"},
                    {"Syllabus": "1010602", "Subject": "Science", "Class": "3"},
                    {"Syllabus": "1012358", "Subject": "Social_Studies", "Class": "2"},
                    {"Syllabus": "1012356", "Subject": "Social_Studies", "Class": "1"},
                    {"Syllabus": "1010607", "Subject": "Social_Studies", "Class": "5"},
                    {"Syllabus": "1010606", "Subject": "Social_Studies", "Class": "4"},
                    {"Syllabus": "1010605", "Subject": "Social_Studies", "Class": "3"},
                    {"Syllabus": "1010600", "Subject": "EVS", "Class": "4"},
                    {"Syllabus": "1010599", "Subject": "EVS", "Class": "3"},
                    {"Syllabus": "1010598", "Subject": "EVS", "Class": "2"},
                    {"Syllabus": "1010597", "Subject": "EVS", "Class": "1"},
                    {"Syllabus": "1010601", "Subject": "EVS", "Class": "5"},
                    {"Syllabus": "1010843", "Subject": "Hindi", "Class": "5"},
                    {"Syllabus": "1010841", "Subject": "Hindi", "Class": "3"},
                    {"Syllabus": "1010842", "Subject": "Hindi", "Class": "4"},
                    {"Syllabus": "1010839", "Subject": "Hindi", "Class": "1"},
                    {"Syllabus": "1010840", "Subject": "Hindi", "Class": "2"},
                    {"Syllabus": "1012408", "Subject": "Hindi", "Class": "6"},
                    {"Syllabus": "1012410", "Subject": "Hindi", "Class": "8"},
                    {"Syllabus": "1012409", "Subject": "Hindi", "Class": "7"},
                    {"Syllabus": "1010869", "Subject": "Hindi", "Class": "UKG"},
                    {"Syllabus": "1010868", "Subject": "Hindi", "Class": "LKG"}
                ];
    this.classNames = ['Grade1', 'Grade2', 'Grade3', 'Grade4', 'Grade5', 'Grade6', 'Grade7', 'Grade8'];
    this.subjects = ["Hindi", "EVS", "Social-Studies", "Science", "Maths", "English", "Sanskrit"];
}]);