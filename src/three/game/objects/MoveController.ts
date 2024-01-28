import { Diodrama } from './Diodrama';



export class MoveController {

  private diodrama: Diodrama;
  private interval: any;
  private lastMove: string = 'ArrowUp';
  private acceptedMoves = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'];
  private oppositeDirection = new Map<string, string[]>(
    [
      ['ArrowUp', ['ArrowDown', 's']],
      ['ArrowDown', ['ArrowUp', 'w']],
      ['ArrowLeft', ['ArrowRight', 'd']],
      ['ArrowRight', ['ArrowLeft', 'a']],
      ['w', ['s', 'ArrowDown']],
      ['s', ['w', 'ArrowUp']],
      ['a', ['d', 'ArrowRight']],
      ['d', ['a', 'ArrowLeft']],
    ]
  )

  constructor(diodrama: Diodrama) {
    this.keyBoardListener();
    this.diodrama = diodrama;
  }

  private keyBoardListener() {
    document.addEventListener('keydown', (event) => {
      if (this.acceptedMoves.includes(event.key)) {
        if (this.oppositeDirection.get(this.lastMove)?.includes(event.key) == false) {
           return this.lastMove = event.key;
        }
      }
    });
  }

  setLastMove(move: string) {
    this.lastMove = move;
  }

  startAutoMove() {
    this.interval = setInterval(() => {
      this.diodrama.snake.move(this.lastMove, this.diodrama.food);
    }, 500);
  }

  stopAutoMove() {
    clearInterval(this.interval);
  }


}