import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    todos: [],
    todo: ''
  },
  getters: {
    allTodos: (state) => state.todos,
    singleTodo: (state) => state.todo
  },
  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift({todo}),
    removeTodo: ( state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updateTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updateTodo);
      }
    }
  },
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get('http://localhost:4500/api/task');

      commit('setTodos', response.data);
    },
    async addTodo({commit}, payload) {
      const response = fetch('http://localhost:4500/api/task', { 
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: payload.title
        })
       }).then(response => response.json()).then((data) => { return data});
       commit('setTodos', response.data)
       location.reload()
    },
    async deleteTodo({ commit }, id) {
      
      await axios.delete(`http://localhost:4500/api/task/${id}`);

      commit('removeTodo', id);
    },
    async filterTodo({ commit }, event) {
      // Get selected number
      const limit = parseInt(event.target.options[event.target.options.selectedIndex].innerText);
      const response = await axios.get(`http://localhost:4500/api/task`);

      let filteredTodos = {}
      filteredTodos.data = []
      for(let i = 0; i<limit; i++){
        filteredTodos.data.push(response.data.data[i])
      }

      commit('setTodos', filteredTodos);
    },
    async updateTodo({ commit }, updTodo) {
      const response = await axios.put(`http://localhost:4500/api/task/${updTodo.id}`, updTodo);

      // console.log(response.data);

      commit('updateTodo', response.data)
    }
  },
  modules: {
    
  }
})
