angular.module('MainCtrl', []).controller('MainController', function($scope, $http, Nerd, $location) {

	$("#qrgenerator").css("display", "none");
    $("#container").css("display", "none");
	$scope.qrCode;
	$scope.isQRGenerated = false;
	$scope.classNames = ['1', '2', '3', '4', '5', '6', '7', '8'];

	//$scope.tagline = 'To the moon and back!';
	$scope.generateQRCode = function(){
        // +++++++++++++++++++++++++++++++++ Validations begin +++++++++++++++++++++++++++++++++//
        var error = "Please enter"
        if(!$scope.className){
            error += " class name";
        }
        if(!$scope.syllabusNo){
            error += " subject name";
        }
        if(!$scope.pageNo){
            error += " page number";
        }
        if(!$scope.chapterNo){
            error += " chapter number";
        }
        if(!$scope.chapterName){
            error += " chapter name";
        }
        if(!$scope.conceptName){
            error += " concept name";
        }
        if(!$scope.description){
            error += " description";
        }
        if(error.length > 12){
            alert(error);
            return;
        }
        console.log(error);
        // +++++++++++++++++++++++++++++++++ Validations ends +++++++++++++++++++++++++++++++++//
        if(!$scope.isQRGenerated == true){
            $scope.imageid;
		    $scope.title = 'Grade' + $scope.className + '-' + $scope.syllabusNo + '-PgNo' + $scope.pageNo;
		    $http({
              method: 'POST',
              url: Nerd.serverUrl + '/addToDatabase',
              data: {image_title: $scope.title, 
                    image_description: $scope.description, 
                    image_pgno : $scope.pageNo,
                    class_name: $scope.className,
                    subject_name: $scope.syllabusNo,
                    chapter_no: $scope.chapterNo,
                    chapter_name: $scope.chapterName,
                    concept_name: $scope.conceptName
                }
            }).then(function successCallback(response) {
	        console.log("Image saved successfully :: " + JSON.stringify(response.data));
            $scope.imageid = response.data[0].image_id;
            var url = "www.nextcurriculum.in/app/qrcode/" + $scope.imageid;
            console.log("URL::" + url);
            $('#text').val(url);
            //$('#label').val($scope.pageNo);
            update();
            $scope.isQRGenerated = false;
	        }, function errorCallback(response) {
	           console.log("Error could not save image::" + JSON.stringify(response));
               if(response.data.data.code == "ER_DUP_ENTRY"){
                    $scope.generalText = "Image not saved. Image with same name is already generated" ; 
               } else {
                    $scope.generalText = "Image not saved";
               }
               
	        });
        }
        $("#container").css("display", "inline-block");
	}

    $scope.createNew = function(){
        /*if($scope.title){
            alert("Please save image");
            return;
        }*/
        $scope.isQRGenerated = false;
        $("#container").css("display", "none");
        $scope.className = "";
        $scope.syllabusNo = "";
        $scope.chapterNo = "";
        $scope.chapterName = "";
        $scope.conceptName = "";
        $scope.pageNo = "";
        $scope.description = "";
        console.log("Data clean");
    }
	$scope.download = function(){
        var src;
		$('img.downloadable').each(function(){
			var $this = $(this);
            src = $this[0].src;
			console.log($this[0].src);
		});
        console.log("title of image" + $scope.title);
        $http({
          method: 'POST',
          url: Nerd.serverUrl + '/saveImage',
          data: {image: src, image_id: $scope.imageid, image_title : $scope.title}
        }).then(function successCallback(response) {
            console.log("Image saved successfully :: " + JSON.stringify(response));
            /*$scope.title = "";*/
            $scope.createNew();
            $scope.generalText = "Image saved successfully";
          }, function errorCallback(response) {
            console.log("Error could not save image::" + JSON.stringify(response));
            $scope.generalText = "Image not saved";
          });
	}

    $scope.addMappingToImage = function(){
        console.log($scope.title);
        Nerd.imageid = $scope.title;
        Nerd.printImageId();
        $location.path( 'geeks' );
    }

    $scope.getNumber = function(){
        var result = [];
        var limit = 100;
        for(var i =1; i <=limit; i++){
            result.push(i);
        }
        return result;
    }

    $scope.getBoard = function(){
        return ["Next Curriculum", "CBSE", "ICSE"];
    }
	var win = window; // eslint-disable-line no-undef
    var FR = win.FileReader;
    var doc = win.document;
    var kjua = win.kjua;

    var guiValuePairs = [
        ['size', 'px'],
        ['minversion', ''],
        ['quiet', ' modules'],
        ['rounded', '%'],
        ['msize', '%'],
        ['mposx', '%'],
        ['mposy', '%']
    ];

    function elById(id) {
        return doc.getElementById(id);
    }

    function valById(id) {
        var el = elById(id);
        return el && el.value;
    }

    function intById(id) {
        return parseInt(valById(id), 10);
    }

    function onEvent(el, type, fn) {
        el.addEventListener(type, fn);
    }

    function onReady(fn) {
        onEvent(doc, 'DOMContentLoaded', fn);
    }

    function forEach(list, fn) {
        Array.prototype.forEach.call(list, fn);
    }

    function all(query, fn) {
        var els = doc.querySelectorAll(query);
        if (fn) {
            forEach(els, fn);
        }
        return els;
    }

    function updateGui() {
        guiValuePairs.forEach(function (pair) {
            var label = all('label[for="' + pair[0] + '"]')[0];
            var text = label.innerHTML;
            label.innerHTML = text.replace(/:.*$/, ': ' + valById(pair[0]) + pair[1]);
        });
    }

    function updateQrCode() {
        var options = {
            render: valById('render'),
            crisp: valById('crisp') === 'true',
            ecLevel: valById('eclevel'),
            minVersion: intById('minversion'),

            fill: valById('fill'),
            back: valById('back'),

            text: valById('text'),
            size: intById('size'),
            rounded: intById('rounded'),
            quiet: intById('quiet'),

            mode: valById('mode'),

            mSize: intById('msize'),
            mPosX: intById('mposx'),
            mPosY: intById('mposy'),

            label: valById('label'),
            fontname: valById('font'),
            fontcolor: valById('fontcolor'),

            image: elById('img-buffer')
        };

        var container = elById('container');
        var qrcode = kjua(options);
        qrcode.setAttribute("class", "downloadable");
        forEach(container.childNodes, function (child) {
            container.removeChild(child);
        });
        if (qrcode) {
            container.appendChild(qrcode);
        }
        $('img.downloadable').each(function(){
    		var $this = $(this);
    		$this.wrap('<a href="' + $this.attr('src') + '" download />')
	    });

        $scope.download();
    }

    function update() {
        updateGui();
        updateQrCode();
    }

    function onImageInput() {
        var input = elById('image');
        if (input.files && input.files[0]) {
            var reader = new FR();
            reader.onload = function (ev) {
                elById('img-buffer').setAttribute('src', ev.target.result);
                elById('mode').value = 4;
                setTimeout(update, 250);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    onReady(function () {
        onEvent(elById('image'), 'change', onImageInput);
        all('input, textarea, select', function (el) {
            onEvent(el, 'input', update);
            onEvent(el, 'change', update);
        });
        onEvent(win, 'load', update);
        update();
    });

    var jsdata = [
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

    Nerd.subjects = ["Hindi", "EVS", "Social_Studies", "Science", "Maths", "English", "Sanskrit"];
});