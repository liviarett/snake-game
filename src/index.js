const BOARD_WIDTH = 800,
   BOARD_HEIGHT = 500,
   CELL_WIDTH = 25,
   CELL_HEIGHT = 25

const COLORS = {
   RED: '#000000',
   GREEN: '#00CC00',
   BLUE: '#0000FF'
}

const KEYS = {
   UP: 'UP',
   DOWN: 'DOWN',
   RIGHT: 'RIGHT',
   LEFT: 'LEFT'
}

const KEY_CODES = {
   37: KEYS.LEFT,
   38: KEYS.UP,
   39: KEYS.RIGHT,
   40: KEYS.DOWN
}

const KEY_WALK_MAP = {
   UP: [0, -1],
   DOWN: [0, 1],
   RIGHT: [1, 0],
   LEFT: [-1, 0],
};

const isOutOfBounds = ([x, y]) =>  (x < 0 || x >= BOARD_WIDTH / CELL_WIDTH) || (y < 0 || y >= BOARD_HEIGHT / CELL_HEIGHT);

class Game {
   constructor() {
      const canvas = this.getCanvas();

      if (!canvas) throw new Error('failed to get canvas context');

      this.game = null;
      this.canvas = canvas;


      this.listenForKeypress();

      this.startGame();
   }

   startGame() {
      this.snake = new Snake();
      this.apple = this.createApple(this.snake);
      this.direction = KEY_WALK_MAP['UP'];
   }

   getCanvas() {
      const canvas = document.getElementById('canvas')
      if (!canvas) throw new Error('getCanvas: no canvas element found')
      canvas.width = BOARD_WIDTH
      canvas.height = BOARD_HEIGHT
      return canvas.getContext('2d')
   }

   listenForKeypress() {
      document.addEventListener('keydown', event => {
         if (event.keyCode in KEY_CODES) this.onKeyPress(KEY_CODES[event.keyCode])
      })
   }

   clearGrid() {
      this.canvas.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)
   }

   fillGrid(color) {
      const cv = this.canvas

      cv.beginPath()
      cv.rect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)
      cv.fillStyle = color
      cv.fill()
   }

   fillCell(x, y, color) {
      const cv = this.canvas

      if (x < 0 || x >= BOARD_WIDTH) throw new Error('fillCell: x out of bounds')
      if (y < 0 || y >= BOARD_HEIGHT) throw new Error('fillCell: y out of bounds')

      cv.beginPath()
      cv.rect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT)
      cv.fillStyle = color
      cv.fill()
   }

   onKeyPress(key) {
      this.direction = KEY_WALK_MAP[key];
   }

   createApple() {
      const maxX = BOARD_WIDTH / CELL_WIDTH - 1;
      const maxY = BOARD_HEIGHT / CELL_HEIGHT - 1;

      const generateNumber = (max) => Math.floor(Math.random() * max) + 1;
      let apple;
      do {
         // TODO: check if this is working
        apple = [generateNumber(maxX), generateNumber(maxY)];
      } while (this.snake.cells.includes(apple))
      return apple;
   }

   step() {
      const nextStep = this.snake.getNextStep(this.direction);

      if (this.snake.cells.some(cell => (cell[0] === nextStep[0] && cell[1] === nextStep[1])) || isOutOfBounds(nextStep)) {
         return true;
      }

      this.snake.walk(nextStep);

      if (this.snake.head[0] === this.apple[0] && this.snake.head[1] === this.apple[1]) {
         this.snake.grow();
         this.apple = this.createApple(this.snake);
      }

      g.clearGrid();

      const image = new Image(CELL_WIDTH, CELL_HEIGHT);
      image.src = './images/apple.png';
      this.getCanvas().drawImage(image, this.apple[0] * CELL_WIDTH, this.apple[1] * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT)

      this.snake.cells.map(cell => {
         try {
            g.fillCell(cell[0], cell[1], COLORS.RED)
         } catch(e) {
            return true;
         }
      });

      return false;
   }

   initGame() {
      this.startGame();
      this.game = setInterval(() => {
         const gameFinished = this.step();

         if (gameFinished) {
            this.stopGame();
            const ctx = this.getCanvas();
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "red";
            ctx.fillText('Game Over', this.canvas.canvas.width/2, this.canvas.canvas.height/2);
         }
      }, 200);
   }

   stopGame() {
      clearInterval(this.game);
   }

   restartGame() {
      this.stopGame();
      this.initGame();
   }
}

class Snake {
   constructor() {
      this.length = 1;
      this.cells = [[0, 19]];
   }

   get head() {
      return this.cells[this.cells.length - 1];
   }

   getNextStep(direction) {
      const coordenates = this.cells[this.cells.length - 1];
      const newX = coordenates[0] + direction[0];
      const newY = coordenates[1] + direction[1];
      return [newX, newY];
   }

   walk(nextStep) {
      this.cells.push(nextStep);
      if (this.cells.length >= this.length) {
         this.cells.shift();
      }
   }

   grow() {
      this.cells.unshift(this.cells[0]);
   }
};

const g = new Game();

g.initGame();

document.querySelector('button').addEventListener('click', () => {
   g.stopGame();
   g.initGame();
})