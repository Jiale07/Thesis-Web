function getAsideHeight() {
  //获取窗口高度
  let asideHeight = document.documentElement.clientHeight;
  window.onresize = () => {
    return (() => {
      asideHeight = document.documentElement.clientHeight;
    })()
  }
  return asideHeight
}

/*
  防抖
 */
function debounce(fn, delay) {
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

export {
  getAsideHeight,
  debounce
}
