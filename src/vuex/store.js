import Vuex from 'vuex';
import Vue from "vue";
import * as types from './types'
import {makeAction} from './util';

Vue.use(Vuex)

const state = {
  userNike:'',
  userId:'',
  username:'',
  token:null,
  title:'',
  noteList:[],
  articleList:[],
  blogListData:[],
  activeLabel:null,
}

const mutations = {
  [types.LOGIN]:(state,data)=>{
    localStorage.token = data.token;
    state.token = data.token;
    data.resData.forEach(item => {
      state.userNike = item.nickname;
      state.userId= item._id;
      state.username = item.username
    });
    
  },
  [types.LOGOUT]:(state)=>{
    localStorage.removeItem('token');
    state.token = null;
    state.userNike = ''
  },
  [types.GET_NOTE]:(state,data)=>{
    state.noteList = data
  },
  [types.GET_ARTICLE]:(state,data)=>{
    state.articleList = data
  },
  [types.BLOG_LIST]:(state,data)=>{
    state.blogListData = data
  },

  [types.SET_ACTIVE_LABEL]:(state,label)=>{
    state.activeLabel = label
  }

}

const getters = {
  activeLabel(state){
    return state.activeLabel
  }
}

const actions = {
  updateActiveLabel:makeAction(types.SET_ACTIVE_LABEL)
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
export default store