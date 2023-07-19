"use client"
import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js';
import { get } from 'http';
import { start } from 'repl';
import random from 'random'
import Constant from '../../../config.json'


const Game = () => {

let enemySpeed: any = 0.5
let cornSpeed: any = 0.5
let enemiesObjects: any[] = []
let cornObjects: any[] = []
let currentTime = 0
let score: any = 0
let hearts: any = 3
let enemiesMap: any = {}
let scoreIncreaseTimeTracker: any = 0

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

      const background = PIXI.Sprite.from('./players/background.png');

      background.anchor.set(0.5)


      background.x = app.screen.width / 2
      background.y =  app.screen.height / 2
      background.width = app.screen.width * 1;

      background.height = app.screen.height * 1;

      app.stage.addChild(background)



    const user = PIXI.Sprite.from('./players/combine (1).ico');
    
    // center the sprite's anchor point
  user.anchor.set(0.5);
    
    // move the sprite to the center of the screen
  user.x = app.screen.width / 2;
  user.y = app.screen.height / 2;
  user.width = 150;
  user.height = 100;
    
    app.stage.addChild(user);

    app.ticker.add((delta) =>  //GOATED FUNCTION
  {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      //setTime(time + 1);
      //console.log(time);
      //W

      if (user.x < 75) {
        user.x = 75
      }
      if (user.y < 350) {
        user.y = 350
      }
      if (user.x > 1365) {
        user.x = 1365
      }
      if (user.y > 540) {
        user.y = 540
      }
      currentTime += 1
      scoreIncreaseTimeTracker += 1
      if (currentTime > 300) {
        let randomNum = 0
        if (scoreIncreaseTimeTracker <= 300) {
          randomNum = random.int(1,4)
        } else if (scoreIncreaseTimeTracker > 300 && scoreIncreaseTimeTracker <= 600) {
          randomNum = random.int(1,3)
          enemySpeed += 0.5
          cornSpeed += 0.5
        } else {
          randomNum = random.int(1,2)
          enemySpeed += 0.5
          cornSpeed += 0.5
        }
            if (randomNum==2 || randomNum==3 || randomNum==4) {
              const corn = PIXI.Sprite.from('./players/corn-removebg-preview.ico');
              corn.anchor.set(0.5)
              corn.width = 75
              corn.height = 75
              corn.x = app.screen.width - corn.width
              corn.y = random.int(350, 540)
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
              obstacle.width = 75
              obstacle.height = 75
              obstacle.anchor.set(0.5);
              obstacle.x = app.screen.width - obstacle.width
              obstacle.y = random.int(350, 540)
              app.stage.addChild(obstacle)
              enemiesObjects.push(obstacle)
              enemiesMap[obstacle] = false
            }
        currentTime = 0
      }
      for (const i of enemiesObjects) {
        i.x -= enemySpeed
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
        j.x -= cornSpeed
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