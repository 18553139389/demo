export default {
	readyProcess(store, {
		cb
	}) {
		let refresh = 50
		console.log("进入了setting")
		let refreshIntervalId = setInterval(function() {
			let ready = store.getters['server/getServerReady']
			if (ready) {
				clearInterval(refreshIntervalId)
				cb()
			}
		}, refresh)
	},
	routeAuthCheck(store, from, to, cb) {
		if (to.path === '/login' && from.path.indexOf('register') <= -1 && from.path.indexOf('reset_password') <= -1) {
			store.commit('updateDirection', {
				direction: 'up'
			})
		} else if (from.path === '/login' && to.path.indexOf('register') <= -1 && to.path.indexOf('reset_password') <= -1) {
			store.commit('updateDirection', {
				direction: 'down'
			})
		} else {
			cb()
		}
	}
}
