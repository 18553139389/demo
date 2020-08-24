const userModules = {
  state: {
    myInfo: {},
    userProfile: {},
    blacklist: [],
	content: ''
  },
  getters: {
    myInfo: state => state.myInfo,
    userProfile: state => state.userProfile,
	content: state => state.content
  },
  mutations: {
    updateMyInfo (state, myInfo) {
      state.myInfo = myInfo
    },
	getContent(state, content) {
		state.content = content
	},
    updateUserProfile (state, userProfile) {
      state.userProfile = userProfile
    },
    setBlacklist (state, blacklist) {
      state.blacklist = blacklist
    },
    updateBlacklist (state, blacklist) {
      state.blacklist.push(blacklist)
    },
    resetUser (state) {
      state.blacklist = []
      state.userProfile = {}
      state.myInfo = {}
    }
  }
}

export default userModules
