import "./styles.css";
import { useState } from "react";
const itemHeight = 20;
const divHeight = 500;

export default function App() {
  const arr = Array.from({ length: 10000 }, (_, i) => i + 1);
  const [indices, setIndices] = useState([0, 0, divHeight / itemHeight]);

  const listToRender = () => {
    return arr.slice(indices[1], indices[2]).map((elem) => (
      <div key={elem} style={{ height: itemHeight }}>
        {elem}
      </div>
    ));
  };

  const handleScroll = (e) => {
    const { scrollTop } = e.currentTarget;
    setIndices([
      scrollTop,
      Math.floor(scrollTop / itemHeight),
      Math.ceil((scrollTop + divHeight) / itemHeight),
    ]);
  };

  return (
    <div
      className="App"
      style={{ height: divHeight, overflow: "auto", position: "relative" }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: arr.length * itemHeight,
          top: indices[1] * itemHeight,
          position: "absolute",
        }}
      >
        {listToRender()}
      </div>
    </div>
  );
}
