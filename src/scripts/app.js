export default {
  init() {
    this.cacheElements()
    this.bindEvents()
    this.initViewWidth()
  },
  cacheElements() {
    this.$container = $('.page-container')
  },
  bindEvents() {
    window.addEventListener('resize', this.initViewWidth.bind(this), false)
  },
  initViewWidth() {
    this.$container.css('width', window.innerWidth + 'px')
  }
}
