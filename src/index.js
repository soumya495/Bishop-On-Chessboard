const appEl = document.getElementById("app");
const size = 8;

// invidual row for squares
for (let i = 0; i < size; i++) {
  appEl.innerHTML += `<div class='row'></div>`;
}

const rows = document.querySelectorAll(".row");

// drawing the chessboard
rows.forEach((row, index) => {
  for (let i = 0; i < size; i++) {
    if (index % 2 !== 0) {
      if (i % 2 !== 0) {
        row.innerHTML += `<div class='square black'></div>`;
        row.childNodes[i].setAttribute("data-row", `${index}`);
        row.childNodes[i].setAttribute("data-col", `${i}`);
      } else {
        row.innerHTML += `<div class='square white'></div>`;
        row.childNodes[i].setAttribute("data-row", `${index}`);
        row.childNodes[i].setAttribute("data-col", `${i}`);
      }
    } else {
      if (i % 2 !== 0) {
        row.innerHTML += `<div class='square white'></div>`;
        row.childNodes[i].setAttribute("data-row", `${index}`);
        row.childNodes[i].setAttribute("data-col", `${i}`);
      } else {
        row.innerHTML += `<div class='square black'></div>`;
        row.childNodes[i].setAttribute("data-row", `${index}`);
        row.childNodes[i].setAttribute("data-col", `${i}`);
      }
    }
  }
});

const squares = document.querySelectorAll(".square");

// find the equivalent diagonal coordinates
function getDiagonalCoordinates(row, col) {
  let x = row,
    y = col;
  let coordinates = [];

  while (x < size && y < size) {
    if (x === size - 1 || y === size - 1) break;
    coordinates.push({ x: x + 1, y: y + 1 });
    x++;
    y++;
  }
  x = row;
  y = col;
  while (x >= 0 && y < size) {
    if (x === 0 || y === size - 1) break;
    coordinates.push({ x: x - 1, y: y + 1 });
    x--;
    y++;
  }
  x = row;
  y = col;
  while (x >= 0 && y >= 0) {
    if (x === 0 || y === 0) break;
    coordinates.push({ x: x - 1, y: y - 1 });
    x--;
    y--;
  }
  x = row;
  y = col;
  while (x < size && y >= 0) {
    if (x === size - 1 || y === 0) break;
    coordinates.push({ x: x + 1, y: y - 1 });
    x++;
    y--;
  }
  // console.log("All Coordinates", coordinates);
  return coordinates;
}

// (row, col) of hovered square
squares.forEach((square) => {
  square.addEventListener("mouseover", () => {
    const row = Number(square.getAttribute("data-row"));
    const col = Number(square.getAttribute("data-col"));
    // console.log("Current Square: ", row, col);
    const coordinates = getDiagonalCoordinates(row, col);

    // coloring the coordinates
    coordinates.forEach((coordinate) => {
      squares.forEach((sq) => {
        const row = Number(sq.getAttribute("data-row"));
        const col = Number(sq.getAttribute("data-col"));

        if (coordinate.x === row && coordinate.y === col) {
          sq.classList.add("blue");
        }
      });
    });
  });

  // removing classnames on mouse out
  square.addEventListener("mouseout", () => {
    squares.forEach((sq) => {
      sq.classList.remove("blue");
    });
  });
});
