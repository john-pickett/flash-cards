<template>
    <div>
        <v-app>
            <v-navigation-drawer
            persistent
            :mini-variant="miniVariant"
            :clipped="clipped"
            v-model="drawer"
            enable-resize-watcher
            fixed
            app
            width="200"
            >
                <v-list v-for="item in menuItems" :key="item.title">
                    <v-list-tile color="blue" :to="item.url">
                        <v-list-tile-action>
                            <v-icon color="blue" v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar
            app
            :clipped-left="clipped"
            >
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-btn icon @click.stop="miniVariant = !miniVariant">
                    <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
                </v-btn>
                <!-- <v-btn icon @click.stop="clipped = !clipped">
                    <v-icon>web</v-icon>
                </v-btn> -->
                <!-- <v-btn icon @click.stop="fixed = !fixed">
                    <v-icon>remove</v-icon>
                </v-btn> -->
                <v-toolbar-title v-text="title" url="/"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                        <v-icon>menu</v-icon>
                    </v-btn> -->
            </v-toolbar>
            <v-content>
                <router-view/>
            </v-content>
            <v-footer :fixed="fixed" app>
            <span>&nbsp; &copy; 2018</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '@/main.js';

export default {
    name: 'App',
    data () {
        return {
            clipped: true,
            drawer: true,
            fixed: false,
            menuItems: [
                { id: 'flash-cards', icon: 'bubble_chart', title: 'Flash Cards', url: '/cards' },
                { id: 'lessons', icon: 'playlist_add', title: 'Create Lesson', url: '/new-lesson' }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Flash Cards'
        }
    },
    methods: {
        
    },
    created () {
        this.$store.dispatch('GRAB_LESSON_DATA').then( () => {
            console.log('data is ready, man');
        })
    },
    mounted () {

        
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
