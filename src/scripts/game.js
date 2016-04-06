import gameTpl from '../templates/game.html'

export default {
  GameTemplate: $(gameTpl).html(),
  init() {
    this.insertTpl();
    this.cacheElements();
    this.bindEvents();
    this.resetCount();
    this.gameStart();
  },
  cacheElements() {
    this.$page2 = $('.page-container .page2');
    this.$game = this.$page2.find('.game');
    this.$littleD = this.$game.find('[data-role="littleD"]');
    this.$timeCount = this.$page2.find('.time-count');
    this.$scoreCount = this.$page2.find('.score-count');
  },
  bindEvents() {
    this.$littleD.on('click', this.switchNextGame.bind(this));
  },
  insertTpl() {
    $('.page-container .page2').html(this.GameTemplate)
  },
  resetCount() {
    this.LimitTime = 10;
    this.ScoreTotal = 0;
    this.TimerQueue = [];
    this.InGame = false;
  },
  gameStart() {
    this.InGame = true;
    this.$scoreCount.text(this.ScoreTotal);
    this.$timeCount.text(this.LimitTime);
    this.TimerQueue.push(window.setTimeout(this.countTime.bind(this), 1000));
  },
  countTime() {
    this.$timeCount.text(this.LimitTime--);
    if (this.LimitTime > 0 && this.InGame) {
      this.TimerQueue.push(window.setTimeout(this.countTime.bind(this), 1000));
    } else {
      // fire Event[gameover]
      this.$page2.trigger('gameover', [this.ScoreTotal]);
      this.destory();
    }
  },
  switchNextGame(e) {
    e.preventDefault();
    // add score
    this.ScoreTotal += 100;
    this.$scoreCount.text(this.ScoreTotal);
    // switch to next game or fire Event[gameover]
    const next = $(e.target).data('nextgame');
    if (next < this.$game.length) {
      this.switchToGame(next);
    } else {
      this.InGame = false;
      this.$page2.trigger('gameover', [this.ScoreTotal]);
      setTimeout(()=> {
        this.destory()
      }, 5000);
    }
  },
  switchToGame(next) {
    $('.game-show').removeClass('game-show');
    this.$game.eq(next).addClass('game-show');
  },
  destory() {
    this.TimerQueue.forEach(item => window.clearTimeout(item));
    this.$page2.empty();
  }
}
