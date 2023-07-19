"use client"
import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js';


const Game = () => {


const SPEED = 5;
const pixiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application<HTMLCanvasElement>({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xAAAAAA,
      });
  
      // Append the Pixi.js canvas to the container element
      if (pixiContainerRef.current) {
        pixiContainerRef.current.appendChild(app.view);
      }

    const bunny = PIXI.Sprite.from('./players/mario.ico');

    // center the sprite's anchor point
    bunny.anchor.set(0.5);
    
    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    bunny.width = 50;
    bunny.height = 50;
    
    app.stage.addChild(bunny);

    app.ticker.add((delta) =>  //GOATED FUNCTION
  {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      //setTime(time + 1);
      //console.log(time);
      //W
      if (keys["87"]) {
        bunny.y -= SPEED
      }
      //A
      if (keys["65"]) {
        bunny.x -= SPEED
      }
      //S
      if (keys["83"]) {
        bunny.y += SPEED
      }
      //D
      if (keys["68"]) {
        bunny.x += SPEED
      }
      bunny.rotation += 0.01 * delta;



  });

  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);

  type tplotOptions = {
    [key: string]: boolean
}

  let keys: tplotOptions = {};

  function keysDown(e: any) {
    keys[e.keyCode] = true;
  }

  function keysUp(e: any) {
    keys[e.keyCode] = false;
  }




  }, [])
  return (
    <div ref={pixiContainerRef} id="gameDiv">
        Game
    </div>
  )
}

export default Game