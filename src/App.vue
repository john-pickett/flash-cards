<template>
    <v-app>
        <v-navigation-drawer
        persistent
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        enable-resize-watcher
        fixed
        app
        >
        <v-list>
            <v-list-group
                v-for="item in menuItems"
                :key="item.title"
            >
                <v-list-tile color="blue" slot="activator" :to="item.url">
                    <v-list-tile-action>
                        <v-icon color="blue" v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.subItems" :key="subItem.title">
                    <v-list-tile-content>
                        <v-list-tile-title :id="kebabCase(subItem.title)" @click="loadLesson($event)">
                            {{ subItem.title }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
        </v-list>
            <!-- original -->
            <!-- <v-list-tile
            value="true"
            v-for="(item, i) in menuItems"
            :key="i"
            :to="item.url"
            >
            <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile> -->
            <!-- end of original -->
            <!-- <v-list v-if="this.item.title.length > 1">
                <v-list-tile 
                    value="true"
                    v-for="(elem, j) in this.item.title"
                    :key="j"

                >
                    <v-list-tile-content>
                        <v-list-tile-title v-text="elem.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list> -->
        </v-navigation-drawer>
        <v-toolbar
        app
        :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>web</v-icon>
            </v-btn>
            <!-- <v-btn icon @click.stop="fixed = !fixed">
                <v-icon>remove</v-icon>
            </v-btn> -->
            <v-toolbar-title v-text="title"></v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                    <v-icon>menu</v-icon>
                </v-btn> -->
        </v-toolbar>
        <v-content>
            <router-view/>
        </v-content>
        <!-- <v-navigation-drawer
        temporary
        :right="right"
        v-model="rightDrawer"
        fixed
        app
        > -->
        <!-- <v-list>
            <v-list-tile @click="right = !right">
            <v-list-tile-action>
                <v-icon>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
            </v-list-tile>
        </v-list> -->
        <!-- </v-navigation-drawer> -->
        <v-footer :fixed="fixed" app>
        <span>&nbsp; &copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
import axios from 'axios';
import { eventBus } from '@/main.js';

export default {
    name: 'App',
    data () {
        return {
            apiURL: null,
            loading: false,
            clipped: false,
            drawer: true,
            fixed: false,
            menuItems: [
                { id: 'flash-cards', icon: 'bubble_chart', title: 'Flash Cards', url: '/', subItems: [
                    { title: 'Verbs' }, { title: 'Colors' }, { title: 'Family' }
                ]},
                { id: 'lessons', icon: 'playlist_add', title: 'Create Lesson', url: '/new-lesson', subItems: []}
            ],
            // lesson data from Mongo is stored here
            lessons: [],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Flash Cards'
        }
    },
    methods: {
        kebabCase (title) {
            return title.replace(' ', '-').toLowerCase();
        },
        loadLesson (event) {
            // this is hard-coded for now. hard-coding is bad
            console.log(event.target.id);
            if (event.target.id === "spanish-verbs") {
                eventBus.$emit('newLessonData', this.lessons[0]);
            } else if (event.target.id === "spanish-colors") {
                eventBus.$emit('newLessonData', this.lessons[1]);
            } else if (event.target.id === "spanish-family") {
                eventBus.$emit('newLessonData', this.lessons[2]);
            }
        }
    },
    beforeMount () {
        let that = this;
        // console.log(' app before mount');
        axios.get(this.apiURL + '/lessons')
        .then( (doc) => {
            // console.log(JSON.stringify(doc.data, null, 2));
            doc.data.lessons.forEach( (lesson, i) => {
                that.lessons.push(lesson);
                that.menuItems[0].subItems.push({ title: lesson.title });
                eventBus.$emit('newLessonData', that.lessons[0]);
            });
            // console.log('that.lessons: ' + JSON.stringify(that.lessons, null, 2));
            console.log('received lesson data');
            that.loading = false;
        });
        
    },
    created () {
        if (process.env.LOCATION === "np") {
            this.apiURL = 'https://flash-cards-api.herokuapp.com'
        } else {
            this.apiURL = 'http://localhost:3001'
        }
    }
}
</script>

<style lang="scss">
    h4 {
        font-size: 28px;
    }

    p.card-text, span.card-text {
        font-size: 22px;
    }

    

    .flash-cards {
      padding: 20px 20px 0 20px;
    }
</style>
