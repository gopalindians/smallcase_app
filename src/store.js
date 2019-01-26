import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	favorites:[]
  },
  getters: {
    allFavorites: state => {
      return state.favorites;
    },

     isFav: (state) => (symbol) => {
      if(state.favorites.includes(symbol)){
        return  true;
      }else{
        return  false;
      }
  }
  },
  mutations: {
  	add(state,data){
      if(!state.favorites.includes(data)){
        state.favorites.push(data)
      }
  	},
    remove(state,data){
      if(state.favorites.includes(data)){
        var index = state.favorites.indexOf(5);
        state.favorites.splice(index,1);
      }
    }

  },
  actions: {

  }
})
