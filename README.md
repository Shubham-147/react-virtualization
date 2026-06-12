# React Virtualized List

A lightweight implementation of list virtualization (windowing) in React that efficiently renders large datasets by displaying only the items currently visible in the viewport.

## Overview

Rendering thousands of DOM nodes can negatively impact application performance. This project demonstrates a simple virtualization technique where only the visible portion of a large list is rendered.

In this example:

- Total Items: 10,000
- Item Height: 20px
- Viewport Height: 500px
- Rendered Items at a Time: ~25

This significantly reduces the number of DOM elements rendered and improves scrolling performance.

---

## Features

- Virtual scrolling implementation from scratch
- Handles large datasets efficiently
- Minimal DOM rendering
- Smooth scrolling experience
- No external libraries required

---

## Project Structure

```jsx
import "./styles.css";
import { useState } from "react";

const itemHeight = 20;
const divHeight = 500;

export default function App() {
  const arr = Array.from({ length: 10000 }, (_, i) => i + 1);

  const [indices, setIndices] = useState([
    0,
    0,
    divHeight / itemHeight
  ]);

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
      Math.ceil((scrollTop + divHeight) / itemHeight)
    ]);
  };

  return (
    <div
      style={{
        height: divHeight,
        overflow: "auto",
        position: "relative"
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: arr.length * itemHeight,
          top: indices[1] * itemHeight,
          position: "absolute"
        }}
      >
        {listToRender()}
      </div>
    </div>
  );
}
```

---

## How It Works

### 1. Create a Large Dataset

```javascript
const arr = Array.from({ length: 10000 }, (_, i) => i + 1);
```

Generates an array containing 10,000 items.

---

### 2. Track Visible Range

```javascript
const [indices, setIndices] = useState([
  0,
  0,
  divHeight / itemHeight
]);
```

State stores:

| Index | Description |
|---------|-------------|
| 0 | Current scroll position |
| 1 | Start index |
| 2 | End index |

---

### 3. Calculate Visible Items

```javascript
const startIndex = Math.floor(scrollTop / itemHeight);

const endIndex = Math.ceil(
  (scrollTop + divHeight) / itemHeight
);
```

Example:

```text
scrollTop = 200
itemHeight = 20

startIndex = 10
endIndex = 35
```

Only items between indices 10 and 35 are rendered.

---

### 4. Render Only Visible Items

```javascript
arr.slice(startIndex, endIndex)
```

Instead of rendering all 10,000 elements:

```javascript
arr.map(...)
```

Only the visible portion is displayed.

---

### 5. Simulate Full List Height

```javascript
height: arr.length * itemHeight
```

This creates a scrollable area equivalent to the full list height.

```text
10000 × 20 = 200000px
```

The scrollbar behaves as if every item exists in the DOM.

---

### 6. Position Visible Items Correctly

```javascript
top: startIndex * itemHeight
```

Moves the rendered subset to its correct position within the virtual container.

---

## Complexity Analysis

### Without Virtualization

| Metric | Value |
|----------|--------|
| DOM Nodes | 10,000 |
| Render Time | O(n) |
| Memory Usage | High |

---

### With Virtualization

| Metric | Value |
|----------|--------|
| DOM Nodes | ~25 |
| Render Time | O(visibleItems) |
| Memory Usage | Low |

---

## Performance Benefits

### Traditional Rendering

```javascript
arr.map(...)
```

- Creates 10,000 DOM nodes
- Slower initial render
- Increased memory consumption

### Virtualized Rendering

```javascript
arr.slice(startIndex, endIndex)
```

- Creates only visible DOM nodes
- Faster rendering
- Lower memory usage
- Better scrolling performance

---

## Possible Improvements

### Add Overscan

Render a few extra items above and below the viewport.

```javascript
const overscan = 5;

const startIndex = Math.max(
  0,
  Math.floor(scrollTop / itemHeight) - overscan
);

const endIndex = Math.min(
  arr.length,
  Math.ceil((scrollTop + divHeight) / itemHeight) + overscan
);
```

Benefits:

- Smoother scrolling
- Reduced visual flickering

---

### Memoize Data

```javascript
const arr = useMemo(
  () => Array.from({ length: 10000 }, (_, i) => i + 1),
  []
);
```

Prevents unnecessary array recreation on each render.

---

### Debounce Scroll Events

```javascript
requestAnimationFrame(() => {
  updateVisibleItems();
});
```

Improves performance during rapid scrolling.

---

## Use Cases

- Infinite scrolling feeds
- Chat applications
- Data tables
- File explorers
- Search results
- Log viewers
- Analytics dashboards

---

## Key Takeaway

Virtualization improves rendering performance by displaying only the visible portion of a large dataset. This approach drastically reduces DOM node count and memory usage while maintaining a seamless scrolling experience.

🚀 A simple yet powerful optimization technique frequently used in production applications such as React Window and React Virtualized.
