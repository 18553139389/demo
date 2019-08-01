(function(owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo,pass) {
		owner.createState(loginInfo,pass);
	};

	owner.createState = function(name,pass) {
		var state = owner.getState();
		state.uid = name;
		state.pass = pass;
		owner.setState(state);
	};
	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};
	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
	};
}(window.app = {}));