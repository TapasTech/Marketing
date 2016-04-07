import Game from './game';
import Result from './result';

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
  },
  bindEvents() {
    this.$shareBtn.on('click', this.handleShareShow.bind(this));
    this.$shareMask.on('click', this.handleShareClose.bind(this));
    this.$switchBtns.on('click', this.switchNextPage.bind(this));
    this.$startGame.on('click', this.hanldStart.bind(this));
    this.$page.on('gameover', this.handleGameOver.bind(this));
    this.$page.on('lighten', this.handleLighten.bind(this));
    this.$page.on('restart', this.handleRestart.bind(this));
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
  hanldStart(e) {
    this.game = new Game();
    this.switchNextPage(e);
  },
  handleRestart() {
    this.game = new Game();
    this.switchToPage(2); // some hack
  },
  handleLighten(e) {
    e.preventDefault();
    // switch to next page
    const index = this.$page.index($('.page-show'));
    setTimeout(() => {
      this.switchToPage(index + 1)
    }, 3000);
    this.result = null;
  },
  handleGameOver(e, score) {
    e.preventDefault();
    this.game = null;
    const success = score >= 800 ? true : false;
    this.result = new Result(success);
    // show game result
    this.$scoreTotal.text(score);
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
