import React, { useEffect, useRef, useState } from "react";
import ReactDice, { ReactDiceRef } from "react-dice-complete";
import "./App.css";

function App() {
  const [num, setNum] = useState(5);
  const [checkUniq, setCheckUniq] = useState(false);
  const [rolltime, setRolltime] = useState("");
  const [opac, setOpac] = useState(100);
  const [rollt, setRollt] = useState(2);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const noDice = parseInt(params.get("d") || "5");
    setNum(noDice);
  }, []);

  const reactDice = useRef<ReactDiceRef>(null);

  const getRandomIntInclusive = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  };

  const rollDone = (totalValue: number, values: number[]) => {
    console.log("individual die values array:", values);
    console.log("total dice value:", totalValue);
  };

  const rollAll = () => {
    const set = new Set<number>();
    let a = [];
    if (num <= 6 && checkUniq) {
      while (set.size < num) {
        set.add(getRandomIntInclusive(1, 6));
      }
      reactDice.current?.rollAll([...set]);
    } 
    else if (num > 6 && checkUniq){
      reactDice.current?.rollAll([...set]);
    }
    else {
      do {
        set.clear();
        a = [];
        for (let i = 0; i < num; i++) {
          a.push(getRandomIntInclusive(1, 6));
        }
        a.forEach((x) => set.add(x));
      } while (num <= 6 && num >2 && set.size === num);
      reactDice.current?.rollAll(a);
    }
    var d = new Date();
    setRolltime(d.toLocaleString());
  };

  const handleUnique = () => {
    setCheckUniq(!checkUniq);
  };

  const handleHide = () => {
    setOpac((prev) => {
      if (prev === 100) return 0;
      return 100;
    });
  };

  return (
    <div className="container">
      <div style={{ opacity: opac }} className="diceContainer">
        <ReactDice
          disableIndividual={true}
          defaultRoll={getRandomIntInclusive(1, 6)}
          numDice={num}
          dieSize={60}
          ref={reactDice}
          rollDone={rollDone}
          rollTime={rollt}
        />
      </div>
      <div className="subcontainer">
        <div>
          <button
            title="roll"
            onClick={() => rollAll()}
            type="button"
            className="button-8"
          >
            roll
          </button>
          <button
            type="button"
            title="hide"
            onClick={handleHide}
            className="button-8"
          >
            {opac === 0 ? "show" : "Hide"}
          </button>
        </div>
        <div>
          <input
            type="checkbox"
            name="checkuniq"
            id="checkuniq"
            title="checkuniq"
            checked={checkUniq}
            onChange={handleUnique}
            disabled={num>6?true:false}
          />
          <label htmlFor="checkuniq">unique?</label>
        </div>
        <div style={{marginTop:"5px"}}>{rolltime || "not rolled yet"}</div>
      </div>
    </div>
  );
}

export default App;
