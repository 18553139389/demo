// initial state

const state = {
  currentEnv: null,
  currentDebug: false,
  envList: {
    'localTest': {
      serverUrl: 'https://ibiz.test',
      company_uuid: '8492a736-691c-11e8-bdad-a6267438e165',
      site_uuid: 'f0fc158c-691d-11e8-baa7-a6267438e165',
      token: 'BwAFzEEY4GoQ2mm15eSSC5z4XdXXlOvxGnn3T4V6',
      enableDebug: true,
      autoUpdate: true,
      serverInfo: 'dev',
      secret: 'txttxhH4heq5rtTdxgttd9ttWwwTs'
    },
    'development': {
      serverUrl: 'https://ibiz.aupremium.com.cn',
      company_uuid: '85eeadb4-83d4-11e8-bc71-c69d3e0949a8',
      site_uuid: '5636c3d6-83e3-11e8-940c-0a5add797a68',
      token: 'BKtsFWuedwIeAsGAFMfE2nKOzehAQXS9hplbFWNQ',
      enableDebug: false,
      autoUpdate: true,
      serverInfo: 'prod',
      secret: 'txttxhH4heq5rtTdxgttd9ttWwwTs'
    },
    'uat': {
      serverUrl: 'https://uat.iposcloud.com.au',
      company_uuid: '8492a736-691c-11e8-bdad-a6267438e165',
      site_uuid: 'f0fc158c-691d-11e8-baa7-a6267438e165',
      token: 'BwAFzEEY4GoQ2mm15eSSC5z4XdXXlOvxGnn3T4V6',
      enableDebug: false,
      autoUpdate: true,
      serverInfo: 'uat',
      secret: 'txttxhH4heq5rtTdxgttd9ttWwwTs'
    },
    'production': {
      serverUrl: 'https://ibiz.aupremium.com.cn',
      company_uuid: '85eeadb4-83d4-11e8-bc71-c69d3e0949a8',
      site_uuid: '5636c3d6-83e3-11e8-940c-0a5add797a68',
      token: 'BKtsFWuedwIeAsGAFMfE2nKOzehAQXS9hplbFWNQ',
      enableDebug: false,
      autoUpdate: true,
      serverInfo: 'prod',
      secret: 'txttxhH4heq5rtTdxgttd9ttWwwTs'
    }
  }
}

// getters
const getters = {
  getDebug: (state) => state.currentDebug,
  getEnv: (state) => state.currentEnv,
  getEnvList: (state) => state.envList,
  getUuid: (state, getters) => {
    let env = getters.getEnv
    let envobj = getters.getEnvList[env]
    return envobj.company_uuid
  },
  getSiteUuid: (state, getters) => {
    let env = getters.getEnv
    let envobj = getters.getEnvList[env]
    return envobj.site_uuid
  },
  getSecret: (state, getters) => {
    let env = getters.getEnv
    let envobj = getters.getEnvList[env]
    return envobj.secret
  }
}

// actions
const actions = {
  SET_ENV ({ commit, rootState }, env) {
    let systemEnv = rootState.env.envList[env]
    let debug = systemEnv.enableDebug
    if (debug) {
			console.log('这是初始化数据')
      console.log('[CORE][Env] SET_ENV start')
      console.log('[CORE][Env] env is:', env)
    }
    commit('COMMIT_SET_ENV', env)
    commit('COMMIT_SET_DEBUG', debug)
    if (debug) {
      console.log('[CORE][Env] SET_ENV finish')
    }
  }
}

// mutations
const mutations = {
  COMMIT_SET_ENV: (state, env) => { state.currentEnv = env },
  COMMIT_SET_DEBUG: (state, currentDebug) => { state.currentDebug = currentDebug }
}

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
