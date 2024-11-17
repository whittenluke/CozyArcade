import { BOARD_WIDTH, BOARD_HEIGHT, INITIAL_POSITION, POINTS, SPEEDS, Direction, GameState } from './constants';

// Types
export interface Position {
  x: number;
  y: number;
}

interface SnakeState {
  body: Position[];      // Array of positions, first element is head
  direction: Direction;  // Current direction
  growing: boolean;      // Whether snake should grow on next move
}

export interface GameStateType {
  snake: SnakeState;
  food: Position;
  score: number;
  speed: number;
  state: GameState;
}

// Helper functions
function createRandomFood(snake: Position[]): Position {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT)
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  
  return food;
}

function getNextPosition(current: Position, direction: Direction): Position {
  switch (direction) {
    case 'UP':
      return { x: current.x, y: current.y - 1 };
    case 'DOWN':
      return { x: current.x, y: current.y + 1 };
    case 'LEFT':
      return { x: current.x - 1, y: current.y };
    case 'RIGHT':
      return { x: current.x + 1, y: current.y };
  }
}

function checkCollision(position: Position, snake: Position[]): boolean {
  if (
    position.x < 0 || 
    position.x >= BOARD_WIDTH || 
    position.y < 0 || 
    position.y >= BOARD_HEIGHT
  ) {
    return true;
  }
  
  return snake.some((segment, index) => 
    index > 0 && segment.x === position.x && segment.y === position.y
  );
}

// Game state management
export function initializeGame(): GameStateType {
  const initialSnake: SnakeState = {
    body: [INITIAL_POSITION],
    direction: 'RIGHT',
    growing: false
  };

  return {
    snake: initialSnake,
    food: createRandomFood(initialSnake.body),
    score: 0,
    speed: SPEEDS.INITIAL,
    state: GameState.READY
  };
}

export function moveSnake(state: GameStateType): GameStateType {
  if (state.state !== GameState.PLAYING) return state;

  const head = state.snake.body[0];
  const nextPos = getNextPosition(head, state.snake.direction);

  // Check for collision
  if (checkCollision(nextPos, state.snake.body)) {
    return {
      ...state,
      state: GameState.GAME_OVER
    };
  }

  // Create new body
  const newBody = [nextPos, ...state.snake.body];
  if (!state.snake.growing) {
    newBody.pop(); // Remove tail if not growing
  }

  // Check for food collision
  let food = state.food;
  let score = state.score;
  let speed = state.speed;
  let growing = false;

  if (nextPos.x === food.x && nextPos.y === food.y) {
    food = createRandomFood(newBody);
    score += POINTS.FOOD;
    speed = Math.max(SPEEDS.MIN_SPEED, speed - SPEEDS.SPEED_DECREASE);
    growing = true;
  }

  return {
    ...state,
    snake: {
      ...state.snake,
      body: newBody,
      growing
    },
    food,
    score,
    speed
  };
}

export function changeDirection(state: GameStateType, newDirection: Direction): GameStateType {
  // Prevent 180-degree turns
  const opposites = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT'
  };

  if (opposites[newDirection] === state.snake.direction) {
    return state;
  }

  return {
    ...state,
    snake: {
      ...state.snake,
      direction: newDirection
    }
  };
}
