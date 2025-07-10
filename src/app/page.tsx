
"use client";

import { useState, useEffect } from "react";
import { Board } from "@/components/game/Board";
import { GameStatus } from "@/components/game/GameStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { calculateWinner } from "@/lib/game";
import { cn } from "@/lib/utils";
import { Users, X, Circle, Award } from "lucide-react";

export default function Home() {
  const [playerXName, setPlayerXName] = useState("Player X");
  const [playerOName, setPlayerOName] = useState("Player O");
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  
  const [board, setBoard] = useState<( "X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState<{ winner: "X" | "O" | null; line: number[] | null } | null>(null);

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

  function handleNewGame() {
    setScores({ X: 0, O: 0, draw: 0 });
    handlePlayAgain();
  }

  function handlePlayAgain() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinnerInfo(null);
  }

  useEffect(() => {
    const newWinnerInfo = calculateWinner(board);
    if (newWinnerInfo) {
      setWinnerInfo(newWinnerInfo);
      setScores(prevScores => ({...prevScores, [newWinnerInfo.winner]: prevScores[newWinnerInfo.winner as 'X' | 'O'] + 1}));
    } else if (board.every(s => s !== null)) {
      setWinnerInfo({ winner: null, line: null }); // Draw
      setScores(prevScores => ({...prevScores, draw: prevScores.draw + 1}));
    }
  }, [board]);

  const playerNames = {
    X: playerXName,
    O: playerOName,
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 font-body">
      <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-md">
        <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary drop-shadow-md text-center">
          Tic Tac Toe
        </h1>

        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Player Names</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 w-full">
                    <X className="h-6 w-6 text-destructive flex-shrink-0"/>
                    <Input value={playerXName} onChange={(e) => setPlayerXName(e.target.value)} placeholder="Player X Name" />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <Circle className="h-6 w-6 text-primary flex-shrink-0"/>
                    <Input value={playerOName} onChange={(e) => setPlayerOName(e.target.value)} placeholder="Player O Name" />
                </div>
            </CardContent>
        </Card>
        
        <div className="flex flex-col items-center gap-4 p-4 rounded-xl w-full">
          <GameStatus winner={winner} isXNext={isXNext} isDraw={isDraw} playerNames={playerNames} />
          <div className="relative">
            <Board
              squares={board}
              onPlay={handlePlay}
              winningLine={winningLine ?? null}
              isGameOver={isGameOver}
            />
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award/> Scoreboard</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-around text-center">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback className="bg-destructive/20 text-destructive font-bold">X</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold text-muted-foreground">{playerXName}</div>
                    <div className="text-2xl font-bold">{scores.X}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback className="bg-muted">D</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold text-muted-foreground">Draws</div>
                    <div className="text-2xl font-bold">{scores.draw}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">O</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold text-muted-foreground">{playerOName}</div>
                    <div className="text-2xl font-bold">{scores.O}</div>
                </div>
              </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-4">
          <Button 
            onClick={handleNewGame} 
            size="lg" 
            variant="outline"
            className="font-bold text-lg"
          >
            New Game
          </Button>
          {isGameOver && (
            <Button 
              onClick={handlePlayAgain} 
              size="lg" 
              className="font-bold text-lg animate-bounce"
            >
              Play Again
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
