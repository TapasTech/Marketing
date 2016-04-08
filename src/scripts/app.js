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

    this.$userId = this.$page.find('.userId');

    this.$switchBtns = this.$page.find('[data-role="switch"]');

    this.$startGame = this.$page.find('.start-game');
    this.$resultPage = this.$page.find('.result');

    this.$shareBtn = this.$page.find('.share');
    this.$shareMask = this.$page.find('.share-mask');

    // to remove
    this.$scoreTotal = this.$page.find('.score-total');
  },
  bindEvents() {
    this.$switchBtns.on('click', this.switchNextPage.bind(this));
    this.$startGame.on('click', this.hanldStart.bind(this));
    // for share
    this.$shareBtn.on('click', this.handleShareShow.bind(this));
    this.$shareMask.on('click', this.handleShareClose.bind(this));
    // custom event
    this.$page.on('gameover', this.handleGameOver.bind(this));
    this.$page.on('lighten', this.handleLighten.bind(this));
    this.$page.on('restart', this.handleRestart.bind(this));
  },
  // event handler
  handleShareShow(e) {
    e.preventDefault();
    this.$shareMask.addClass('show');
  },
  handleShareClose(e) {
    this.$shareMask.removeClass('show');
  },
  hanldStart(e) {
    this.game = new Game();
    this.switchNextPage(e);
  },
  // custom evenet handler
  handleRestart() {
    this.game = new Game();
    this.switchToPage(2); // some hack for the page number
  },
  handleGameOver(e, score) {
    e.preventDefault();
    this.game = null;
    const success = score >= 800 ? true : false;
    this.result = new Result(success);
    const index = this.getCurrentIndex();
    this.switchToPage(index + 1);
    // show game result
    // to remove
    this.$scoreTotal.text(score);
  },
  handleLighten(e, cb) {
    e.preventDefault();
    // switch to next page
    const index = this.getCurrentIndex();
    // delay for schedule page
    setTimeout(() => {
      this.switchToPage(index + 1);
      cb && cb(); // cal `destroy` method to result content
    }, 3000);
    this.result = null;
  },
  switchNextPage(e) {
    e.preventDefault();
    const next = $(e.target).data('nextpage') || $(e.target).parent('[data-role="switch"]').data('nextpage');
    next && this.switchToPage(next);
  },
  switchToPage(next) {
    $('.page-show').removeClass('page-show');
    this.$page.eq(next).addClass('page-show');
  },
  generateId() {
    const userId = Math.round(Math.random()*100000);
    this.$userId.text(userId);
  },
  getCurrentIndex() {
    return this.$page.index($('.page-show'));
  }
}
