<template>
    <v-layout row>
        <v-flex xs6 offset-sm3>
            <v-card id="test-card">
                <v-card-title>Testing Component</v-card-title>
                <v-radio-group v-model="currentGuess">
                    <v-radio
                        v-for="n, i in items"
                        :key="n"
                        :label="`${n}`"
                        :value="n"
                        :id="`radio${i}`"
                    ></v-radio>
                </v-radio-group>
                <p>{{currentGuess}}</p>
                <v-card-actions>
                    <v-btn color="blue">Start</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
    
</template>

<script>
export default {
    data () {
        return {
            items: ['Green', 'Blue', 'Red', 'White'],
            currentGuess: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    #test-card {
        padding: 0 20px;
    }
</style>
