angular.module('NerdService', []).service('Nerd', ['$http', function($http) {

     this.serverUrl = "192.168.10.40:8080";
	this.imageid;
	this.printImageId = function(){
		console.log("From Service" + this.imageid);
	}

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
    this.subjects = ["Hindi", "EVS", "Social_Studies", "Science", "Maths", "English", "Sanskrit"];
}]);