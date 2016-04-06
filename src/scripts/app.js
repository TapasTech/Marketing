import Game from './game';

export default {
  init() {
    this.cacheElements();
    this.bindEvents();
  },
  cacheElements() {
    this.$page = $('.page-container .page');
    this.$switchBtns = this.$page.find('[data-role="switch"]');
    this.$scoreTotal = this.$page.find('.score-total');
    this.$startGame = this.$page.find('.start-game');
    this.$restartGame = this.$page.find('.restart-game');
    this.$showSchedule = this.$page.find('.show-schedule');
  },
  bindEvents() {
    this.$switchBtns.on('click', this.switchNextPage.bind(this));
    this.$startGame.on('click', this.hanldStartClick.bind(this));
    this.$restartGame.on('click', this.hanldStartClick.bind(this));
    this.$page.on('gameover', this.handleGameOver.bind(this));
  },
  hanldStartClick(e) {
    this.switchNextPage(e);
    new Game();
  },
  handleGameOver(e, score) {
    e.preventDefault();
    // show game result
    this.$scoreTotal.text(score);
    if (score > 500) {
      this.$restartGame.hide();
      this.$showSchedule.show();
    } else {
      this.$restartGame.show();
      this.$showSchedule.hide();
    }
    // switch to next page
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
