import React, {useState, useRef, useEffect, useReducer} from 'react';
import { Button, Container, Fade} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import './films.scss'
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations'; 
import { render } from 'react-dom';

const bounceAnimation = keyframes`${bounce}`;

const BouncyImg = styled.img`
      animation: 3s ${bounceAnimation};
      position: relative
    `;

let items;
let renderedItems = [];

const Films = (props) =>  {

  const reducer = (state,event) => {

      renderedItems = event.items

      let rendering
      
      rendering = event.rendering

        if (rendering==true) {
          
          return {...state, renderedItems}}

        if (rendering==false) {return false}

}

let initialState = {}

const [state, dispatch] = useReducer(reducer, initialState)

const [nonBlurIndex, setIndex] =useState(0)

   const loadItems = (moviesData) =>{

        if (moviesData.length) {items = [];
          
          moviesData.map((movie,i) =>items.push({
            
             ind: i+1,
             id:movie._id,
             title:movie.title,
             src: movie.poster,
            plot: movie.plot}))
             
             dispatch({items: items, rendering:true})
            
            }

        else {dispatch({items: moviesData, rendering:false})}}


    useEffect(() =>{

        fetch(`http://localhost:3000/movies`)

                 .then(data=>data.json())
                 .then(response=>loadItems(response.data.movies))
                 .catch(err=>console.log(err))  

        console.log(nonBlurIndex)

        return () => {

            loadItems([])
            setIndex(0)};

    },[])


    const toggleLeft = (e, movies) => {

      e.preventDefault();

      if (nonBlurIndex == 0) {

          console.log(nonBlurIndex); return}

      let allImages = document.querySelectorAll('.images-basic')

      let nonBlur = document.getElementById('non-blur-image')
      let plotEl= document.getElementById('movie-plot')

      nonBlur.id = null
      plotEl.id=null

      allImages[nonBlurIndex-1].id='non-blur-image'
      allImages[nonBlurIndex-1].lastChild.id='movie-plot'

      setIndex(nonBlurIndex - 1)
      console.log(nonBlurIndex)

    }

    const toggleRight = (e, movies) => {

      e.preventDefault();

      let imagesLength = renderedItems.length-1

      let allImages = document.querySelectorAll('.images-basic')

      if (nonBlurIndex === imagesLength) {
         return}

      let nonBlur= document.getElementById('non-blur-image')
      let plotEl= document.getElementById('movie-plot')

      nonBlur.id = null
      plotEl.id=null

      allImages[nonBlurIndex+1].id='non-blur-image'
      allImages[nonBlurIndex+1].lastElementChild.id='movie-plot'

      setIndex(nonBlurIndex+1)
      console.log(nonBlurIndex)
      

    }

    if (document.getElementById('non-blur-image')) {

      document.getElementById('non-blur-image').addEventListener('mouseover', e=>{

          e.preventDefault()
          e.target.style.display='none'

      })}
  
    
    return ( 
    <Fade unmountOnExit={true}>
            <NavLink to="/mainapp">
                <div id="home"></div>
            </NavLink>
            <Container id="filmcontainer">
                    <Button onClick={(e)=>toggleLeft(e, renderedItems)}>‹</Button>
                    <div className="images-container">

                        {renderedItems.length? renderedItems.map((item, i) => 
                        
                        {if (i==0) {
                          
                          return <div className='images-basic' id='non-blur-image' key={i}>                            
                                  <BouncyImg id={i} src={item.src}/>
                                  <p id="movie-plot">
                                    {item.plot}
                                  </p>
                                </div>}
                          else {
                            
                          return <div className='images-basic' key={i}>                            
                                  <BouncyImg src={item.src} plot={item.plot}/>
                                  <p>{item.plot}</p>
                                </div>}

                          }):null}

                    </div>  
                    <Button onClick={(e)=>toggleRight(e, renderedItems)} className='w-20'>›</Button>
                      
            </Container>
    </Fade>)}


export default Films;
