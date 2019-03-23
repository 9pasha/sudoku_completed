function emptyCells( board) {
    var empty = [];
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                var boxRow = 3* Math.floor( i/3);
                var boxCol = 3* Math.floor( j/3);
                empty.push([i,j, boxRow, boxCol]);
            }
        }
    }
    return empty;
}

function isUnique( board, empty, value) {
    var row, col;

    row = board[empty[0]];
    for( col = 0; col < 9; ++ col) {
        if( value == row[col]) {
            return false;
        }
    }
    col = empty[1];
    for( var row = 0; row < 9; ++row) {
        if( value == board[ row][col]){
            return false;
        }
    }
    var boxRow = empty[2];
    var boxCol = empty[3];
    for( var i = 3; i--;) {
        row = board[ boxRow++];
        for( var j = 3; j--;) {
            if( row[boxCol + j] == value) {
                return false;
            }
        }
    }
    return true;
}

var solve = function (board) {
    var empty = emptyCells( board);

    nextEmpty:
    for (var i = 0; i < empty.length;) { 
        var row = empty[i][0];
        var column = empty[i][1];
        var value = board[row][column] + 1; 
        var cell = empty[i];

        while (value <= 9) { 
            if( isUnique( board, cell, value)) {
                board[row][column] = value; 
                i++; 
                continue nextEmpty;
            }
            value++;
        }

        board[row][column] = 0;
        if( i == 0) { 
            return null;
        }
        i--;
    }
    return board;
};

module.exports = function solveSudoku(matrix) {
  return solve(matrix);
}