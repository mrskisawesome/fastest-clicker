import { useState, useEffect } from "react";

export default function App() {
  const [clicks, setClicks] = useState(0);
  const [cps, setCps] = useState(1); //clicks per second
  const [clickStart, startClicks] = useState(false);

  useEffect(() => {
    if (clickStart === true) {
      const clickInterval = setInterval(() => {
        setClicks((currentClicks) => currentClicks + 1);
      }, 1000 / cps);

      return () => {
        clearInterval(clickInterval);
      };
    }
  }, [cps]);

  function increaseCps() {
    setClicks(clicks - 10);
    setCps(cps + 1);
  }
  function increaseCps10() {
    setClicks(clicks - 100);
    setCps(cps + 10);
  }
  function handleClick() {
    setClicks(clicks + 1);
    startClicks(true);
  }

  return (
    <>
      <div>
        <p> Target = 10,000 clicks </p>
        <p>Clicks:{clicks}</p>
        <p> Clicks per second: {cps} </p>
        <button onClick={handleClick}>
          Click me - how quick can you get to 10,000
        </button>

        {clicks > 10 && (
          <div className="points-greater-than-10">
            <button className="upgrade" onClick={increaseCps}>
              Double time! Buy for 10 clicks
            </button>
          </div>
        )}
        {clicks > 100 && (
          <div className="points-greater-than-100">
            <button className="upgrade" onClick={increaseCps10}>
              Super fast clicking! Buy for 100 clicks
            </button>
          </div>
        )}
      </div>
    </>
  );
}
