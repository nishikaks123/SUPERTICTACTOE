"use client";

import { useState, useEffect } from "react";
import { Board } from "@/components/game/Board";
import { GameStatus } from "@/components/game/GameStatus";
import { Button } from "@/components/ui/button";
import { calculateWinner } from "@/lib/game";
import { cn } from "@/lib/utils";

export default function Home() {
  const [board, setBoard] = useState<( "X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState<{ winner: string; line: number[] } | null>(null);

  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line;
  const isDraw = board.every((square) => square !== null) && !winner;
  const isGameOver = !!winner || isDraw;

  function handlePlay(i: number) {
    if (winner || board[i]) {
      return;
    }
    const nextBoard = board.slice();
    nextBoard[i] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinnerInfo(null);
  }

  useEffect(() => {
    const newWinnerInfo = calculateWinner(board);
    if (newWinnerInfo) {
      setWinnerInfo(newWinnerInfo);
    } else if (board.every(s => s !== null)) {
      // Handle draw case where winner is null but board is full
      setWinnerInfo(null);
    }
  }, [board]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary drop-shadow-md text-center">
          Super Tic Tac Toe
        </h1>
        <GameStatus winner={winner ?? null} isXNext={isXNext} isDraw={isDraw} />
        <div className="relative">
          <Board
            squares={board}
            onPlay={handlePlay}
            winningLine={winningLine ?? null}
            isGameOver={isGameOver}
          />
        </div>
        <Button 
          onClick={handleReset} 
          size="lg" 
          className={cn(
            "mt-8 font-bold text-lg transition-all",
            isGameOver && "animate-bounce"
          )}
        >
          New Game
        </Button>
      </div>
    </main>
  );
}
