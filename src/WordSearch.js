export default class WordSearch {
  constructor(letterGrid) {
    this.letterGrid = letterGrid;
  }

  find(words) {
    const numRows = this.letterGrid.length;
    const numCols = this.letterGrid[0].length;

    // Helper function to check if a word can be found starting from a given position in a given direction
    const checkWordInDirection = (row, col, word, direction) => {
      let dr = direction[0];
      let dc = direction[1];

      // Check if the word can fit starting from the current position in the specified direction
      if (
        row + (word.length - 1) * dr < 0 ||
        row + (word.length - 1) * dr >= numRows ||
        col + (word.length - 1) * dc < 0 ||
        col + (word.length - 1) * dc >= numCols
      ) {
        return false;
      }

      // Check if the word matches in the specified direction
      for (let i = 0; i < word.length; i++) {
        if (this.letterGrid[row + i * dr][col + i * dc] !== word[i]) {
          return false;
        }
      }

      return true;
    };

    const results = {};

    // Iterate through each word in the array and search for it in the grid
    for (const word of words) {
      let found = false;
      let start = null;
      let end = null;

      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          if (checkWordInDirection(r, c, word, [0, 1])) {
            found = true;
            start = [r, c];
            end = [r, c + word.length - 1];
            break;
          }

          if (checkWordInDirection(r, c, word, [0, -1])) {
            found = true;
            start = [r, c];
            end = [r, c - word.length + 1];
            break;
          }

          if (checkWordInDirection(r, c, word, [1, 0])) {
            found = true;
            start = [r, c];
            end = [r + word.length - 1, c];
            break;
          }

          if (checkWordInDirection(r, c, word, [-1, 0])) {
            found = true;
            start = [r, c];
            end = [r - word.length + 1, c];
            break;
          }
        }

        if (found) {
          break;
        }
      }

      if (found) {
        start[0]++; start[1]++;
        end[0]++; end[1]++;
        results[word] = { start, end };
      } else {
        results[word] = undefined;
      }
    }

    return results;
  }
}











