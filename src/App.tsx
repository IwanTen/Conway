import { useState } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";

import "./styles/App.css";

const DEFAULT_SPEED = 50;
const DEFAULT_SIZE = 20;

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [cellSize, setCellSize] = useState(20);
  const [simSpeed, setSimSpeed] = useState(20);

  return (
    <div className="app">
      <h1 className="watermark">CONWAY</h1>
      <Header
        clearGrid={() => {
          setInitialized(false);
        }}
        toggleSimulation={() => setIsRunning(!isRunning)}
        isRunning={isRunning}
        setCellSize={(s: number) => setCellSize(s)}
        setSimSpeed={(s: number) => setSimSpeed(s)}
        defaultSpeed={DEFAULT_SPEED}
        defaultSize={DEFAULT_SIZE}
      />
      <div className="content-wrapper">
        <Grid
          cellSize={cellSize}
          speed={simSpeed}
          isRunning={isRunning}
          stopRunning={() => setIsRunning(false)}
          init={initialized}
          setInit={setInitialized}
        />
      </div>
    </div>
  );
}

export default App;
