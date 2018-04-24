import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Main from '@/components/flash-cards/Main';
import CreateLesson from '@/components/flash-cards/CreateLesson';
import Recall from '@/components/card-decks/Recall';
import Create from '@/components/card-decks/Create';
import Teach from '@/components/card-decks/Teach';
import NounDrill from '@/components/card-decks/NounDrill';

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
        path: '/recall',
        name: "Recall",
        component: Recall
    },
    {
        path: '/create',
        name: "Create",
        component: Create
    },
    {
        path: '/teach',
        name: 'Teach',
        component: Teach
    },
    {
        path: '/nouns',
        name: 'NounDrill',
        component: NounDrill
    }
  ]
})
