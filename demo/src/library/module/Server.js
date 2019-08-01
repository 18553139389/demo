export default {
  waitingTime: 200,
  fetchRemote (cb, needWait) {
    if (needWait === undefined) needWait = true
    if (needWait) {
      setTimeout(function () {
        cb()
      }, this.waitingTime)
    } else {
      cb()
    }
  }
}
