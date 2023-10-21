import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    addTodo: (state, todo) => state.todos.push(todo),
    updateTodo: (state, { id, updatedTodo }) => {
      const index = state.todos.findIndex(todo => todo.id === id)
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo)
      }
    },
    deleteTodo: (state, id) => {
      const index = state.todos.findIndex(todo => todo.id === id)
      if (index !== -1) {
        state.todos.splice(index, 1)
      }
    },
    markTodoComplete: (state, id) => {
      const todo = state.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = true
      }
    }
  },
  actions: {
    addNewTodo: ({ commit }, todo) => {
      commit('addTodo', todo)
    },
    updateTodo: ({ commit }, { id, updatedTodo }) => {
      commit('updateTodo', { id, updatedTodo })
    },
    deleteTodo: ({ commit }, id) => {
      commit('deleteTodo', id)
    },
    markTodoComplete: ({ commit }, id) => {
      commit('markTodoComplete', id)
    }
  },
  getters: {
    pendingTodos: state => state.todos.filter(todo => !todo.completed),
    completedTodos: state => state.todos.filter(todo => todo.completed)
  }
})
