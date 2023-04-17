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

export {
  getAsideHeight
}