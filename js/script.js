

let quines = document.querySelectorAll(".quine");
let boxs = document.querySelectorAll(".item");
let drag = null;

// Function to handle drag start and end for quines
quines.forEach(quine => {
  quine.addEventListener("dragstart", () => {
    quine.style.color = "red";
    drag = quine;
  });

  quine.addEventListener("dragend", () => {
    quine.style.color = "#03a9f4";
  });
});

// Function to handle drag over and drop for boxes
boxs.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  box.addEventListener("drop", () => {
    box.append(drag);
    check_end_game();
  });
});

function check_end_game() {
  let finalArr = [];
  boxs.forEach((e, i) => {
    if (e.children[0] != undefined && e.children[0].tagName) {
      finalArr[i] = 1;
    } else {
      finalArr[i] = 0;
    }
  });
  const twoDArr = convertArrayTo2D(finalArr);
  isValidNQueens(twoDArr);
}

function convertArrayTo2D(arr) {
  // Check if the array length is not 16
  if (arr.length !== 16) {
    throw new Error("Array size must be 16.");
  }

  // Define the number of rows and columns for the 2D array
  const rows = 4;
  const cols = 4;

  // Create an empty 2D array
  const twoDArr = [];

  // Loop through the 1D array
  for (let i = 0; i < rows; i++) {
    twoDArr[i] = []; // Create an empty row
    for (let j = 0; j < cols; j++) {
      // Calculate the index in the 1D array
      const index = i * cols + j;
      twoDArr[i][j] = arr[index]; // Add element to the 2D array
    }
  }

  // Return the converted 2D array
  return twoDArr;
}

function isValidNQueens(twoDArr) {
  // Check if the board is a 4x4 matrix
  if (twoDArr.length !== 4 || twoDArr[0].length !== 4) {
    return false;
  }

  let quinePositions = []; // Array to store positions of quines

  // Check for queens (ones) and their conflicts
  for (let i = 0; i < twoDArr.length; i++) {
    for (let j = 0; j < twoDArr[i].length; j++) {
      if (twoDArr[i][j] === 1) {
        // Check if there is already a quine on the same diagonal
        for (let pos of quinePositions) {
          const [row, col] = pos;
          if (Math.abs(i - row) === Math.abs(j - col)) {
            // There's a quine on the same diagonal
            return false;
          }
        }

        // Store the position of the current quine
        quinePositions.push([i, j]);

        // Check top
        for (let k = i - 1; k >= 0; k--) {
          if (twoDArr[k][j] === 1) {
            return false;
          }
        }

        // Check right
        for (let k = j + 1; k < twoDArr[i].length; k++) {
          if (twoDArr[i][k] === 1) {
            return false;
          }
        }

        // Check down
        for (let k = i + 1; k < twoDArr.length; k++) {
          if (twoDArr[k][j] === 1) {
            return false;
          }
        }

        // Check diagonal (up-right)
        let k = i - 1;
        let l = j + 1;
        while (k >= 0 && l < twoDArr.length) {
          if (twoDArr[k][l] === 1) {
            return false;
          }
          k--;
          l++;
        }

        // Check diagonal (down-left)
        k = i + 1;
        l = j - 1;
        while (k < twoDArr.length && l >= 0) {
          if (twoDArr[k][l] === 1) {
            return false;
          }
          k++;
          l--;
        }
      }
    }
  }

  // No conflicts found, valid placement
  let win = document.querySelector(".win");
  win.classList.add("show");
  reload();
  return true;
}

function reload() {
  let restart = document.querySelector(".restart");
  restart.addEventListener("click", () => {
    window.location.reload();
  });
}


// Define the initial state of the chessboard
const existingChessboard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];



// Function to solve the N-Queens problem using backtracking
function solveNQueens(existingChessboard) {
    // Create a copy of the existing chessboard
    const chessboard = existingChessboard.map(row => row.slice());

    // Function to check if placing a queen at position (row, col) is safe
    function isSafe(row, col) {
        // Check if there is a queen in the same column
        for (let i = 0; i < row; i++) {
            if (chessboard[i][col] === 1) {
                return false;
            }
        }

        // Check upper left diagonal
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (chessboard[i][j] === 1) {
                return false;
            }
        }

        // Check upper right diagonal
        for (let i = row, j = col; i >= 0 && j < 4; i--, j++) {
            if (chessboard[i][j] === 1) {
                return false;
            }
        }

        return true;
    }

    // Recursive function to solve N-Queens
    function solve(row) {
        // Base case: if all queens are placed
        if (row === 4) {
            // Move queens to the winning positions on the existing board
            for (let i = 0; i < 4; i++) {
                const quineIndex = chessboard[i].indexOf(1);
                if (quineIndex !== -1) {
                    // Move the quine to the corresponding box
                    boxs[i * 4 + quineIndex].append(quines[i]);
                }
            }
            return true;
        }

        // Try placing queen in each column of the current row
        for (let col = 0; col < 4; col++) {
            // Check if queen can be placed at (row, col)
            if (isSafe(row, col)) {
                // Place the queen
                chessboard[row][col] = 1;

                // Recur to place rest of the queens
                if (solve(row + 1)) {
                    return true;
                }

                // If placing queen at (row, col) doesn't lead to a solution,
                // backtrack and remove the queen from (row, col)
                chessboard[row][col] = 0;
            }
        }

        // If no queen can be placed in this row, return false
        return false;
    }

    // Start from the first row
    solve(0);
    // No conflicts found, valid placement
  let win = document.querySelector(".win");
  win.classList.add("show");
  reload();
}

// Function to display the solution (not needed in this version)

// Create a button to solve the N-Queens problem with the existing board
function createSolveButton(existingChessboard) {
    const solveButton = document.createElement("button");
    solveButton.textContent = "Solve N-Queens";
    solveButton.addEventListener("click", () => solveNQueens(existingChessboard));
    document.body.appendChild(solveButton);
}
// Call the function to create the solve button with the existing board
createSolveButton(existingChessboard);

