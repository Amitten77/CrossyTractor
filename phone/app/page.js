"use client"
import React from 'react';
import { useState } from 'react';

const buttonStyles = {
  height: "50px",
};

const divStyles = {
  width: "30px",
  height: "30px",
  backgroundColor: "#ffab56",
  borderRadius: "50%",
  position: "fixed",
  left: "30%",
  right: "30%"
};

export default function Home() {
//   var px = 50; // Position x and y
// var py = 50;
// var vx = 0.0; // Velocity x and y
// var vy = 0.0;
var updateRate = 1/60; // Sensor refresh rate
const [divStyle, setDivStyle] = useState({
  width: "30px",
  height: "30px",
  backgroundColor: "#ffab56",
  borderRadius: "50%",
  position: "fixed",
  left: "30%",
  right: "30%"
});

const [buttonClicked, setButtonClicked] = useState("nah");
const [px, setPx] = useState(50);
const [py, setPy] = useState(50);
const [vx, setVx] = useState(50);
const [vy, setVy] = useState(50);

function getAccel() {
    setButtonClicked("yeah");
    console.log("OIASJ")
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
       // Add a listener to get smartphone orientation 
           // in the alpha-beta-gamma axes (units in degrees)
            window.addEventListener('deviceorientation',(event) => {
                // Expose each orientation angle in a more readable way
                rotation_degrees = event.alpha;
                frontToBack_degrees = event.beta;
                leftToRight_degrees = event.gamma;
                
                // Update velocity according to how tilted the phone is
                // Since phones are narrower than they are long, double the increase to the x velocity
                //vx = vx + leftToRight_degrees * updateRate*2; 
                //vy = vy + frontToBack_degrees * updateRate;
                setVx(vx + leftToRight_degrees * updateRate*2)
                setVy(vy + frontToBack_degrees * updateRate)
                // Update position and clip it to bounds



                //px = px + vx*.5;
                setPx(px + vx*.5);



                if (px > 98 || px < 0){ 
                    //px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
                    //vx = 0;
                    setPx(Math.max(0, Math.min(98, px)))
                    setVx(0)

                }

                //py = py + vy*.5;

                setPy(py + vy*.5)
                if (py > 98 || py < 0){
                    // py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
                    // vy = 0;
                    setPy(Math.max(0, Math.min(98, py)))
                    setVy(0)
                }
                
                dot = document.getElementById("indicatorDot")
                // dot.setAttribute('style', "left:" + (px) + "%;" +
                //                               "top:" + (py) + "%;");
                setDivStyle({
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#ffab56",
                  borderRadius: "50%",
                  position: "fixed",
                  left: px.toString() + "%",
                  right: py.toString() + "%"
                });
            });
        }
    });
}

  return (
    <main>
      <button id="accelPermsButton"  style={buttonStyles} onClick={getAccel}><h1>Get Accelerometer Permissions</h1></button>
      <p>{buttonClicked}</p>
      <p>Velocity: ({vx}, {vy})</p>
      <p>Position: ({px}, {py})</p>
      <div class="indicatorDot" id="indicatorDot" style={divStyle}></div>
    </main>
  )
}
