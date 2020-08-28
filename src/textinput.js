import React, {useState, useRef, useEffect, useReducer} from 'react';
import { Button, ButtonGroup, FormGroup, Progress, Container, Fade} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import {EMOTIONS_KEY, DIFFICULTY_KEY} from 'dotenv'

//JODIT TEXT EDITOR
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

const slideinAnimation = keyframes`${slideInLeft}`;
const SlideInElement = styled.div`
          animation: 3s ${slideinAnimation};
        `;

const Textinput = (props) => {

const [diffLevel, setLevel] = useState(0)

let [diff, setDiff] = useState(0)

const [content, setValue] = useState("")

let emo
let initialState = {}
let emotions
let rendering

const reducer = (state,event) => {

         emo = event.emotions
        rendering = event.rendering

        if (event.rendering==true) {return {...state, emo, rendering}}
        if (event.rendering==false) {return rendering}
}


const[state, dispatch] = useReducer(reducer, initialState)

let secs = 0


const showEmotion = (emotionData) => {

         emotions = {joy: Math.floor(emotionData.joy*100), sadness: Math.floor(emotionData.sadness*100), fear: Math.floor(emotionData.fear*100), anger: Math.floor(emotionData.anger*100)}

        dispatch({emotions, rendering:true})

        let secondTimer = setInterval(function(){

                secs +=1

                 if (secs===5) {dispatch({rendering:false})
                
                clearInterval(secondTimer);}

                }, 1000)}


const getEmotion = (e) => {

    e.preventDefault()

    let textEl =""
    let text = ""

    if (document.getElementById('text-editor')) {

        textEl = document.getElementById('text-editor');
        text = textEl.value
        setValue(text)
        
        fetch(`https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=${text}`, {
                "method": "GET",
                "headers": {
                        "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com",
                        "x-rapidapi-key": EMOTIONS_KEY}})
        .then( response=>response.json())
        .then((data)=> showEmotion(data.emotion_scores))
        .catch(err => {
                console.log(err);
 });}}


const showDifficulty = (diffDegree) =>{

        setDiff(diffDegree*10)

        setLevel(diffDegree*10)

        let secondTimer = setInterval(function(){

                secs +=1

                if (secs===3) {setLevel(0); 
                clearInterval(secondTimer);}
                }, 1000)}


const getDifficulty = (e) => {

        e.preventDefault()

        let textEl =""
        let text = ""

        if (document.getElementById('text-editor')) {

                 textEl = document.getElementById('text-editor');
                 text = textEl.value
                 setValue(text)
        
         fetch(`https://twinword-language-scoring.p.rapidapi.com/text/?text=${text}`, {
 	"method": "GET",
 	"headers": {
 		"x-rapidapi-host": "twinword-language-scoring.p.rapidapi.com",
 		"x-rapidapi-key": DIFFICULTY_KEY
 	}
 })
        .then( response=>response.json())
        .then((data)=> showDifficulty(data.ten_degree)
        )
        .catch(err => {
                console.log(err);
        });}}

let editorEl="";

if (document.getElementById('text-editor')) {
        
        editorEl = document.querySelector('#text-editor')
        editorEl.style.color = 'black';
        editorEl.style.display = 'block';

}


return ( diffLevel >0?
        <Container id="difficulty-bar">
                <div id="progressbarlevel" className="text-center">{diffLevel}% Difficulty</div>
                <SlideInElement>
                        <Progress id="progressbarlevel" animated={true} value={diffLevel}/>
                </SlideInElement>
        </Container>: rendering ===true && state.emo?
        <Container id="emotions-bars">
                <SlideInElement>
                        <div id="progressbarjoy" className="text-center">{state.emo.joy}% Joy</div>
                        <Progress id="progressbarjoy" animated={true} value={state.emo.joy}/>
                        <div id="progressbarsadness" className="text-center">{emo.sadness}% Sadness</div>
                        <Progress id="progressbarsadness" animated={true} value={emo.sadness}/>
                        <div id="progressbarfear" className="text-center">{emo.fear}% Fear</div>
                        <Progress id="progressbarfear" animated={true} value={emo.fear}/>
                        <div id="progressbaranger" className="text-center">{emo.anger}% Anger</div>
                        <Progress id="progressbaranger" animated={true} value={emo.anger}/>
                </SlideInElement>
        </Container>:
        <Fade>
        {/* unmountOnExit={true} */}
                <Container id="container">
                        <NavLink to="/mainapp">
                                <div id="home"></div>
                        </NavLink>
                        <FormGroup>
                                {/* <Button onClick={()=>changeTheme()}/> */}
                                <JoditEditor id="text-editor" 
                                        
                                        // value={content}
                                        config={{
                                                toolbarSticky:true,
                                                theme: 'dark',
                                                readonly: false
                                        
                                        // all options from https://xdsoft.net/jodit/play.html
                                     }}/>
                                <ButtonGroup id="button-group">
                                        <Button onClick={(e)=>getDifficulty(e)} color="danger" className="mr-2">Difficulty level</Button>
                                        <Button color="secondary">Sentiment</Button>{' '}
                                        <Button color="success" className="ml-2" onClick={(e)=>getEmotion(e)}>Emotions</Button>
                                        <Button color="info" className="ml-2">Similarity</Button>{' '}
                                </ButtonGroup>
                        </FormGroup> 
                </Container>
        </Fade>)
                }

export default Textinput;