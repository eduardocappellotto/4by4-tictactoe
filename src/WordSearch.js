export default class WordSearch {
  constructor(letterGrid) {
    this.letterGrid = letterGrid;
  }

  find(words) {
 
  const rowsCount = this.letterGrid.length;
  const colsCount = this.letterGrid[0].length;

    const results = {};

    for(const word of words){

      let found = false;
      let start = null;
      let end = null; 

      
      for(let r= 0; r < rowsCount; r++){
        for(let c= 0; c < colsCount; c++){
        // Will check on every direction

        if(this.checkWordInDirection(r, c, word, [0,1])){
          found = true;
          start = [r, c];
          end = [r, c + word.length -1]
          break;
        }
        if(this.checkWordInDirection(r, c, word, [0,-1])){
          found = true;
          start = [r, c - word.length -1]
          end =  [r, c];
          break;
        }
        if(this.checkWordInDirection(r, c, word, [1,0])){
          found = true;
          start =[r, c]; 
          end = [r + word.length - 1, c];
          break;
        }
        if(this.checkWordInDirection(r, c, word, [-1,0])){
          found = true;
         start = [r - word.length +1, c];
          end = [r, c];
          break;
        }
      }

      if(found){
        break;
      }
      }

      if(found){
        results[word] = { start, end}
      } else {
        results[word] = undefined
      }
    }

    return results

  };

  checkWordInDirection(row, col, word, direction){
    let dr = direction[0]
    let dc = direction[1]

    // Checks if the word can fit
    if(
      row + (word.length - 1) * dr < 0 ||
      row + (word.length - 1) * dr >= rowsCount ||
      col + (word.length - 1) * dc < 0 ||
      col + (word.length - 1) * dc >= colsCount 
    ){
      return false
    }

  // Checks if the word matches in direction
    for( let i=0; i< word.length; i++) {
      if(this.letterGrid[row + i * dr][col + 1 * dc] !== word[i]){
        return false
      }
    }

    return true

  };




}










