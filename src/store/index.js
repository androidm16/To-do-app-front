import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    todos: []
  },
  getters: {
    allTodos: (state) => state.todos
  },
  mutations: {
    setTodos: (state, todos) => (state.todos = todos)
  },
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get('https://to-do-backend-app1.herokuapp.com/api/task');

      commit('setTodos', response.data);
    }
  },
  modules: {
    
  }
})
