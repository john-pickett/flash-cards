<template>
    <div>
        <v-layout row>
                        <v-flex xs1 class="text-xs-center">
                            <v-text-field
                                name="guess2_1"
                                label=""
                                id="guess2_1"
                                v-model="guess2_1"
                                @keyup.native="nextInput($event)"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                                name="guess2_2"
                                label=""
                                id="guess2_2"
                                v-model="guess2_2"
                                @keyup.native="nextInput($event)"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                            name="guess2_3"
                            label=""
                            id="guess2_3"
                            v-model="guess2_3"
                            @keyup.native="nextInput($event)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                            name="guess2_4"
                            label=""
                            id="guess2_4"
                            v-model="guess2_4"
                            @keyup.native="nextInput($event)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                            name="guess2_5"
                            label=""
                            id="guess2_5"
                            v-model="guess2_5"
                            @keyup.native="nextInput($event)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                            name="guess2_6"
                            label=""
                            id="guess2_6"
                            v-model="guess2_6"
                            @keyup.native="nextInput($event)"
                        ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <div v-if="correct2">
                        Correct!
                    </div>
                    <div v-if="wrong2">
                        Nope!
                    </div>
    </div>
</template>

<script>
export default {
  
}
</script>
