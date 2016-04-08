/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	//var scp = require('scp2');


	function transition() {
	}

	window.onload = function () {
	    var vid = $("#bgvid");
	    var txt = $("#text_layer");

	    $("#bgbtn").on("click", function (e) {
	        $('#bgvid source').attr('src', "../bg/video/bright.mp4");

	        vid.addClass('animated fadeOut');
	        vid.one('animationend', function () {
	          
	            vid[0].load();
	            txt.text('We Worship you Hallelujah Hallejujah');
	            
	            vid.removeClass('fadeOut');
	            vid.addClass('fadeIn');
	            
	        });

	    });

	    //var client = new scp({
	    //    port: 22,
	    //    host: 'git.esific.com',
	    //    username: 'root',
	    //    //privateKey: '....',
	    //    password: 'Techlord12345'
	    //});
	    //
	    //client.download("root@git.esific.com", "/projects/downloaded.txt", function (err) {
	    //    if(err){
	    //        console.log(err);
	    //    }
	    //    else{
	    //        console.log("Successfully downloaded!");
	    //    }
	    //});

	};


/***/ }
/******/ ]);