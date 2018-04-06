import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Main from '@/components/flash-cards/Main';
import CreateLesson from '@/components/flash-cards/CreateLesson';
import Hangman from '@/components/hangman/Hangman';

// import Test from '@/components/Test';

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cards',
        name: 'Main',
        component: Main
    },
    {
        path: '/new-lesson',
        name: 'CreateLesson',
        component: CreateLesson
    },
    {
        path: '/hangman',
        name: "Hangman",
        component: Hangman
    }
  ]
})
