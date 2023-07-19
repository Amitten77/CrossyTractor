"use client"
import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js';
import { get } from 'http';
import { start } from 'repl';
import random from 'random'


const Game = () => {

let enemiesObjects: any[] = []
let cornObjects: any[] = []
let currentTime = 0


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
      currentTime += 1
      if (currentTime > 100) {
        let randomNum = random.int(1,2)
            if (randomNum==2) {
              const corn = PIXI.Sprite.from('./players/corn.ico');
              corn.anchor.set(0.5)
              corn.width = 50
              corn.height = 50
              corn.x = app.screen.width - corn.width
              corn.y = random.int(0+corn.height, app.screen.height-corn.height)
              app.stage.addChild(corn)
              cornObjects.push(corn)
            } else if (randomNum==1) {
              const obstacle = PIXI.Sprite.from('./players/bowser.ico');
              obstacle.width = 50
              obstacle.height = 50
              obstacle.anchor.set(0.5);
              obstacle.x = app.screen.width - obstacle.width
              obstacle.y = random.int(0+obstacle.height, app.screen.height-obstacle.height)
              app.stage.addChild(obstacle)
              enemiesObjects.push(obstacle)
            }
        currentTime = 0
      }
      for (const i of enemiesObjects) {
        i.x -= .5
      }
      for (const j of cornObjects) {
        j.x -= .5
      }

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
        
    </div>
  )
}

export default Game