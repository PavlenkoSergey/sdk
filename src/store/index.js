import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todoList: []
	},
	mutations: {
		add (state, payload) {
			state.todoList.unshift(
					{
						id: `f${(+new Date).toString(16)}`,
						text: payload.text,
						done: false
					}
			);
			state.todoList.sort((a, b) => {
				return (a.done === b.done) ? 0 : b.done ? -1 : 1;
			})
		},
		change (state, payload) {
			state.todoList.find(item => {
				if (item.id === payload.id) item[payload.property] = payload.value
			});

			if (payload.property === 'done') {
				state.todoList.sort((a, b) => {
					return (a.done === b.done) ? 0 : b.done ? -1 : 1;
				})
			}
		},
		deleteItem (state, payload) {

			let list = state.todoList;

			for (let i = 0; i < list.length; i++) {
				if (list[i].id === payload.id) {
					list.splice(i, 1);
					break;
				}
			}
		},
		clearCompleted (state) {
			state.todoList = state.todoList.filter(todo => !todo.done)
		},
		completedAll (state) {
			state.todoList.forEach(item => {
				item.done = true
			})
		}
	},
	getters: {
		doneTodos: state => {
			return state.todoList.filter(todo => todo.done);
		},
		notDoneTodos: state => {
			return state.todoList.filter(todo => !todo.done);
		},
		doneTodosCount: state => {
			return state.todoList.filter(todo => todo.done).length
		}
	},
	actions: {},
	modules: {},
	plugins: [createPersistedState()],
})
