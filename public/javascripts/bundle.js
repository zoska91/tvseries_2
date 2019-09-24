/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/javascripts/profile/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/scroll-js/dist/scroll.js":
/*!***********************************************!*\
  !*** ./node_modules/scroll-js/dist/scroll.js ***!
  \***********************************************/
/*! exports provided: easingMap, scrollIntoView, scrollTo, utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easingMap\", function() { return easingMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scrollIntoView\", function() { return scrollIntoView; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scrollTo\", function() { return scrollTo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"utils\", function() { return utils; });\nasync function scrollTo(el, options = {}) {\r\n    if (!(el instanceof Element) && !(el instanceof Window)) {\r\n        throw new Error(`element passed to scrollTo() must be either the window or a DOM element, you passed ${el}!`);\r\n    }\r\n    options = sanitizeScrollOptions(options);\r\n    const scroll = (from, to, prop, startTime, duration = 300, easeFunc, callback) => {\r\n        window.requestAnimationFrame(() => {\r\n            const currentTime = Date.now();\r\n            const time = Math.min(1, (currentTime - startTime) / duration);\r\n            if (from === to) {\r\n                return callback ? callback() : null;\r\n            }\r\n            setScrollPosition(el, easeFunc(time) * (to - from) + from);\r\n            /* prevent scrolling, if already there, or at end */\r\n            if (time < 1) {\r\n                scroll(from, to, prop, startTime, duration, easeFunc, callback);\r\n            }\r\n            else if (callback) {\r\n                callback();\r\n            }\r\n        });\r\n    };\r\n    const currentScrollPosition = getScrollPosition(el);\r\n    const scrollProperty = getScrollPropertyByElement(el);\r\n    return new Promise(resolve => {\r\n        scroll(currentScrollPosition, typeof options.top === 'number'\r\n            ? options.top\r\n            : currentScrollPosition, scrollProperty, Date.now(), options.duration, getEasing(options.easing), resolve);\r\n    });\r\n}\r\nfunction scrollIntoView(element, scroller, options) {\r\n    validateElement(element);\r\n    if (scroller && !(scroller instanceof Element)) {\r\n        options = scroller;\r\n        scroller = undefined;\r\n    }\r\n    const { duration, easing } = sanitizeScrollOptions(options);\r\n    scroller = scroller || utils.getDocument().body;\r\n    let currentContainerScrollYPos = 0;\r\n    let elementScrollYPos = element ? element.offsetTop : 0;\r\n    const document = utils.getDocument();\r\n    // if the container is the document body or document itself, we'll\r\n    // need a different set of coordinates for accuracy\r\n    if (scroller === document.body || scroller === document.documentElement) {\r\n        // using pageYOffset for cross-browser compatibility\r\n        currentContainerScrollYPos = window.pageYOffset;\r\n        // must add containers scroll y position to ensure an absolute value that does not change\r\n        elementScrollYPos =\r\n            element.getBoundingClientRect().top + currentContainerScrollYPos;\r\n    }\r\n    return scrollTo(scroller, {\r\n        top: elementScrollYPos,\r\n        left: 0,\r\n        duration,\r\n        easing\r\n    });\r\n}\r\nfunction validateElement(element) {\r\n    if (element === undefined) {\r\n        const errorMsg = 'The element passed to scrollIntoView() was undefined.';\r\n        throw new Error(errorMsg);\r\n    }\r\n    if (!(element instanceof HTMLElement)) {\r\n        throw new Error(`The element passed to scrollIntoView() must be a valid element. You passed ${element}.`);\r\n    }\r\n}\r\nfunction getScrollPropertyByElement(el) {\r\n    const props = {\r\n        window: {\r\n            y: 'scrollY',\r\n            x: 'scrollX'\r\n        },\r\n        element: {\r\n            y: 'scrollTop',\r\n            x: 'scrollLeft'\r\n        }\r\n    };\r\n    const axis = 'y';\r\n    if (el instanceof Window) {\r\n        return props.window[axis];\r\n    }\r\n    else {\r\n        return props.element[axis];\r\n    }\r\n}\r\nfunction sanitizeScrollOptions(options = {}) {\r\n    if (options.behavior === 'smooth') {\r\n        options.easing = 'ease-in-out';\r\n        options.duration = 300;\r\n    }\r\n    if (options.behavior === 'auto') {\r\n        options.duration = 0;\r\n        options.easing = 'linear';\r\n    }\r\n    return options;\r\n}\r\nfunction getScrollPosition(el) {\r\n    const document = utils.getDocument();\r\n    if (el === document.body ||\r\n        el === document.documentElement ||\r\n        el instanceof Window) {\r\n        return document.body.scrollTop || document.documentElement.scrollTop;\r\n    }\r\n    else {\r\n        return el.scrollTop;\r\n    }\r\n}\r\nfunction setScrollPosition(el, value) {\r\n    const document = utils.getDocument();\r\n    if (el === document.body ||\r\n        el === document.documentElement ||\r\n        el instanceof Window) {\r\n        document.body.scrollTop = value;\r\n        document.documentElement.scrollTop = value;\r\n    }\r\n    else {\r\n        el.scrollTop = value;\r\n    }\r\n}\r\nconst utils = {\r\n    // we're really just exporting this so that tests can mock the document.documentElement\r\n    getDocument() {\r\n        return document;\r\n    }\r\n};\r\nconst easingMap = {\r\n    linear(t) {\r\n        return t;\r\n    },\r\n    'ease-in'(t) {\r\n        return t * t;\r\n    },\r\n    'ease-out'(t) {\r\n        return t * (2 - t);\r\n    },\r\n    'ease-in-out'(t) {\r\n        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;\r\n    }\r\n};\r\nconst getEasing = (easing) => {\r\n    const defaultEasing = 'linear';\r\n    const easeFunc = easingMap[easing || defaultEasing];\r\n    if (!easeFunc) {\r\n        const options = Object.keys(easingMap).join(',');\r\n        throw new Error(`Scroll error: scroller does not support an easing option of \"${easing}\". Supported options are ${options}`);\r\n    }\r\n    return easeFunc;\r\n};\n\n\n\n\n//# sourceURL=webpack:///./node_modules/scroll-js/dist/scroll.js?");

/***/ }),

/***/ "./public/javascripts/profile/DescriptionTvSeries.js":
/*!***********************************************************!*\
  !*** ./public/javascripts/profile/DescriptionTvSeries.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Element = __webpack_require__(/*! ./Element */ \"./public/javascripts/profile/Element.js\");\r\nconst { scrollTo } = __webpack_require__(/*! scroll-js */ \"./node_modules/scroll-js/dist/scroll.js\");\r\n\r\nclass DescriptionTvSeries {\r\n  constructor(id) {\r\n    this.id = id;\r\n    this.URL_id = 'http://api.tvmaze.com/shows/';\r\n\r\n    this.containerResult = document.querySelector('.searchSeries__container-result');\r\n\r\n    this.heightWindow = window.innerHeight;\r\n\r\n    //stworzenie kontenera\r\n    this.descriptionOneTvSeries = new Element('div', this.containerResult, 'one-tv-series');\r\n    this.descriptionOneTvSeries.createElement();\r\n    this.container = document.querySelector('.one-tv-series');\r\n  }\r\n\r\n  createImg(image) {\r\n    console.log(image);\r\n    const img = new Element('img', this.container, 'one-tv-series__img-series', null, null, image);\r\n    img.createElement();\r\n  }\r\n\r\n  createButton(id) {\r\n    console.log(id);\r\n    let form = new Element('button', this.container, 'searchSeries__btn-add-to-favorites', 'Add to my favorites');\r\n    form.createElement();\r\n\r\n    // fetch(`profile/add/${id}`, {\r\n    //   method: 'POST'\r\n    // })\r\n\r\n    // w quizie - przełanie odp z buttona\r\n  }\r\n\r\n  createTitle(name) {\r\n    const title = new Element('h2', this.container, 'one-tv-series__title-series', name);\r\n    title.createElement();\r\n  }\r\n\r\n  createEpisodes(next) {\r\n    //nastepny odcinek\r\n\r\n    fetch(next)\r\n      .then(resp => resp.json())\r\n      .then(next => {\r\n        const text = `Next episode: S${next.season} E${next.number} - title: ${next.name}. Date: ${next.airdate}`;\r\n\r\n        const nextInfo = new Element('p', this.container, 'one-tv-series__next', text);\r\n        nextInfo.createElement();\r\n      });\r\n  }\r\n\r\n  createInfo(text) {\r\n    const info = new Element('p', this.container, 'one-tv-series__info-series', text);\r\n    info.createElement();\r\n  }\r\n\r\n  createDescription() {\r\n    this.container.innerHTML = '';\r\n\r\n    fetch(`${this.URL_id}${this.id}`)\r\n      .then(resp => resp.json())\r\n      .then(resp => {\r\n        console.log(resp);\r\n\r\n        this.createImg(resp.image.medium);\r\n        this.createButton(this.id);\r\n        this.createTitle(resp.name);\r\n        this.createInfo(resp.summary);\r\n\r\n        if (resp._links.nextepisode) {\r\n          this.createEpisodes(resp._links.nextepisode.href);\r\n        } else {\r\n          const nextInfo = new Element(\r\n            'p',\r\n            this.container,\r\n            'one-tv-series__next',\r\n            'There are no plans for the next episode'\r\n          );\r\n          nextInfo.createElement();\r\n        }\r\n      });\r\n\r\n    scrollTo(document.body, { top: this.heightWindow });\r\n  }\r\n}\r\n\r\nmodule.exports = DescriptionTvSeries;\r\n\n\n//# sourceURL=webpack:///./public/javascripts/profile/DescriptionTvSeries.js?");

/***/ }),

/***/ "./public/javascripts/profile/Element.js":
/*!***********************************************!*\
  !*** ./public/javascripts/profile/Element.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Element {\r\n  constructor(element, parent, nameClass, text, id, img) {\r\n    this.element = element;\r\n    this.parent = parent;\r\n    this.nameClass = nameClass;\r\n    this.text = text;\r\n    this.id = id;\r\n    this.img = img;\r\n  }\r\n\r\n  createElement() {\r\n    const el = document.createElement(this.element);\r\n    el.classList.add(this.nameClass);\r\n    if (this.id) el.setAttribute('date-id', this.id);\r\n    if (this.img) el.setAttribute('src', this.img);\r\n    if (this.text) el.innerHTML = this.text;\r\n\r\n    this.parent.appendChild(el);\r\n  }\r\n}\r\n\r\nmodule.exports = Element;\r\n\n\n//# sourceURL=webpack:///./public/javascripts/profile/Element.js?");

/***/ }),

/***/ "./public/javascripts/profile/SearchTvSeries.js":
/*!******************************************************!*\
  !*** ./public/javascripts/profile/SearchTvSeries.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DescriptionTvSeries = __webpack_require__(/*! ./DescriptionTvSeries */ \"./public/javascripts/profile/DescriptionTvSeries.js\");\r\nconst Element = __webpack_require__(/*! ./Element */ \"./public/javascripts/profile/Element.js\");\r\n\r\nclass SearchTvSeries {\r\n  constructor(title) {\r\n    this.URL = 'http://api.tvmaze.com/search/';\r\n    this.title = title;\r\n    this.listResult = document.querySelector('.searchSeries__list-result');\r\n    this.containerResult = document.querySelector('.searchSeries__container-result');\r\n  }\r\n\r\n  //pobiera wyniki z API\r\n  getList() {\r\n    return fetch(`${this.URL}shows?q=${this.title}`)\r\n      .then(resp => resp.json())\r\n      .then(resp => resp);\r\n  }\r\n\r\n  //pokazuje jeden wybrany serial\r\n  showPickTvSeries(id) {\r\n    const result = new DescriptionTvSeries(id);\r\n    result.createDescription();\r\n  }\r\n\r\n  //pokazuje liste szukanego tytulu\r\n  showResultSearch() {\r\n    //czyszczenie wynikow\r\n    if (this.listResult) this.listResult.innerHTML = '';\r\n\r\n    this.getList().then(resp => {\r\n      //sprawdzenie czy sa wyniki\r\n      if (resp.lenght != 0) {\r\n        console.log(resp);\r\n        //czy jest węcej niż jeden wynik\r\n        if (resp.length > 1) {\r\n          resp.forEach(element => {\r\n            const text = `${element.show.name} - ${element.show.premiered} ${\r\n              element.show.network ? '[' + element.show.network.country.code + ']' : ''\r\n            }`;\r\n\r\n            const listItem = new Element('li', this.listResult, 'searchSeries__list-item', text, element.show.id);\r\n            listItem.createElement();\r\n          });\r\n\r\n          const tvSerierToPick = [...document.querySelectorAll('.searchSeries__list-item')];\r\n\r\n          //pobiera id wybranego serialu\r\n          tvSerierToPick.forEach(el => {\r\n            el.addEventListener('click', () => {\r\n              const idTvSeries = el.getAttribute('date-id');\r\n              this.showPickTvSeries(idTvSeries);\r\n            });\r\n          });\r\n        } else {\r\n          const idTvSeries = resp[0].show.id;\r\n          this.showPickTvSeries(idTvSeries);\r\n        }\r\n      } else {\r\n        this.containerResult.textContent = \"We can't find your TV series :( Try again!\";\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\nmodule.exports = SearchTvSeries;\r\n\n\n//# sourceURL=webpack:///./public/javascripts/profile/SearchTvSeries.js?");

/***/ }),

/***/ "./public/javascripts/profile/main.js":
/*!********************************************!*\
  !*** ./public/javascripts/profile/main.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Element = __webpack_require__(/*! ./Element */ \"./public/javascripts/profile/Element.js\");\r\nconst SearchTvSeries = __webpack_require__(/*! ./SearchTvSeries */ \"./public/javascripts/profile/SearchTvSeries.js\");\r\n\r\nconst findBtn = document.querySelector('.searchSeries__button');\r\nconst findForm = document.querySelector('.searchSeries__form');\r\nconst findInput = document.querySelector('.searchSeries__input');\r\nconst searchSeries = document.querySelector('.searchSeries');\r\n\r\nfindForm.addEventListener('submit', event => {\r\n  event.preventDefault();\r\n\r\n  //pobranie szukanej wartości\r\n  const title = findInput.value;\r\n\r\n  // stworzenie nowego kontenera - jeśli jest wyczyszczenie go\r\n  if (!document.querySelector('.searchSeries__container-result')) {\r\n    const containerResult = new Element('div', searchSeries, 'searchSeries__container-result');\r\n    containerResult.createElement();\r\n  } else {\r\n    document.querySelector('.searchSeries__container-result').innerHTML = '';\r\n  }\r\n\r\n  //stowrzenie kontenera ul na liste\r\n\r\n  const containerResultParent = document.querySelector('.searchSeries__container-result');\r\n  const listResult = new Element('ul', containerResultParent, 'searchSeries__list-result');\r\n  listResult.createElement();\r\n\r\n  //pobranie wyników wyszukiwania\r\n  const titleList = new SearchTvSeries(title);\r\n  titleList.showResultSearch();\r\n\r\n  findInput.value = '';\r\n});\r\n\n\n//# sourceURL=webpack:///./public/javascripts/profile/main.js?");

/***/ })

/******/ });