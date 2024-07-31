import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { GithubIcon, LinkedInIcon, SunIcon } from '../Icons'


/*
  Working with "flexbox"
  main axis:  defined by 'flex-direction' property
  cross axis: perpendicular to main axis
        
   main axis: four possible values 
        row / row-reverse,        left to right, and right to left
        column / column-reverse,  up to down, and down to up  (?? not sure on which order) 

   cross axis: perpendicular to main axis 
        
    quick-read:
    https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
*/

const Header = () => {
  return (
    /*  w-full            : | Sizing  : Width   | -> [width: 100%] setting the width of an element                      [ex: w-9/12]
        p-4               : | Spacing : Padding | -> control element's padding (times 4: p-4 => p-16)                   [ex: p-0]
        px-5              : | Spacing : Padding | -> overides overall padding (p-4 => px-10) (times 4: px-10 => px-40)  [ex: py-10]
        flex              : | Layout  : Display | -> utility to create a block-level flex container                     [ex: flex for parent class]
        
        items-center      : | Flexbox & Grid : Align Items     | -> 
                                    must be used with 'flex'
                                    center top to bottom                      [ex: items-start]
                                    aligns to center of container’s cross axis
        
        justify-between   : | Flexbox & Grid : Justify Content | -> 
                                    must be used with 'flex'
                                    center left to right                      [ex: justify-start]
                                    aligns to center of container’s main axis:                
    */
    <header className="w-full p-4 px-5 flex items-center justify-between">
        <Logo />

        {/* 
            w-max        : | Sizing  : Width   | -> [width: max-content] w-px, w-1, and w-64 set an element to a fixed width.
            py-3         : | Spacing : Padding | ->
            px-8         : | Spacing : Padding | -> 
            border       : | Borders : Border Width | -> [border-width: 1px] control width of element's borders
            border-solid : | Borders : Border Style | -> [border-style: solid] control style of element's borders
            border-dark  : border style
            rounded-full : | Borders : Border Radius | -> [border-radius: 9999px]  control border radius of element
            font-medium  : | Typography : Font Weight | -> [font-weight: 500] controlling font weight of an element
            capitalize   : | Typography : Text Transform | -> [text-transform: capitalize] control transformation of text.
            
            items-center : | Flexbox & Grid : Align Items | -> [align-items: center] align items based on cross-axis
            
            hidden       : | Layout : Display |  -> [display: none] remove from the page layout     [ex: flex, inline]

            sm:flex      : 
            fixed        : | Layout : Position | -> [position: fixed] control how element is positioned in DOM
                                                    fixed utility to position an element relative to the browser window.
                                                    Any offsets w/ Top/Right/Bottom/Left are calculated relative to the viewport 
                                                    and the element will act as a position reference for absolutely positioned children.
                                                    A viewport is generally in Web Brower terms the browser window

            top-6        : | Layout : Top/Right/Bottom/Left | -> [top: 1.5rem; /* 24px]  control placement of positioned elements
                                                                top-*, right-*, bottom-*, left-*, and inset-* utilities to set the 
                                                                horizontal or vertical position of a positioned element.
            
            right-1/2    : | Layout : Top/Right/Bottom/Left | -> [right: 50%] 

            translate-x-1/2  : | Transforms : Translate | -> [transform: translateX(50%)] translate-x-* and translate-y-* utilities to translate an element
            bg-light/80      :
            backdrop-blur-sm : | Filters : Backdrop Blur | -> [backdrop-filter: blur(4px)]  applying backdrop blur filters to an element
            
            z-50             : | Layout : Z-Index | -> [z-index: 50] control the stack order of an element
                                                        useful for layering say 5 circles in a certain order
        */}
        <nav className=" w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize items-center hidden sm:flex
        fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50">
            <Link href="/" className="mr-2">Home</Link>
            <Link href="/about" className="mx-2">About</Link>
            <Link href="/contact" className="mr-2">Contact</Link>
            <button>
              <SunIcon />
            </button>
        </nav>

        
        <div>
            {/* 
              inline-block: | Layout : Display | -> [display: inline-block] 
                                                    inline, inline-block, and block utilities to control the flow of text and elements.
              
              w-6: | Sizing : Width | -> [width: 1.5rem; 24px] w-px, w-1, and w-64 to set an element to a fixed width
              h-6: | Sizing : Height| -> [height: 1.5rem; 24px] h-px, h-1, and h-64 to set an element to a fixed height

              mr-4: | Spacing : Margin | -> [margin-right: 1rem; 16px]  mt-*, mr-*, mb-*, and ml-* utilities to control the margin on ONE SIDE of an element.
                                                                        oppose to padding which is default on all sides
            */}
            <a href="http://" className="inline-block w-6 h-6 mr-4">

              {/*
                hover:scale-125: | Transforms : Scale | ->   only apply the scale-125 utility on hover.
                transition-all:  | Transitions & Animation : Transition Property | -> transition-property: all;
                                                                                      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                                                                                      transition-duration: 150ms;
                
                ease: | Transitions & Animation : Transition Timing Function | ->
                duration-200: | Transitions & Animation : Transition Duration | -> [transition-duration: 200ms] 
                
              */} 
              <LinkedInIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>
            <a href="http://" className="inline-block w-6 h-6 mr-4">
              <GithubIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>

        </div>
    </header>
  )
}

export default Header