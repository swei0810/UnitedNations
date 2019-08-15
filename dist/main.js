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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// // Expenditure by agency \n// d3.csv(\"./src/assets/expenditure_by_agency.csv\", function(d) {\n//     return {\n//         agency: d[\"Agency description\"], \n//         year: +d.Year, \n//         exp: +d[\"Expenditure\"].split(\",\").join(\"\")\n//     }\n// }).then(function(data) {\n//     console.log(data)\n// })\n\n// // Expenditure by category \n// data = d3.csv(\"./src/assets/expenditure_category.csv\", function(d) {\n//     return {\n//         year: +d.Year, \n//         exp: +d[\"Expenditure\"].split(\",\").join(\"\"), \n//         category: d[\"Expense Category\"]\n//     }\n// }).then(function(data) {\n//     console.log(data)\n// })\n\n\n\n\n\n\n// Donation by countries \nd3.csv(\"./src/assets/country_donation.csv\", function(d) {\n      return {\n          country: d.Donor, \n          year: +d[\"Calendar year\"], \n          donation: +d[\"Math expression\"].split(\",\").join(\"\")\n      }; \n      \n  }).then(function(data) {\n    const margin = 60;\n    const width = 1000 - 2 * margin;\n    const height = 600 - 2 * margin;\n\n    const svg = d3.select('svg');\n    const chart = svg.append('g')\n         .attr('transform', 'translate(60, 60)');\n\n    const yScale = d3.scaleLinear()\n    .range([height, 0])\n    .domain([0, 100]);\n\n    chart.append('g')\n    .call(d3.axisLeft(yScale));\n\n\n    const xScale = d3.scaleBand()\n    .range([0, width])\n    .domain(data.map(function(d) { return d.country; }))\n    .padding(0.2)\n\n    chart.append('g')\n    .attr('transform', `translate(0, ${height})`)\n    .call(d3.axisBottom(xScale));\n\n\n  })\n  \n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });