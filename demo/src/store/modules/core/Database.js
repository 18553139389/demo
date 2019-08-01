// import PouchDB from '../../../../vendor/pouchdb/dist/pouchdb'

// initial state
const state = {
	dbInstance: null,
	localDatabase: {
		'db_name': 'aoyou_app',
		'prefix': 'au_',
		'adapter': 'idb',
		'auto_compaction': false,
		'revs_limit': 3
	},
	dbTable: {
		system: 'system',
		server: 'server',
		update: 'update',
		homepage: 'homepage',
		contentPage: 'contentPage',
		product: 'product',
		category: 'category',
		menu: 'menu',
		queue: 'queue',
		log: 'log',
		cart: 'cart',
		customer: 'customer',
		consignee: 'consignee',
		credit: 'credit',
		coupon: 'coupon',
		orderHistory: 'orderHistory',
		currency: 'currency',
		myShop: 'myShop'
	}
}

// getters
const getters = {
	getDbInstance: state => state.dbInstance,
	allTables: state => state.dbTable
}

// actions
const actions = {
	INIT({
		commit,
		state,
		rootState
	}) {
		if (rootState.env.currentDebug) {
			console.log('[CORE][Database] INIT start')
		}
		console.log('第一步')
		console.log(rootState.env.currentDebug + '555')
		console.log('第二步')
		// PouchDB.plugin(require(Local));
		console.log('第三步')
// 		let localDb = new PouchDB(state.localDatabase.db_name, {
// 			prefix: state.localDatabase.prefix,
// 			adapter: state.localDatabase.adapter,
// 			revs_limit: state.localDatabase.revs_limit,
// 			auto_compaction: state.localDatabase.auto_compaction
// 		})
// 		if (rootState.env.currentDebug) {
// 			PouchDB.debug.enable('*')
// 			if (rootState.env.currentDebug) {
// 				console.log('[CORE][Database] PouchDB.debug enable')
// 			}
// 		} else {
// 			PouchDB.debug.disable()
// 		}
// 		commit('COMMIT_INIT', localDb)
		if (rootState.env.currentDebug) {
			console.log('[CORE][Database] INIT finish')
		}
		console.log(rootState.env.currentDebug + '666')
	}
}

// mutations
const mutations = {
	COMMIT_INIT: (state, db) => {
		state.dbInstance = db
	}
}

export default {
	strict: true,
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
