import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		school: '',
		schoolId: '',
		gree: '',
		greeId: '',
		student: '',
		studentId: ''
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeSchool(state, item) {
			state.school = item
		},
		changeSchoolId(state, item) {
			state.schoolId = item
		},
		changeGree(state, item) {
			state.gree = item
		},
		changeGreeId(state, item) {
			state.greeId = item
		},
		changeStudent(state, item) {
			state.student = item
		},
		changeStudentId(state, item) {
			state.studentId = item
		}
	}
})

export default store
