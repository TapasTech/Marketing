import Game from './game';

export default {
  init() {
    this.cacheElements();
    this.bindEvents();
    this.generateId();
  },
  cacheElements() {
    this.$page = $('.page-container .page');
    this.$resultPage = this.$page.find('.result');

    this.$userId = this.$page.find('.userId');
    this.$switchBtns = this.$page.find('[data-role="switch"]');
    this.$scoreTotal = this.$page.find('.score-total');
    this.$startGame = this.$page.find('.start-game');

    this.$shareBtn = this.$page.find('.share');
    this.$shareMask = this.$page.find('.share-mask');
    this.$restartGame = this.$page.find('.restart-game');
    this.$showSchedule = this.$page.find('.show-schedule');
  },
  bindEvents() {
    this.$showSchedule.on('click', this.handleShowSchedule.bind(this));
    this.$shareBtn.on('click', this.handleShareShow.bind(this));
    this.$shareMask.on('click', this.handleShareClose.bind(this));
    this.$switchBtns.on('click', this.switchNextPage.bind(this));
    this.$startGame.on('click', this.hanldStartClick.bind(this));
    this.$restartGame.on('click', this.hanldStartClick.bind(this));
    this.$page.on('gameover', this.handleGameOver.bind(this));
  },
  generateId() {
    const userId = Math.round(Math.random()*100000);
    this.$userId.text(userId);
  },
  handleShareShow(e) {
    e.preventDefault();
    this.$shareMask.addClass('show');
  },
  handleShareClose(e) {
    e.preventDefault();
    this.$shareMask.removeClass('show');
  },
  handleShowSchedule(e) {
    e.preventDefault();
    this.$resultPage.addClass('lighten');
    // switch to next page
    const index = this.$page.index($('.page-show'));
    setTimeout(() => {
      this.switchToPage(index + 1)
    }, 3000);
  },
  hanldStartClick(e) {
    this.switchNextPage(e);
    this.game = new Game();
  },
  handleGameOver(e, score) {
    e.preventDefault();
    this.game = null;
    // show game result
    this.$scoreTotal.text(score);
    if (score >= 800) {
      this.$resultPage.addClass('passed');
    } else {
      this.$resultPage.removeClass('passed');
    }
    const index = this.$page.index($('.page-show'));
    this.switchToPage(index + 1);
  },
  switchNextPage(e) {
    e.preventDefault();
    const next = $(e.target).data('nextpage');
    this.switchToPage(next);
  },
  switchToPage(next) {
    $('.page-show').removeClass('page-show');
    this.$page.eq(next).addClass('page-show');
  }
}
