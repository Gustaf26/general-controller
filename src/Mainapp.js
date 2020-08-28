import React from 'react';
import {NavLink} from 'react-router-dom';
import {Container} from 'reactstrap';
import './slide-style.scss'


const slides = [
    {id:'image',
      title: "Stardust Image",
      subtitle: "It never looked better",
      description: "Adventure is never far away",
      image:
        "https://images.unsplash.com/photo-1506241537529-eefea1fbe44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
    },
    {id:'text',
      title: "Stardust Text",
      subtitle: "Once upon a time",
      description: "Let your dreams come true",
      image:
        "https://images.unsplash.com/photo-1543769657-fcf1236421bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
    },
    {id:'films',
      title: "Stardust Films",
      subtitle: "Watch this",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/photo-1542204637-e67bc7d41e48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
    },
    {id:'games',
      title: "Stardust Games",
      subtitle: "Shall we play?",
      description: "LOI always wins",
      image:
        "https://images.unsplash.com/photo-1529154691717-3306083d869e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
    }
  ];
  
  function useTilt(active) {
    const ref = React.useRef(null);
  
    React.useEffect(() => {
      if (!ref.current || !active) {
        return;
      }
  
      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined
      };
  
      let el = ref.current;
  
      const handleMouseMove = (e) => {
        if (!el) {
          return;
        }
        if (!state.rect) {
          state.rect = el.getBoundingClientRect();
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        const px = (state.mouseX - state.rect.left) / state.rect.width;
        const py = (state.mouseY - state.rect.top) / state.rect.height;
  
        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      };
  
      el.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
      };
    }, [active]);
  
    return ref;
  }
  
  const initialState = {
    slideIndex: 0
  };
  
  const slidesReducer = (state, event) => {
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length
      };
    }
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
      };
    }
  };
  
  function Slide({ slide, offset }) {
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);
  
    return (
      <div
        ref={ref}
        className="slide"
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
        }}
      >
        <div
          className="slideBackground"
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
        />
        <div
          className="slideContent"
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
        >
          <div className="slideContentInner">

          {slide.id=="text"? 
              <NavLink id="nav" to="/textinput">
                <h2 className="slideTitle">{slide.title}</h2>
              </NavLink>:

                /* slide.id=="films"? 
                <NavLink id="nav" to="/films">
                  <h2 className="slideTitle">{slide.title}</h2>
                </NavLink>: */
                
                <h2 className="slideTitle">{slide.title}</h2>}

              <h3 className="slideSubtitle">{slide.subtitle}</h3>
              <p className="slideDescription">{slide.description}</p>  
          </div>
        </div>
      </div>
    );
  }
  
  function Mainapp() {
    const [state, dispatch] = React.useReducer(slidesReducer, initialState);
  
    return (
      <Container className="slides">
         <button onClick={() => dispatch({ type: "NEXT" })}>‹</button>
  
        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "PREV" })}>›</button>
      </Container>
    );
  }

  export default Mainapp