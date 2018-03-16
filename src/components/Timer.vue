<template>
    <div>
        <span class="headline">Timer</span>
        <p class="card-text text-center">{{timeRemaining}}</p>
    </div>
</template>

<script>
/* eslint-disable */
import { eventBus } from '@/main.js';

export default {
    components: {
    },
    data () {
        return {
            timeRemaining: null
        }
    },
    methods: {
        timer: function () {
            var begin = new Date().getTime();
            var timesUp = begin + 3000;
    
            var x = setInterval( () => {
                var now = new Date().getTime();
                var timeLeft = timesUp - now;
            
                var secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
                //   console.log('left: ' + secondsLeft);
                this.timeRemaining = secondsLeft
                
                if (timeLeft <= 1000) {
                    this.timeRemaining = "Time's Up!"
                    clearInterval(x);
                    // emit time's up to open modal
                    eventBus.$emit('timeUp', true);
                    }
                }, 1000);
        }
    },
    created () {
        eventBus.$on( 'startTimer', data => {
            this.timer();
        })
    },
    mounted () {
        // this.timer();
    }
}
</script>

<style lang="scss" scoped>
    
</style>