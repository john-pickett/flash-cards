<template>
    <div>
        <h2>Create New Lesson</h2>
        <md-field >
            <label>Title Here</label>
            <md-input v-model="title"></md-input>
            <span class="md-helper-text">Title</span>
        </md-field>
        <md-field >
            <label>Timer</label>
            <md-input v-model="timer"></md-input>
            <span class="md-helper-text">Timer</span>
        </md-field>
        <div class="md-layout">
            <div class="md-layout-item" id="cardField">
                <md-field id="test-field">
                    <label>Enter Text Here...</label>
                    <md-input v-model="cards.card1" class="card-input"></md-input>
                    <span class="md-helper-text">Card 1</span>
                </md-field>
            </div>
            <div class="md-layout-item" id="answerField">
                <md-field>
                    <label>Enter Text Here...</label>
                    <md-input v-model="answers.answer1" class="answer-input"></md-input>
                    <span class="md-helper-text">Answer 1</span>
                </md-field>
            </div>
            <md-button class="md-fab md-primary" @click="createNewRow">
                <md-icon>add</md-icon>
            </md-button>
        </div>
        <div class="md-layout">
            <div class="md-layout-item">
                <md-button class="md-primary md-raised" @click="saveLesson">Save Lesson</md-button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

/*
lesson: {
    title: 
    length: 
    timer: 
    cards: []
    answers: []
}
*/

export default {
    data () {
        return {
            title: '',
            length: 1,
            timer: 0,
            cards: [],
            answers: []
        }
    },
    methods: {
        saveLesson: function () {
            console.log('saving lesson');

            let cardInputs = document.getElementsByClassName('card-input');
            for (let i = 0; i < cardInputs.length; i++) {
                this.cards.push(cardInputs[i].value)
            }

            let answerInputs = document.getElementsByClassName('answer-input');
            for (let i = 0; i < answerInputs.length; i++) {
                this.answers.push(answerInputs[i].value)
            }

            // console.log(JSON.stringify(lessonData));
            axios.post('http://localhost:3001/lessons', {
                title: this.title,
                cards: this.cards,
                answers: this.answers,
                length: cardInputs.length,
                timer: this.timer
            })
            .then( (doc) => {
                console.log(JSON.stringify(doc.data));
            });
        },
        createNewRow: function () {
            console.log('making new row');
            this.length += 1;

            var br = document.createElement('br');

            // create new card input
            // create new md-field
            // for cards (on left):
            // <cardField>
            //   <md-field>
            //     <label>
            //     <input>
            //     <span>
            var cardsDiv = document.getElementById('cardField');
            var newCardField = document.createElement('md-field');
            newCardField.id = "md-field" + this.length;
            cardsDiv.appendChild(newCardField);

            // new <md-field> element
            var newFieldDiv = document.getElementById('md-field' + this.length);

            // create new Label
            var newCardLabel = document.createElement('label');
            // append label text
            var labelText = document.createTextNode("Enter Text Here...");
            newCardLabel.appendChild(labelText);
            // create 'for' attribute
            newCardLabel.setAttribute('for', 'md-input' + this.length);
            // append to DOM
            newFieldDiv.appendChild(newCardLabel);

            newFieldDiv.appendChild(br);
            newFieldDiv.appendChild(br);

            // create new Input
            var newCardInput = document.createElement('input');
            var cardAtt = document.createAttribute('class');
            cardAtt.value = "md-input card-input";
            newCardInput.setAttributeNode(cardAtt);
            newCardInput.id = "md-input" + this.length;

            var att = document.createAttribute('v-model');
            att.value = "cards.card" + this.length;
            newCardInput.setAttributeNode(att);
            newFieldDiv.appendChild(newCardInput);
            newFieldDiv.appendChild(br);

            // span 
            var newCardSpan = document.createElement('span');
            var spanText = document.createTextNode("Card " + this.length);
            newCardSpan.appendChild(spanText);
            newFieldDiv.appendChild(newCardSpan);
            newFieldDiv.appendChild(br);
            newFieldDiv.appendChild(br);

            // create new answer input
            // create new md-field
            // for answers (on right):
            // <answerField>
            //   <md-field>
            //     <label>
            //     <input>
            //     <span>
            var answerDiv = document.getElementById('answerField');
            var newAnswerField = document.createElement('md-field');
            newAnswerField.id = "md-field" + this.length + 'answer';
            answerDiv.appendChild(newAnswerField);

            // new <md-field> for answers
            var newAnswerField = document.getElementById('md-field' + this.length + 'answer');

            // create new Label
            var newAnswerLabel = document.createElement('label');
            // append label text
            var answerLabelText = document.createTextNode("Enter Text Here...");
            newAnswerLabel.appendChild(answerLabelText);
            // create 'for' attribute
            newAnswerLabel.setAttribute('for', 'md-input' + this.length + 'answer');
            // append to DOM
            newAnswerField.appendChild(newAnswerLabel);

            newAnswerField.appendChild(br);
            newAnswerField.appendChild(br);

            // create new Input
            var newAnswerInput = document.createElement('input');
            var answerAtt = document.createAttribute('class');
            answerAtt.value = "md-input answer-input";
            newAnswerInput.setAttributeNode(answerAtt);
            newAnswerInput.id = "md-input" + this.length + 'answer';

            var vAtt = document.createAttribute('v-model');
            vAtt.value = "answers.answer" + this.length;
            newCardInput.setAttributeNode(vAtt);

            newAnswerField.appendChild(newAnswerInput);
            newAnswerField.appendChild(br);
            

            // span 
            var newAnswerSpan = document.createElement('span');
            var newSpanText = document.createTextNode("Answer " + this.length);
            newAnswerSpan.appendChild(newSpanText);
            newAnswerField.appendChild(newAnswerSpan);
            newAnswerField.appendChild(br);


        }, // end of createNewRow
    }
}


</script>

<style>

</style>
