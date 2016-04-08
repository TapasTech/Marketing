const template = `
<div class="result">
  <div class="bg-addon" id="addon1"></div>
  <div class="bg-addon" id="addon2">
    <div class="planet"></div>
  </div>
  <div class="result-container">
    <div class="jumbotron">
      <div class="star" id="star1"></div>
      <div class="star" id="star2"></div>
    </div>
    <div class="gameover-tip text-center" id="fail">
      <div>很遗憾，挑战失败！</div>
      <div>未能获取通往DT时代的入场券，</div>
      <div>不要灰心，再来一次吧！</div>
      <button class="btn restart-game" data-nextpage="2">再来一次</button>
    </div>
    <div class="gameover-tip text-center" id="success">
      <div>恭喜你，挑战成功！</div>
      <div>成功获取通往DT时代的入场券，</div>
      <div>开启数据新媒体的未来！</div>
      <div class="show-schedule">
        <svg width="130" height="130" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g transform="translate(2.5 3)">
            <ellipse  fill="currentColor" cx="62.451" cy="62" rx="62.18" ry="62"/>
            <path d="M71.988 34.36c6.143 2.027 11.463 5.995 15.14 11.127 3.677 4.96 5.796 11.128 5.796 17.684 0 8.54-3.374 16.088-8.91 21.566h-.044c-5.493 5.477-13.15 8.84-21.54 8.84-8.436 0-16.05-3.363-21.542-8.84-5.537-5.478-8.954-13.026-8.954-21.565 0-6.555 2.12-12.723 5.753-17.683 3.72-5.132 9.04-9.1 15.182-11.128 1.86-.604 2.898-2.588 2.292-4.443-.65-1.855-2.64-2.847-4.542-2.33-7.526 2.59-14.145 7.376-18.686 13.716-4.542 6.21-7.094 13.76-7.094 21.868 0 10.48 4.195 19.797 10.987 26.655h.086c6.748 6.728 16.22 10.912 26.516 10.912 10.337 0 19.767-4.184 26.558-10.912h.043c6.792-6.858 11.032-16.174 11.032-26.654 0-8.108-2.64-15.656-7.138-21.867-4.542-6.34-11.16-11.127-18.773-13.715-1.815-.518-3.848.474-4.454 2.33-.606 1.854.432 3.838 2.292 4.44zm-13.15-13.285V64.12c0 1.94 1.558 3.622 3.59 3.622 2.034 0 3.548-1.682 3.548-3.623V21.074c0-1.94-1.514-3.58-3.547-3.58-2.034 0-3.59 1.64-3.59 3.58z" fill="#FFF" mask="url(#b)"/>
          </g>
        </svg>
      </div>
    </div>
  </div>
</div>
`;

export default template
