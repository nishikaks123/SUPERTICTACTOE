

export function calculateWinner(squares: (string | null)[]): { winner: 'X' | 'O'; line: number[] } | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as 'X' | 'O', line: lines[i] };
    }
  }
  return null;
}

// Minimax algorithm to find the best move for the AI
function minimax(board: (string | null)[], isMaximizing: boolean): number {
    const winnerInfo = calculateWinner(board);
    if (winnerInfo) {
        return winnerInfo.winner === 'O' ? 10 : -10;
    }
    if (board.every(s => s !== null)) {
        return 0; // Draw
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = 'O';
                let score = minimax(board, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = 'X';
                let score = minimax(board, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

export function findBestMove(board: (string | null)[]): number {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = 'O';
            let score = minimax(board, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}
