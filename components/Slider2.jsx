'use client'

import React, { useState, useRef, useEffect } from 'react';
import GSAP from 'gsap';
import { Power2 } from 'gsap'
import { Draggable } from 'gsap/Draggable'; // Import Draggable from the specific
import Link from 'next/link';


GSAP.registerPlugin(Draggable); // Register the Draggable plugin
const Slider2 = ({articles}) => {

  const sliderContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const slide = slideRef.current;

    //const totalItems = items.length;
    //const slideWidth = slide.offsetWidth + parseInt(getComputedStyle(slide).marginRight, 10) * 2;
    //const visibleSlides = 4;
    //const sliderWidth = slideWidth * totalItems / visibleSlides;
    //slider.style.width = `${sliderWidth}px`;

    // Set up Draggable for the slider
    Draggable.create(slider, {
      type: 'x', // Only allow horizontal dragging
      edgeResistance: 0.5, // Add a resistance at the edges
      onDrag: function () {
        if (this.x > 0) {
          this.x = 0; // Prevent dragging more than 0
          GSAP.to(slider, { x: 0, ease: Power2.easeInOut, duration: 0.5 });
        }
        else if (this.x < (-slider.offsetWidth + sliderContainerRef.current.offsetWidth - 40)) {
          this.x = (-slider.offsetWidth + sliderContainerRef.current.offsetWidth - 40); // Prevent dragging more than 0
          GSAP.to(slider, { x: -slider.offsetWidth + sliderContainerRef.current.offsetWidth - 40, ease: Power2.easeInOut, duration: 0.5 });
        }
      },
    });

    GSAP.to(slider, { x: 0 });


  }, []);


  const slideLeft = () => {
    const currentPosition = parseFloat(getComputedStyle(sliderRef.current).transform.split(',')[4]);
    const newPosition = currentPosition + 320;

    if (newPosition <= 0) {
      GSAP.to(sliderRef.current, { x: newPosition, ease: Power2.easeInOut, duration: 0.5 });
    } else {
      GSAP.to(sliderRef.current, { x: 0, ease: Power2.easeInOut, duration: 0.5 });
    }
  };

  const slideRight = () => {
    const currentPosition = parseFloat(getComputedStyle(sliderRef.current).transform.split(',')[4]);
    const newPosition = currentPosition - 320;
    const sliderContainerWidth = sliderContainerRef.current.offsetWidth;
    const sliderWidth = sliderRef.current.offsetWidth;

    if (sliderWidth + newPosition >= sliderContainerWidth) {
      GSAP.to(sliderRef.current, { x: newPosition, ease: Power2.easeInOut, duration: 0.5 });
    } else {
      GSAP.to(sliderRef.current, { x: -(sliderWidth - sliderContainerWidth + 40), ease: Power2.easeInOut, duration: 0.5 });
    }
  };



  return (
    <div className="slider-container w-[90%] xl:w-[1275px] my-[100px] mx-auto" ref={sliderContainerRef}>
      <div className="slider" ref={sliderRef}>
        {articles.map((item, index) => (

          <div className="rounded-full slide" key={index} ref={slideRef}>
            <div className="card-item">
              <img src={item.img} alt="" />
              <div className="card-info">
                <Link href={"/"} className="card-title capitalise">{item.title}</Link>
                <p className="text-lg card-description line-clamp-4">{item.content[0].text[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='absolute left-0 z-40 flex bottom-[10px]'>
        <div className="slider-controls">
          <button onClick={slideLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={slideRight} className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Slider2