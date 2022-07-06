type nodeProps = {
  toggleNode: any;
  pos: [number, number];
  alive: boolean;
  mouseDown: boolean;
  cellSize: number | null;
};

const Node = ({ toggleNode, pos, alive, cellSize, mouseDown }: nodeProps) => {
  return (
    <div
      className={`node ${alive ? "node--alive" : ""}
      }`}
      onMouseEnter={() => {
        if (mouseDown && !alive) toggleNode(pos);
      }}
      onMouseDown={() => {
        toggleNode(pos);
      }}
      style={cellSize !== null ? { width: cellSize } : {}}
    >
      {alive}
    </div>
  );
};

export default Node;

//```` backticks
