 "use strict";
 var app = angular.module('myApp',['ngMaterial', 'ngMessages']);
 app.directive('fileModel', ['$parse', fileModel]);
 app.directive('uploadFile', ['$parse', uploadFile]);
 app.factory('httpService', ['$http', httpService]);
 app.controller('mainController', ['$scope', '$mdToast', 'httpService', mainController]);
 
 function fileModel($parse) {
 	return {
 		restrict: 'A',
 		link: function(scope, element, attrs) {
 			var model = $parse(attrs.fileModel);
 			var modelSetter = model.assign;

 			element.bind('change', function(){
 				var ext = element[0].files[0].name.substring(element[0].files[0].name.lastIndexOf(".") + 1);
 				ext = ext.toLowerCase();
 				if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'bmp' || ext == 'tiff') {
 					var reader = new FileReader();
 					reader.onload = function(e) {
 						scope.$apply(function(){
 							modelSetter(scope, {name: element[0].files[0].name,file: reader.result});
 						});
 						scope.$apply(attrs.callback);
 					};
 					reader.readAsDataURL(element[0].files[0]);
 				}
 			});
 		}
 	};
 }
 
 function uploadFile($parse) {
 	return {
 		restrict: 'A',
		scope: {
          uploadButton: "@"
        },
 		link: function(scope, element, attrs) {
 			element.bind('click', function(e) {
 				$('#' + scope.uploadButton).click();
 			});
 		}
 	};
 }

 function httpService($http){
 	var serviceFactory = {};
 	var last = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

        function sanitizePosition() {
            var current = serviceFactory.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }
 	var _postFile = function(item){
    		var url = 'file';
            console.log(url);
            var data = {
                values: angular.toJson(item)
            };
            console.log(data);
            var data = $http.post(url, data);
        	return data;//returns response
    	};

	var _toast = function(text) {
            $mdToast.show(
                $mdToast.simple(text)
                    .content()
                    .position(serviceFactory.getToastPosition())
                    .hideDelay(3000)
            );
        };

	serviceFactory.postFile = _postFile;
	serviceFactory.toast = _toast;
    serviceFactory.toastPosition = angular.extend({},last);
	serviceFactory.getToastPosition = function() {
	    	sanitizePosition();
			return Object.keys(serviceFactory.toastPosition)
                .filter(function(pos) { return serviceFactory.toastPosition[pos]; })
                .join(' ');
        };

 	return serviceFactory;
 }
 
 function mainController($scope, $mdToast, httpService){
	 var vm = this;
	 vm.fileForm = {text: '', file: {}, submit: function(fileForm){
		 if(angular.isUndefined(vm.fileForm.file.file)){
			 vm.fileForm.file.required = true;
		 }
		 if(!vm.fileForm.file.required && fileForm.$valid){
			 console.log("Submitted");
			 var call = httpService.postFile({text: vm.fileForm.text, file: vm.fileForm.file.file});
			 call.then(function(response){
		 		httpService.toast(response.data);
			 },function(response){
			 	httpService.toast(response.data);
			 });
		 }
	 }};
	 vm.imageForm = {text: '', file: {}, submit: function(imageForm){
		 if(angular.isUndefined(vm.imageForm.file.file)){
			 vm.imageForm.file.required = true;
		 }
		 if(!vm.imageForm.file.required && imageForm.$valid){
			 console.log("Submitted");
			 var call = httpService.postFile({text: vm.fileForm.text, file: vm.imageForm.file.file});
			 call.then(function(response){
		 		httpService.toast(response.data);
			 },function(response){
			 	httpService.toast(response.data);
			 });
		 }
	 }};
	 vm.submit = function(){
		 console.log(vm.fileForm);
	 };
	 
	 $scope.$watch('vm.fileForm.file', function(imageForm){
		vm.fileForm.file.required = false;
 	});
	 
 	$scope.$watch('vm.imageForm.file', function(imageForm){
		vm.imageForm.file.required = false;
 	});
 }