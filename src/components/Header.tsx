import ReactSlider from "react-slider";
import {
  MdPlayArrow,
  MdStop,
  MdClose,
  MdAspectRatio,
  MdSpeed,
} from "react-icons/md";
import { useEffect, useState } from "react";

// const mapRange = (
//   value: number,
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number
// ) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

type Props = {
  toggleSimulation: () => void;
  isRunning: boolean;
  clearGrid: () => void;
  setCellSize: (s: number) => void;
  setSimSpeed: (s: number) => void;
  defaultSpeed: number;
  defaultSize: number;
};

const Header = ({
  toggleSimulation,
  clearGrid,
  setCellSize,
  setSimSpeed,
  defaultSize,
  defaultSpeed,
  isRunning,
}: Props) => {
  const [size, setSize] = useState(defaultSize);
  const [speed, setSpeed] = useState(defaultSpeed);

  useEffect(() => {
    if (size) setCellSize(size);
  }, [size]);

  useEffect(() => {
    if (speed) setSimSpeed(speed);
  }, [speed]);
  return (
    <div className="header">
      <h1 className="header__title">Game of Life</h1>
      <div className="button-wrapper">
        <button
          className=" header__button  header__button--simulate"
          onClick={() => {
            toggleSimulation();
          }}
        >
          {isRunning ? (
            <>
              <MdStop size={25} /> Stop Simulation
            </>
          ) : (
            <>
              <MdPlayArrow size={25} /> Start Simulation
            </>
          )}
        </button>
        <button
          className=" header__button"
          onClick={() => {
            if (isRunning) toggleSimulation();
            clearGrid();
          }}
        >
          <MdClose size={20} />
          clear grid
        </button>
      </div>
      <div className="slider-wrapper">
        <MdSpeed size={30} color={"white"} />
        <ReactSlider
          className="slider"
          trackClassName="slider--track"
          thumbClassName="slider--thumb"
          min={50}
          max={500}
          defaultValue={defaultSpeed}
          value={speed}
          onChange={(value) => {
            setSpeed(value);
          }}
        />

        <MdAspectRatio size={28} color={"white"} />
        <ReactSlider
          className="slider"
          trackClassName="slider--track"
          thumbClassName="slider--thumb"
          min={20}
          max={60}
          value={size}
          defaultValue={defaultSize}
          onChange={(value) => {
            setSize(value);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
