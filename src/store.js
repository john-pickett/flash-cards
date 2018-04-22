import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    apiURL: 'https://flash-cards-api.herokuapp.com',
    lessons: [],
    decks: [],
    currentLesson: null,
    currentDeck: null,
    loading: false,
    newDeck: null,
    unApp: null,
    unSec: null
  },
  actions: {
    GRAB_LESSON_DATA: function ({commit}) {
        commit('YES_LOADING');
        return new Promise( (resolve, reject) => {
            // console.log('grabbing lesson data')
            axios.get(this.state.apiURL + '/lessons').then( (res) => {
                // commit('SET_LESSON_DATA', {list: res.data.lessons});
            }, (err) => {
                console.log(err);
            })
            .then(axios.get(this.state.apiURL + '/decks').then( (res) => {
                // console.log('grabbing deck data')
                commit('SET_DECK_DATA', {list: res.data.decks});
                // res.data.unCreds
                // commit('SET_CREDS', res.data.unCreds);
                commit('DONE_LOADING');
                // console.log('done ' + JSON.stringify(res.data.decks))
                resolve();
            }))
        });
    },
    CREATE_NEW_DECK: function ({deck}) {
        commit('YES_LOADING');
        return new Promise( (resolve, reject) => {
            axios.post(this.state.apiURL + '/decks', 
                {deck}
            ).then( (res) => {
                console.log(res.data)
            }).then((axios.get(this.state.apiURL + '/decks').then( (res) => {
                commit('SET_DECK_DATA', {list: res.data.decks});
                commit('DONE_LOADING');
                resolve();
            })))
        });
    },
    SET_CURRENT_LESSON: function ({commit}, lesson) {
        commit('SELECT_CURRENT_LESSON', {lesson});
    },
    SET_CURRENT_DECK: function ({commit}, id) {
        commit('SELECT_CURRENT_DECK', {id});
    }
  },
  mutations: {
    SET_LESSON_DATA: (state, {list}) => {
        // console.log('mutations ' + JSON.stringify(list, null, 2))
        state.lessons = list;
    },
    SELECT_CURRENT_LESSON: (state, {lesson}) => {
        state.currentLesson = lesson;
    },
    SELECT_CURRENT_DECK: (state, {id}) => {
        state.currentDeck = state.decks.filter(deck => deck._id === id)[0];
    },
    CLEAR_CURRENT_DECK: (state) => {
        state.currentDeck = null;
    },
    SET_DECK_DATA: (state, {list}) => {
        // console.log('setting deck data ' + JSON.stringify(list))
        state.decks = list
    },
    YES_LOADING: (state) => {
        state.loading = true;
    },
    DONE_LOADING: (state) => {
        state.loading = false;
    },
    SET_CREDS: (state, list) => {
        // console.log('list ' + JSON.stringify(list))
        state.unApp = list.appId;
        state.unSec = list.appSecret;
    }
  },
  getters: {
    lessonTitles: state => {
        let titles = [];
        state.lessons.forEach( (lesson) => {
            // console.log("getter " + lesson.title)
            titles.push({"title": lesson.title, "id": lesson._id});
        })
        // console.log('titles 42 ' + JSON.stringify(titles))
        return titles;
    },
    deckTitles: state => {
        let titles = [];
        state.decks.forEach( (deck) => {
            titles.push({"title": deck.title, "id": deck._id});
        });
        return titles;
    },
    allLessons: state => {
        return state.lessons;
    },
    currentLesson: state => {
        return state.currentLesson;
    },
    currentDeck: state => {
        return state.currentDeck;
    },
    isLoading: state =>  {
        return state.loading;
    },
    getCreds: state => {
        return [state.unApp, state.unSec];
    }
  },  
  modules: {
    
  }
})

export default store;