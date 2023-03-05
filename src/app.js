import "./scss/main.scss";

import barba from "@barba/core";
import gsap from "gsap";
import _ from "lodash";

window.addEventListener(
  "load",
  pageLoaded
)

/**
 * Execute when the site has been loaded into for
 * the first time;
 */
function pageLoaded(){
  closeLoadingScreen();
  initializeBarba();
  return;
}

function closeLoadingScreen(){
  return new Promise(
    ( resolve, reject ) => {
      // get transition container
      let transition_container = document.querySelector( ".transition-container" );
      if( _.isElement( transition_container ) == false ){
        reject( "Null DOM Object: .transition-container" );
      }

      let anim = gsap.timeline()
      anim.set(
        transition_container,
        {
          xPercent: 0,
          opacity: 1,
        }
      )

      anim.to(
        transition_container,
        {
          xPercent: -150,
          opacity: 0,
          duration: ( index, target ) => {
            return 2.5;
          },
          ease: "power2.inOut"
        },
        "+0.5"
      )

      anim.then(
        ( val ) => {
          transition_container.setAttribute( "data-state", "hidden" );

          anim.revert();
          anim.kill();
          resolve( "Complete" );
          return;
        }
      )

    }
  );
}

function initializeBarba(){
  barba.init({
    transitions: [
      // default transition
      {
        name: "default-transition",
        leave(){
          console.log( "leave transition" );
          let transition_container = document.querySelector( ".transition-container" );

          transition_container.setAttribute( "data-state", "visible" );

          let anim = gsap.fromTo(
            transition_container,
            {
              xPercent: -150,
            },
            {
              xPercent: 0,
              duration: 1.5
            }
          )

          return anim;
        },
        after(){
          console.log( "enter transition" );
          let transition_container = document.querySelector( ".transition-container" );

          transition_container.setAttribute( "data-state", "visible" );

          let anim = gsap.fromTo(
            transition_container,
            {
              xPercent: 0,
            },
            {
              xPercent: 150,
              delay: 0.5,
              duration: 1.5
            }
          )

          return anim;
        }
      }
    ]
  })

  return;
}

// import(
//   /* webpackChunkName: "about" */
//   /* webpackMode: "lazy" */
//   /* webpackExports: ["default"] */
//   `./scripts/about.js`
//   ).then(
//     module => {
//       console.log( module.default() );
//     }
//   )

// require.ensure([], () => {
//   const script = require( "./scripts/index" ).default;
//   script();
// }, "index");