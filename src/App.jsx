import { useState, useEffect } from "react";
import "./index.css";
//an array of objects with the key name which links to how cps is increased and what they cost
const upgrades = [
  { name: "Double time!", cpsIncrease: 1, cost: 10 },
  { name: "Super fast clicking!", cpsIncrease: 10, cost: 100 },
  { name: "Lightspeed clicking!!!!", cpsIncrease: 100, cost: 1000 },
  // I could add more upgrades as needed - if I add more I can get more buttons and more upgrades
];
export default function App() {
  const [clicks, setClicks] = useState(0);
  const [cps, setCps] = useState(1); //clicks per second
  const [clickStart, startClicks] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let clickInterval; //had to move this outside the conditional as it wasn't running unless the condition was met

    if (clickStart && clicks <= 10000) {
      clickInterval = setInterval(() => {
        setClicks((currentClicks) => currentClicks + 1);
        if (!startTime) {
          setStartTime(Date.now());
        }
      }, 1000 / cps);
    }
    return () => {
      clearInterval(clickInterval);
      if (clicks >= 10000) {
        setClicks(0);
        setCps(1); //resets the game
        setTimeElapsed(Date.now() - startTime); // Calculate timeElapsed
        setStartTime(null); //sets the timer back to beginning for next game
        startClicks(false);
      }
    };
  }, [cps, clickStart, clicks, startTime]); // Added timerId to dependencies

  // function increaseCps(num) {
  //   setClicks(clicks - num * 10);
  //   setCps(cps + num);
  // }

  function handleClick() {
    setClicks(clicks + 1);
    startClicks(true);
  }
  function buyUpgrade(upgrade) {
    if (clicks >= upgrade.cost) {
      setClicks(clicks - upgrade.cost);
      console.log(clicks - upgrade.cost);
      setCps(cps + upgrade.cpsIncrease);
    }
  }
  return (
    <>
      <div className="main">
        <p> Target = 10,000 clicks </p>
        <p>Clicks:{clicks}</p>
        <p> Clicks per second: {cps} </p>
        <p>Elapsed Time: {timeElapsed / 1000} seconds </p>

        <button onClick={handleClick}>
          Click me - how quick can you get to 10,000
        </button>
        {upgrades.map((upgrade, index) => (
          <div key={index} className={`points-greater-than-${upgrade.cost}`}>
            <button
              className="upgrade"
              onClick={() => buyUpgrade(upgrade)}
              disabled={clicks < upgrade.cost}
            >
              {upgrade.name} - Buy for {upgrade.cost} clicks
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
