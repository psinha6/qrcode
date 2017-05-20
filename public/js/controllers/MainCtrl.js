angular.module('MainCtrl', []).controller('MainController', function($scope, $http, Nerd, $location) {

	$("#qrgenerator").css("display", "none");
    $("#container").css("display", "none");
	$scope.qrCode;
	$scope.isQRGenerated = false;
	$scope.classNames = ['1', '2', '3', '4', '5', '6', '7', '8'];
    $scope.booktypes = Nerd.booktypes;

    Nerd.isConnected();
    

    $scope.uploadJsondataToGenerateQR = function(){
        try {
            var o = JSON.parse($scope.jsonData);
            if (o && typeof o === "object") {
                console.log("Valid JSON format");
                $scope.counter = 0;
                $scope.total = o.length;
                $scope.failCounter = 0;
                for(var i = 0; i < o.length; i++){
                    console.log( o[i].bookType);
                    console.log( o[i].class);
                    console.log( o[i].subject);
                    console.log( o[i].chNo);
                    o[i].chapterName = o[i].chapterName.split("'").join("\'");
                    console.log( o[i].chapterName);

                    console.log( o[i].description);
                    $scope.generalText = "";

                    if(!o[i].bookType){
                        $scope.generalText += "bookType "
                    }
                    if(!o[i].class){
                        $scope.generalText += "class "
                    }
                    if(!o[i].subject){
                        $scope.generalText += "subject "
                    }
                    if(!o[i].chNo){
                        $scope.generalText += "chNo "
                    }
                    if(!o[i].chapterName){
                        $scope.generalText += "chapterName "
                    }
                    if(!o[i].description){
                        $scope.generalText += "description "
                    }
                    if($scope.generalText){
                        $scope.generalText = "Incorrect " + $scope.generalText
                        return;
                    }
                    $scope.genBulkQR(o[i])
                }
            }
        }
        catch (e) {
            console.log("NOT a valid JSON format " + e);
        }
        return false;
    }

    $scope.genBulkQR = function(qrObject){

        var title = 'Grade' + qrObject.class + '-' + qrObject.subject + '-ChNo' + qrObject.chNo;
        $http({
              method: 'POST',
              url: Nerd.serverUrl + '/addToDatabase',
              data: {image_title: title, 
                    image_description: qrObject.description, 
                    class_name: qrObject.class,
                    subject_name: qrObject.subject, // SubjectName
                    chapter_no: qrObject.chNo,
                    chapter_name: qrObject.chapterName,
                    book_name: qrObject.bookType
                }
            }).then(function successCallback(response) {
            console.log("Image saved successfully :: " + JSON.stringify(response.data));
            var image_id = response.data[0].image_id;
            var image_title = response.data[0].image_title;
            var url = "www.nextcurriculum.in/app/qrcode/" + image_id;
            console.log("URL::" + url);
            $('#text').val(url);
            //$('#label').val($scope.pageNo);
            //update();
            var options = {
                "render":"image",
                "crisp":true,
                "ecLevel":"H",
                "minVersion":1,
                "fill":"#333333",
                "back":"#ffffff",
                "text":url,
                "size":43,
                "rounded":70,
                "quiet":2,
                "mode":"label",
                "mSize":30,
                "mPosX":50,
                "mPosY":50,
                "label":"",
                "fontname":"Ubuntu",
                "fontcolor":"#ff9818",
                "image":{}
            };
            console.log(JSON.stringify(options));
            var container = elById('container');
            var qrcode = kjua(options);
            src = qrcode.src;

            $http({
              method: 'POST',
              url: Nerd.serverUrl + '/saveImage',
              data: {image: src, image_id: image_id, image_title : image_title}
            }).then(function successCallback(response) {
                console.log("Image saved successfully :: " + JSON.stringify(response));
                $scope.counter++;
                console.log("Saved counter "  + $scope.counter);
                if($scope.counter == $scope.total){
                    $scope.generalText = "Successfully uploaded " + $scope.counter + ".";
                }
                /*$scope.title = "";*/
              }, function errorCallback(response) {
                console.log("Error could not save image::" + JSON.stringify(response));
                $scope.generalText = "Error";
                $scope.failCounter++;
              });
            }, function errorCallback(response) {
               console.log("Error could not save image::" + JSON.stringify(response));
               $scope.failCounter++;
               if(response.data.data.code == "ER_DUP_ENTRY"){
                    $scope.generalText = "Image not saved. Image with same name is already generated" ; 
               } else {
                    $scope.generalText = "Image not saved";
               }
            });
    }
	

    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
        console.log(event.target.result);
        try {
            var o = JSON.parse(event.target.result);
            if (o && typeof o === "object") {
                console.log("Valid JSON format");
                $scope.counter = 0;
                $scope.total = o.length;
                $scope.failCounter = 0;
                for(var i = 0; i < o.length; i++){
                    console.log( o[i].bookType);
                    console.log( o[i].class);
                    console.log( o[i].subject);
                    console.log( o[i].chNo);
                    //o[i].chapterName = o[i].chapterName.split("'").join("\'");
                    console.log( o[i].chapterName);

                    console.log( o[i].description);
                    $scope.generalText = "";

                    if(!o[i].bookType){
                        $scope.generalText += "bookType "
                    }
                    if(!o[i].class){
                        $scope.generalText += "class "
                    }
                    if(!o[i].subject){
                        $scope.generalText += "subject "
                    }
                    if(!o[i].chNo){
                        $scope.generalText += "chNo "
                    }
                    if(!o[i].chapterName){
                        $scope.generalText += "chapterName "
                    }
                    if(!o[i].description){
                        $scope.generalText += "description "
                    }
                    if($scope.generalText){
                        $scope.generalText = "Incorrect " + $scope.generalText
                        return;
                    }
                    $scope.genBulkQR(o[i])
                }
            }
        }
        catch (e) {
            console.log("NOT a valid JSON format " + e);
        }
    }
 
    document.getElementById('file').addEventListener('change', onChange);

	$scope.generateQRCode = function(){
        // +++++++++++++++++++++++++++++++++ Validations begin +++++++++++++++++++++++++++++++++//
        var error = "Please enter"
        if(!$scope.className){
            error += " class name";
        }
        if(!$scope.syllabusNo){
            error += " subject name";
        }
        /*if(!$scope.pageNo){
            error += " page number";
        }*/
        if(!$scope.chapterNo){
            error += " chapter number";
        }
        
        if(!$scope.chapterName){
            error += " chapter name";
        }
        
        if(!$scope.description){
            error += " description";
        }
        if(error.length > 12){
            console.log(error);
            alert(error);
            return;
        }
        $scope.chapterName = $scope.chapterName.split("'").join("\\'");
        $scope.chapterName = $scope.chapterName.split("\"").join("\\\"");
        $scope.description = $scope.description.split("'").join("\\'");
        $scope.description = $scope.description.split("\"").join("\\\"");
        // +++++++++++++++++++++++++++++++++ Validations ends +++++++++++++++++++++++++++++++++//
        if(!$scope.isQRGenerated == true){
            $scope.imageid;
		    $scope.title = 'Grade' + $scope.className + '-' + $scope.syllabusNo + '-ChNo' + $scope.chapterNo;
		    $http({
              method: 'POST',
              url: Nerd.serverUrl + '/addToDatabase',
              data: {image_title: $scope.title, 
                    image_description: $scope.description, 
                    /*image_pgno : $scope.pageNo,*/
                    class_name: $scope.className,
                    subject_name: $scope.syllabusNo, // SubjectName
                    chapter_no: $scope.chapterNo,
                    chapter_name: $scope.chapterName,
                    book_name: $scope.booktype
                }
            }).then(function successCallback(response) {
	        console.log("Image saved successfully :: " + JSON.stringify(response.data));
            $scope.imageid = response.data[0].image_id;
            $scope.title = response.data[0].image_title;
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
        $scope.pageNo = "";
        $scope.description = "";
        $scope.booktype = "";
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
            $scope.isQRGenerated = false;
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
        console.log(JSON.stringify(options));
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
});