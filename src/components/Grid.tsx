import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import Node from "./Node";

type gridProps = {
  cellSize: number;
  speed: number;
  isRunning: boolean;
  stopRunning: () => void;
  init: boolean;
  setInit: React.Dispatch<React.SetStateAction<boolean>>;
};

const Grid = ({
  isRunning,
  stopRunning,
  cellSize,
  speed,
  init,
  setInit,
}: gridProps) => {
  const [grid, setGrid] = useState<any[]>(
    new Array(20).fill(false).map((row) => new Array(20).fill(false))
  );
  const [mouseDown, setMouseDown] = useState(false);
  const handleResize = useCallback(() => {
    setGridSize();
  }, [cellSize]);

  useEffect(() => {
    setGridSize();
    window.addEventListener("mouseup", (e) => setMouseDown(false));
    window.addEventListener("mousedown", (e) => {
      e.preventDefault();
      setMouseDown(true);
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mouseup", (e) => setMouseDown(false));
      window.removeEventListener("mousedown", (e) => {
        e.preventDefault();
        setMouseDown(true);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        runSimulation();
      }, speed);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, grid]);

  useEffect(() => {
    if (init === false) {
      const container = document.getElementById("gridContainer");
      if (container) {
        let numRows = Math.floor(container?.clientHeight / cellSize);
        let numCols = Math.floor(container?.clientWidth / cellSize);
        setGrid(
          new Array(numRows)
            .fill(false)
            .map((row) => new Array(numCols).fill(false))
        );
      }
      setInit(true);
    }
  }, [init]);

  const setGridSize = () => {
    stopRunning();
    const container = document.getElementById("gridContainer");
    if (container) {
      let numRows = Math.floor(container?.clientHeight / cellSize);
      let numCols = Math.floor(container?.clientWidth / cellSize);
      setGrid(
        new Array(numRows)
          .fill(false)
          .map((row) => new Array(numCols).fill(false))
      );
    }
  };

  const handleNodeToggle = (pos: [number, number]) => {
    let [row, col] = pos;
    let updatedGrid = [...grid];
    updatedGrid[row][col] = !updatedGrid[row][col];
    setGrid(updatedGrid);
  };

  const runSimulation = () => {
    let updatedGrid = grid.map((row: boolean[], rIdx) => {
      return row.map((alive: boolean, cIdx) => {
        let neighbors = getNeighbors([rIdx, cIdx]);
        if (alive) {
          if (!(neighbors == 2 || neighbors == 3)) return false;
        } else if (neighbors == 3) {
          return true;
        }
        return alive;
      });
    });
    setGrid(updatedGrid);
  };

  const getNeighbors = (pos: [number, number]) => {
    let [row, col] = pos;
    let numNeighbors = 0;
    let deltas = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (let delta of deltas) {
      const [dx, dy] = delta;
      if (isInbounds([row + dx, col + dy]) && grid[row + dx][col + dy] == true)
        numNeighbors += 1;
    }
    return numNeighbors;
  };
  const isInbounds = (pos: [number, number]) => {
    let [row, col] = pos;
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length)
      return true;
    else return false;
  };

  return (
    <div id="gridContainer">
      {/* <div className="count-module">{counter}</div> */}
      <div className="grid">
        {grid.map((row: [boolean], rowIdx: number) => (
          <div className="row" key={rowIdx} style={{ height: cellSize }}>
            {row.map((col: boolean, colIdx: number) => (
              <Node
                key={String(rowIdx) + "," + String(colIdx)}
                pos={[rowIdx, colIdx]}
                alive={col}
                toggleNode={handleNodeToggle}
                mouseDown={mouseDown}
                cellSize={cellSize ? cellSize : null}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
