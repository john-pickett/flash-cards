import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Main from '@/components/flash-cards/Main';
import CreateLesson from '@/components/flash-cards/CreateLesson';
import Decks from '@/components/card-decks/Decks';
import NewDeck from '@/components/card-decks/NewDeck';
import Teach from '@/components/card-decks/Teach';

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
        path: '/decks',
        name: "Decks",
        component: Decks
    },
    {
        path: '/new-deck',
        name: "NewDeck",
        component: NewDeck
    },
    {
        path: '/teach',
        name: 'Teach',
        component: Teach
    }
  ]
})
