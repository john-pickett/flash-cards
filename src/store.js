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
    loading: false
  },
  actions: {
    GRAB_LESSON_DATA: function ({commit}) {
        commit('YES_LOADING');
        return new Promise( (resolve, reject) => {
            axios.get(this.state.apiURL + '/lessons').then( (res) => {
                commit('SET_LESSON_DATA', {list: res.data.lessons});
            }, (err) => {
                console.log(err);
            })
            .then(axios.get(this.state.apiURL + '/decks').then( (res) => {
                commit('SET_DECK_DATA', {list: res.data.decks});
                console.log('got decks');
                commit('DONE_LOADING');
                resolve();
            }))
        });
    },
    SET_CURRENT_LESSON: function ({commit}, lesson) {
        commit('SELECT_CURRENT_LESSON', {lesson});
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
    SET_DECK_DATA: (state, {list}) => {
        state.decks = list
    },
    YES_LOADING: (state) => {
        state.loading = true;
    },
    DONE_LOADING: (state) => {
        state.loading = false;
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
    isLoading: state =>  {
        return state.loading
    }
  },  
  modules: {
    
  }
})

export default store;