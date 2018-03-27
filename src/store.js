import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    apiURL: 'https://flash-cards-api.herokuapp.com',
    lessons: [],
    currentLesson: null
  },
  actions: {
    GRAB_LESSON_DATA: function ({commit}) {
        return new Promise( (resolve, reject) => {
            axios.get(this.state.apiURL + '/lessons').then( (res) => {
                commit('SET_LESSON_DATA', {list: res.data.lessons});
                resolve();
                // console.log(JSON.stringify(res.data.lessons[0]));
            }, (err) => {
                console.log(err);
            })
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
    allLessons: state => {
        return state.lessons;
    },
    currentLesson: state => {
        return state.currentLesson;
    }
  },  
  modules: {
    
  }
})

export default store;