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

eval("const BOARD_WIDTH = 800,\n   BOARD_HEIGHT = 500,\n   CELL_WIDTH = 25,\n   CELL_HEIGHT = 25\n\nconst COLORS = {\n   RED: '#000000',\n   GREEN: '#00CC00',\n   BLUE: '#0000FF'\n}\n\nconst KEYS = {\n   UP: 'UP',\n   DOWN: 'DOWN',\n   RIGHT: 'RIGHT',\n   LEFT: 'LEFT'\n}\n\nconst KEY_CODES = {\n   37: KEYS.LEFT,\n   38: KEYS.UP,\n   39: KEYS.RIGHT,\n   40: KEYS.DOWN\n}\n\nconst KEY_WALK_MAP = {\n   UP: [0, -1],\n   DOWN: [0, 1],\n   RIGHT: [1, 0],\n   LEFT: [-1, 0],\n};\n\nconst isOutOfBounds = ([x, y]) =>  (x < 0 || x >= BOARD_WIDTH / CELL_WIDTH) || (y < 0 || y >= BOARD_HEIGHT / CELL_HEIGHT);\n\nclass Game {\n   constructor() {\n      const canvas = this.getCanvas();\n\n      if (!canvas) throw new Error('failed to get canvas context');\n\n      this.game = null;\n      this.canvas = canvas;\n\n\n      this.listenForKeypress();\n\n      this.startGame();\n   }\n\n   startGame() {\n      this.snake = new Snake();\n      this.apple = this.createApple(this.snake);\n      this.direction = KEY_WALK_MAP['UP'];\n   }\n\n   getCanvas() {\n      const canvas = document.getElementById('canvas')\n      if (!canvas) throw new Error('getCanvas: no canvas element found')\n      canvas.width = BOARD_WIDTH\n      canvas.height = BOARD_HEIGHT\n      return canvas.getContext('2d')\n   }\n\n   listenForKeypress() {\n      document.addEventListener('keydown', event => {\n         if (event.keyCode in KEY_CODES) this.onKeyPress(KEY_CODES[event.keyCode])\n      })\n   }\n\n   clearGrid() {\n      this.canvas.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)\n   }\n\n   fillGrid(color) {\n      const cv = this.canvas\n\n      cv.beginPath()\n      cv.rect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)\n      cv.fillStyle = color\n      cv.fill()\n   }\n\n   fillCell(x, y, color) {\n      const cv = this.canvas\n\n      if (x < 0 || x >= BOARD_WIDTH) throw new Error('fillCell: x out of bounds')\n      if (y < 0 || y >= BOARD_HEIGHT) throw new Error('fillCell: y out of bounds')\n\n      cv.beginPath()\n      cv.rect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT)\n      cv.fillStyle = color\n      cv.fill()\n   }\n\n   onKeyPress(key) {\n      this.direction = KEY_WALK_MAP[key];\n   }\n\n   createApple() {\n      const maxX = BOARD_WIDTH / CELL_WIDTH - 1;\n      const maxY = BOARD_HEIGHT / CELL_HEIGHT - 1;\n\n      const generateNumber = (max) => Math.floor(Math.random() * max) + 1;\n      let apple;\n      do {\n         // TODO: check if this is working\n        apple = [generateNumber(maxX), generateNumber(maxY)];\n      } while (this.snake.cells.includes(apple))\n      return apple;\n   }\n\n   step() {\n      const nextStep = this.snake.getNextStep(this.direction);\n\n      if (this.snake.cells.some(cell => (cell[0] === nextStep[0] && cell[1] === nextStep[1])) || isOutOfBounds(nextStep)) {\n         return true;\n      }\n\n      this.snake.walk(nextStep);\n\n      if (this.snake.head[0] === this.apple[0] && this.snake.head[1] === this.apple[1]) {\n         this.snake.grow();\n         this.apple = this.createApple(this.snake);\n      }\n\n      g.clearGrid();\n\n      const image = new Image(CELL_WIDTH, CELL_HEIGHT);\n      image.src = './images/apple.png';\n      this.getCanvas().drawImage(image, this.apple[0] * CELL_WIDTH, this.apple[1] * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT)\n\n      this.snake.cells.map(cell => {\n         try {\n            g.fillCell(cell[0], cell[1], COLORS.RED)\n         } catch(e) {\n            return true;\n         }\n      });\n\n      return false;\n   }\n\n   initGame() {\n      this.startGame();\n      this.game = setInterval(() => {\n         const gameFinished = this.step();\n\n         if (gameFinished) {\n            this.stopGame();\n            const ctx = this.getCanvas();\n            ctx.font = \"30px Arial\";\n            ctx.textAlign = \"center\";\n            ctx.fillStyle = \"red\";\n            ctx.fillText('Game Over', this.canvas.canvas.width/2, this.canvas.canvas.height/2);\n         }\n      }, 200);\n   }\n\n   stopGame() {\n      clearInterval(this.game);\n   }\n\n   restartGame() {\n      this.stopGame();\n      this.initGame();\n   }\n}\n\nclass Snake {\n   constructor() {\n      this.length = 1;\n      this.cells = [[0, 19]];\n   }\n\n   get head() {\n      return this.cells[this.cells.length - 1];\n   }\n\n   getNextStep(direction) {\n      const coordenates = this.cells[this.cells.length - 1];\n      const newX = coordenates[0] + direction[0];\n      const newY = coordenates[1] + direction[1];\n      return [newX, newY];\n   }\n\n   walk(nextStep) {\n      this.cells.push(nextStep);\n      if (this.cells.length >= this.length) {\n         this.cells.shift();\n      }\n   }\n\n   grow() {\n      this.cells.unshift(this.cells[0]);\n   }\n};\n\nconst g = new Game();\n\ng.initGame();\n\ndocument.querySelector('button').addEventListener('click', () => {\n   g.stopGame();\n   g.initGame();\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });