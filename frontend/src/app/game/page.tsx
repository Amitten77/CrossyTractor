"use client"
import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js';
import { get } from 'http';
import { start } from 'repl';
import random from 'random'
import Constant from '../../../config.json'


const Game = () => {

let enemiesObjects: any[] = []
let cornObjects: any[] = []
let currentTime = 0
let score: any = 0
let hearts: any = 3
let enemiesMap: any = {}

function rectsIntersect(a: any, b: any) {
  let aBox = a.getBounds();
  let bBox = b.getBounds();

  return aBox.x + aBox.width > bBox.x && bBox.x + bBox.width > aBox.x
          && aBox.y + aBox.height > bBox.y && bBox.y + bBox.height > aBox.y
}

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

    const user = PIXI.Sprite.from('./players/combine-removebg-preview.ico');
    
    // center the sprite's anchor point
  user.anchor.set(0.5);
    
    // move the sprite to the center of the screen
  user.x = app.screen.width / 2;
  user.y = app.screen.height / 2;
  user.width = 50;
  user.height = 50;
    
    app.stage.addChild(user);

    app.ticker.add((delta) =>  //GOATED FUNCTION
  {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      //setTime(time + 1);
      //console.log(time);
      //W

      currentTime += 1
      if (currentTime > 300) {
        let randomNum = random.int(1,2)
            if (randomNum==2) {
              const corn = PIXI.Sprite.from('./players/corn-removebg-preview.ico');
              corn.anchor.set(0.5)
              corn.width = 50
              corn.height = 50
              corn.x = app.screen.width - corn.width
              corn.y = random.int(0+corn.height, app.screen.height-corn.height)
              app.stage.addChild(corn)
              cornObjects.push(corn)
            } else if (randomNum==1) {
              let randomNum2 = random.int(0,1)
              let obstacle: any = -1
              if (randomNum2==1) {
                obstacle = PIXI.Sprite.from('./players/pig.ico');
              } else {
                obstacle = PIXI.Sprite.from('./players/cow-removebg-preview.ico')
              }
              obstacle.width = 50
              obstacle.height = 50
              obstacle.anchor.set(0.5);
              obstacle.x = app.screen.width - obstacle.width
              obstacle.y = random.int(0+obstacle.height, app.screen.height-obstacle.height)
              app.stage.addChild(obstacle)
              enemiesObjects.push(obstacle)
              enemiesMap[obstacle] = false
            }
        currentTime = 0
      }
      for (const i of enemiesObjects) {
        i.x -= .5
        if (rectsIntersect(user, i)) {
          if (!enemiesMap[i]) {
            hearts -= 1
            enemiesMap[i] = true
          }
          app.stage.removeChild(i)
          let elementToRemove: any = i
          cornObjects = cornObjects.filter(item => item !== elementToRemove)
          console.log(hearts)
          if (hearts <= 0) {
            window.location.replace(Constant.rootURL + '/endGame')
            localStorage.setItem('score', score.toString());
          }
          
        }
      }
      for (const j of cornObjects) {
        j.x -= .5
        if (rectsIntersect(user, j)) {
          score += 1
          app.stage.removeChild(j)
          let elementToRemove: any = j
          cornObjects = cornObjects.filter(item => item !== elementToRemove)
          console.log(score)
        }
      }

      if (keys["87"]) {
        user.y -= SPEED
      }
      //A
      if (keys["65"]) {
        user.x -= SPEED
      }
      //S
      if (keys["83"]) {
        user.y += SPEED
      }
      //D
      if (keys["68"]) {
        user.x += SPEED
      }
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