import gameTpl from '../templates/game'

export default class Game {

  constructor() {
    this.getDefaultProps();
    this.init();
  }

  getDefaultProps() {
    this.LimitTime = 10;
    this.ScoreTotal = 0;
    this.TimerQueue = [];
    this.InGame = false;
  }

  init() {
    // insert game template
    $('.page-container .page2').html(gameTpl);

    this.cacheElements();
    this.bindEvents();
    this.gameStart();
  }

  cacheElements() {
    this.$page2 = $('.page-container .page2');
    this.$game = this.$page2.find('.game');
    this.$littleD = this.$game.find('[data-role="littleD"]');
    this.$time = this.$page2.find('.time');
  }

  bindEvents() {
    this.$littleD.on('click', this.switchNextGame.bind(this));
  }

  gameStart() {
    this.InGame = true;
    this.TimerQueue.push(window.setTimeout(this.countTime.bind(this), 1000));
    setTimeout(() => {
      this.$time.addClass('start');
    });
  }

  countTime() {
    this.LimitTime--;
    if (this.InGame) {
      if (this.LimitTime > 0) {
        this.TimerQueue.push(window.setTimeout(this.countTime.bind(this), 1000));
      } else {
        this.$page2.trigger('gameover', [this.ScoreTotal]);
        this.destory();
      }
    }
  }

  switchNextGame(e) {
    e.preventDefault();
    // add score
    this.ScoreTotal += 100;
    // switch to next game or fire Event[gameover]
    const next = $(e.target).data('nextgame');
    this.switchToGame(next);
  }

  switchToGame(next) {
    if (next < this.$game.length) {
      $('.game-show').removeClass('game-show');
      this.$game.eq(next).addClass('game-show');
    } else {
      this.InGame = false;
      this.$page2.trigger('gameover', [this.ScoreTotal]);
      this.destory();
    }
  }

  destory() {
    this.TimerQueue.forEach(item => window.clearTimeout(item));
    this.$page2.empty();
  }
}
