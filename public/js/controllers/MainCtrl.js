angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$("#qrgenerator").css("display", "block");
	$scope.qrCode;
	$scope.isQRGenerated = false;
	$scope.classNames = ['1', '2', '3', '4', '5', '6', '7', '8'];

	//$scope.tagline = 'To the moon and back!';
	$scope.generateQRCode = function(){
		var error;
		/*if(!$scope.syllabusNo){
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
		var url = "www.nextcurriculum.in/app/qrcode/";
		console.log("URL::" + url);
		$('#text').val(url);
		
		update();
		$scope.isQRGenerated = true;
		*/
        if(!$scope.isQRGenerated == true){
            $scope.imageid;
		    var title = 'Grade' + $scope.className + 'syllabusNo' + $scope.syllabusNo + 'pageno' + $scope.pageNo;
		    $http({
              method: 'POST',
              url: '/addToDatabase',
              data: {image_title: title, image_description: $scope.description, image_pgno : $scope.pageNo}
            }).then(function successCallback(response) {
	        console.log("Image saved successfully :: " + JSON.stringify(response.data));
            $scope.imageid = response.data[0].image_id;
            var url = "www.nextcurriculum.in/app/qrcode/" + $scope.imageid;
            console.log("URL::" + url);
            $('#text').val(url);
            $('#label').val($scope.pageNo);
            update();
            $scope.isQRGenerated = true;
	        }, function errorCallback(response) {
	           console.log("Error could not save image::" + JSON.stringify(response));
	        });
        } else {
            update();
        }
	}

    $scope.clear = function(){
        $scope.isQRGenerated = false;
        location.reload();
    }
	$scope.download = function(){
        var src;
		$('img.downloadable').each(function(){
			var $this = $(this);
            src = $this[0].src;
			console.log($this[0].src);
		});

        $http({
          method: 'POST',
          url: '/saveImage',
          data: {image: src, image_id: $scope.imageid}
        }).then(function successCallback(response) {
            console.log("Image saved successfully :: " + JSON.stringify(response));
          }, function errorCallback(response) {
            console.log("Error could not save image::" + JSON.stringify(response));
          });
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
});