export default {
  LimitTime: 10,
  ScoreTotal: 0,
  TimerQueue: [],
  InGame: false,
  init() {
    this.cacheElements();
    this.bindEvents();
  },
  cacheElements() {
    this.$page = $('.page-container .page');
    this.$switchBtns = this.$page.find('[data-role="switch"]');

    this.$timeCount = this.$page.find('.time-count');
    this.$scoreCount = this.$page.find('.score-count');
    this.$scoreTotal = this.$page.find('.score-total');

    this.$game = this.$page.find('.game');

    this.$startGame = this.$page.find('.start-game');
    this.$finishGameBtn = this.$game.find('.finish-game');
    this.$littleD = this.$game.find('[data-role="littleD"]');
    this.$restartGame = this.$page.find('.restart-game');
    this.$showSchedule = this.$page.find('.show-schedule');
  },
  bindEvents() {
    this.$switchBtns.on('click', this.switchNextPage.bind(this));
    this.$littleD.on('click', this.switchNextGame.bind(this));
    this.$startGame.on('click', this.hanldStartClick.bind(this));
    this.$restartGame.on('click', this.hanldStartClick.bind(this));
    this.$finishGameBtn.on('click', this.handleFinishClick.bind(this));
  },
  hanldStartClick(e) {
    this.switchNextPage(e);
    this.gameStart();
  },
  handleFinishClick(e) {
    e.preventDefault();
    const index = this.$page.index($('.page-show'));
    this.switchToPage(index + 1);
    this.ScoreTotal += 100;
    this.$scoreTotal.text(this.ScoreTotal);
    this.gameFinish();
  },
  gameStart() {
    this.InGame = true;
    this.$scoreCount.text(this.ScoreTotal);
    this.$timeCount.text(this.LimitTime);
    this.TimerQueue.push(window.setTimeout(this.countTime.bind(this), 1000));
  },
  countTime() {
    this.LimitTime--;
    this.$timeCount.text(this.LimitTime);
    if (this.LimitTime > 0 && this.InGame) {
      this.TimerQueue.push(window.setTimeout(this.countTime.bind(this), 1000));
    } else {
      this.$scoreTotal.text(this.ScoreTotal);
      const index = this.$page.index($('.page-show'));
      this.switchToPage(index + 1);
      this.gameFinish();
    }
  },
  gameFinish() {
    if (this.ScoreTotal > 500) {
      this.$restartGame.hide();
      this.$showSchedule.show();
    } else {
      this.$restartGame.show();
      this.$showSchedule.hide();
    }

    // init data && clear timer
    this.InGame = false;
    this.LimitTime = 10;
    this.ScoreTotal = 0;
    this.TimerQueue.forEach(item => window.clearTimeout(item));
    this.TimerQueue = [];
    this.switchToGame(0);
  },
  switchNextPage(e) {
    e.preventDefault();
    const next = $(e.target).data('nextpage');
    this.switchToPage(next);
  },
  switchToPage(next) {
    $('.page-show').removeClass('page-show');
    this.$page.eq(next).addClass('page-show');
  },
  switchNextGame(e) {
    e.preventDefault();
    const next = $(e.target).data('nextgame');
    this.switchToGame(next);
    this.ScoreTotal += 100;
    this.$scoreCount.text(this.ScoreTotal);
  },
  switchToGame(next) {
    $('.game-show').removeClass('game-show');
    this.$game.eq(next).addClass('game-show');
  }
}
