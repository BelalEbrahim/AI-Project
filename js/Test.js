// let quines = document.querySelectorAll(".quine");
// let boxs = document.querySelectorAll(".item");
// let drag = null;

// // Function to handle drag start and end for quines
// quines.forEach(quine => {
//   quine.addEventListener("dragstart", () => {
//     quine.style.color = "red";
//     drag = quine;
//   });

//   quine.addEventListener("dragend", () => {
//     quine.style.color = "#03a9f4";
//   });
// });

// // Function to handle drag over and drop for boxes
// boxs.forEach((box) => {
//   box.addEventListener("dragover", (e) => {
//     e.preventDefault();
//   });

//   box.addEventListener("drop", () => {
//     box.append(drag);
//     check_end_game();
//   });
// });

// function check_end_game() {
//   let finalArr = [];
//   boxs.forEach((e, i) => {
//     if (e.children[0] != undefined && e.children[0].tagName) {
//       finalArr[i] = 1;
//     } else {
//       finalArr[i] = 0;
//     }
//   });
//   const twoDArr = convertArrayTo2D(finalArr);
//   isValidNQueens(twoDArr);
// }

// function convertArrayTo2D(arr) {
//   // Check if the array length is not 16
//   if (arr.length !== 16) {
//     throw new Error("Array size must be 16.");
//   }

//   // Define the number of rows and columns for the 2D array
//   const rows = 4;
//   const cols = 4;

//   // Create an empty 2D array
//   const twoDArr = [];

//   // Loop through the 1D array
//   for (let i = 0; i < rows; i++) {
//     twoDArr[i] = []; // Create an empty row
//     for (let j = 0; j < cols; j++) {
//       // Calculate the index in the 1D array
//       const index = i * cols + j;
//       twoDArr[i][j] = arr[index]; // Add element to the 2D array
//     }
//   }

//   // Return the converted 2D array
//   return twoDArr;
// }

// function isValidNQueens(twoDArr) {
//   // Check if the board is a 4x4 matrix
//   if (twoDArr.length !== 4 || twoDArr[0].length !== 4) {
//     return false;
//   }

//   let quinePositions = []; // Array to store positions of quines

//   // Check for queens (ones) and their conflicts
//   for (let i = 0; i < twoDArr.length; i++) {
//     for (let j = 0; j < twoDArr[i].length; j++) {
//       if (twoDArr[i][j] === 1) {
//         // Check if there is already a quine on the same diagonal
//         for (let pos of quinePositions) {
//           const [row, col] = pos;
//           if (Math.abs(i - row) === Math.abs(j - col)) {
//             // There's a quine on the same diagonal
//             return false;
//           }
//         }

//         // Store the position of the current quine
//         quinePositions.push([i, j]);

//         // Check top
//         for (let k = i - 1; k >= 0; k--) {
//           if (twoDArr[k][j] === 1) {
//             return false;
//           }
//         }

//         // Check right
//         for (let k = j + 1; k < twoDArr[i].length; k++) {
//           if (twoDArr[i][k] === 1) {
//             return false;
//           }
//         }

//         // Check down
//         for (let k = i + 1; k < twoDArr.length; k++) {
//           if (twoDArr[k][j] === 1) {
//             return false;
//           }
//         }

//         // Check diagonal (up-right)
//         let k = i - 1;
//         let l = j + 1;
//         while (k >= 0 && l < twoDArr.length) {
//           if (twoDArr[k][l] === 1) {
//             return false;
//           }
//           k--;
//           l++;
//         }

//         // Check diagonal (down-left)
//         k = i + 1;
//         l = j - 1;
//         while (k < twoDArr.length && l >= 0) {
//           if (twoDArr[k][l] === 1) {
//             return false;
//           }
//           k++;
//           l--;
//         }
//       }
//     }
//   }

//   // No conflicts found, valid placement
//   let win = document.querySelector(".win");
//   win.classList.add("show");
//   reload();
//   return true;
// }

// function reload() {
//   let restart = document.querySelector(".restart");
//   restart.addEventListener("click", () => {
//     window.location.reload();
//   });
// }




// class Node {
//   constructor(board, queens) {
//     this.board = board; // 2D array representing the board state
//     this.queens = queens; // Array of queen positions [row1, col1, row2, col2, ...]
//   }

//   isGoal() {
//     // Check if the current node is a goal state (all queens placed)
//     return this.queens.length === this.board.length;
//   }

//   expand() {
//     // Generate child nodes by placing a queen in each possible column of the next row
//     const nextRow = this.queens.length;
//     const children = [];
//     for (let col = 0; col < this.board.length; col++) {
//       if (this.isValidPlacement(nextRow, col)) {
//         const childQueens = [...this.queens, nextRow, col];
//         children.push(new Node(this.board, childQueens));
//       }
//     }
//     return children;
//   }

//   isValidPlacement(row, col) {
//     // Check if placing a queen at the specified position is valid
//     for (let i = 0; i < this.queens.length; i += 2) {
//       const queenRow = this.queens[i];
//       const queenCol = this.queens[i + 1];
//       if (queenCol === col || Math.abs(row - queenRow) === Math.abs(col - queenCol)) {
//         return false; // Invalid placement if same column or same diagonal
//       }
//     }
//     return true;
//   }
// }

// function solveNQueens(boardSize) {
//   const initialBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
//   const initialNode = new Node(initialBoard, []);
  
//   // Breadth-first search
//   const queue = [initialNode];
//   while (queue.length > 0) {
//     const currentNode = queue.shift();
//     if (currentNode.isGoal()) {
//       return currentNode.queens; // Return solution
//     }
//     const children = currentNode.expand();
//     queue.push(...children);
//   }
  
//   return null; // No solution found
// }

// function printQueenPositions(queens) {
//   const positions = [];
//   for (let i = 0; i < queens.length; i += 2) {
//     positions.push(`(${queens[i]}, ${queens[i + 1]})`);
//   }
//   return positions.join(", ");
// }

// // Create button
// const solveButton = document.createElement('button');
// solveButton.textContent = 'Solve N-Queens';
// document.body.appendChild(solveButton);

// // Attach event listener to button
// solveButton.addEventListener('click', () => {
//   const boardSize = 4; // Change board size as needed
//   const solution = solveNQueens(boardSize);
//   if (solution) {
//     const queenPositions = printQueenPositions(solution);
//     alert(`Queen positions: ${queenPositions}\nCongratulations! You won the game!`);
//   } else {
//     alert("No solution found.");
//   }
// });




//============================
//============================
//============================
// let quines = document.querySelectorAll(".quine");
// let boxs = document.querySelectorAll(".item");
// let drag = null;

// // Function to handle drag start and end for quines
// quines.forEach(quine => {
//   quine.addEventListener("dragstart", () => {
//     quine.style.color = "red";
//     drag = quine;
//   });

//   quine.addEventListener("dragend", () => {
//     quine.style.color = "#03a9f4";
//   });
// });

// // Function to handle drag over and drop for boxes
// boxs.forEach((box) => {
//   box.addEventListener("dragover", (e) => {
//     e.preventDefault();
//   });

//   box.addEventListener("drop", () => {
//     box.append(drag);
//     check_end_game();
//   });
// });

// // Create a solve button dynamically
// function createSolveButton() {
//   const solveButton = document.createElement("button");
//   solveButton.textContent = "Solve";
//   solveButton.addEventListener("click", () => {
//     const solution = bfsNQueens();
//     if (solution) {
//       displayQueensPositions(solution);
//       alert("Congratulations! You've won the game.");
//     } else {
//       alert("No solution found.");
//     }
//   });
//   document.body.appendChild(solveButton);
// }

// // Function to solve N-queens using BFS algorithm
// function solveNQueens() {
//   const solution = bfsNQueens();
//   if (solution) {
//     displayQueensPositions(solution);
//     alert("Congratulations! You've won the game.");
//   } else {
//     alert("No solution found.");
//   }
// }

// // Function to display queen positions on the board
// function displayQueensPositions(board) {
//   board.forEach(([row, col]) => {
//     const box = document.querySelector(`.item[data-row="${row}"][data-col="${col}"]`);
//     const quine = document.createElement("div");
//     quine.classList.add("quine");
//     quine.draggable = true;
//     quine.textContent = "♕"; // Queen symbol
//     quine.style.color = "#03a9f4";
//     box.appendChild(quine);
//   });
// }

// // BFS algorithm to solve N-queens
// function bfsNQueens() {
//   // Initialize queue with initial empty board
//   const queue = [[]];
  
//   while (queue.length > 0) {
//     const board = queue.shift(); // Dequeue the board
//     const row = board.length;
    
//     // If board is complete (4 queens placed), return the solution
//     if (row === 4) {
//       return board;
//     }
    
//     // Try placing a queen in each column of the current row
//     for (let col = 0; col < 4; col++) {
//       // Check if placing queen in current position is safe
//       if (isSafe(board, row, col)) {
//         // Create a copy of the board with queen placed in current position
//         const newBoard = board.slice();
//         newBoard.push([row, col]);
//         queue.push(newBoard); // Enqueue the new board
//       }
//     }
//   }
  
//   // If no solution is found, return null
//   return null;
// }

// // Function to check if placing a queen in a specific position is safe
// function isSafe(board, row, col) {
//   // Check if there's a queen in the same column
//   for (let [r, c] of board) {
//     if (c === col) {
//       return false;
//     }
//     // Check if there's a queen in the same diagonal
//     if (Math.abs(row - r) === Math.abs(col - c)) {
//       return false;
//     }
//   }
//   return true;
// }

// // Function to check if the game has ended
// function check_end_game() {
//   // Check if the game has ended and trigger end game actions if necessary
// }

// // Reload the page when restart button is clicked
// function reload() {
//   let restart = document.querySelector(".restart");
//   restart.addEventListener("click", () => {
//     window.location.reload();
//   });
// }

// // Call function to create solve button
// createSolveButton();

//============================
//============================
//============================