
"use client";

import { useState, useEffect, useCallback } from "react";
import { Board } from "@/components/game/Board";
import { GameStatus } from "@/components/game/GameStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { calculateWinner, findBestMove } from "@/lib/game";
import { cn } from "@/lib/utils";
import { Users, X, Circle, Award, Bot } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type GameMode = "pvp" | "pva";

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>("pvp");
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

  const handlePlay = useCallback((i: number) => {
    if (winner || board[i]) {
      return;
    }
    const nextBoard = board.slice();
    nextBoard[i] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }, [board, isXNext, winner]);

  useEffect(() => {
    if (gameMode === "pva" && !isXNext && !isGameOver) {
      const bestMove = findBestMove(board);
      if (bestMove !== -1) {
        setTimeout(() => handlePlay(bestMove), 500);
      }
    }
  }, [gameMode, isXNext, board, isGameOver, handlePlay]);


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
      if(newWinnerInfo.winner) {
        setScores(prevScores => ({...prevScores, [newWinnerInfo.winner as 'X' | 'O']: prevScores[newWinnerInfo.winner as 'X' | 'O'] + 1}));
      }
    } else if (board.every(s => s !== null)) {
      setWinnerInfo({ winner: null, line: null }); // Draw
      setScores(prevScores => ({...prevScores, draw: prevScores.draw + 1}));
    }
  }, [board]);
  
  const handleModeChange = (mode: string) => {
    setGameMode(mode as GameMode);
    if (mode === 'pva') {
        setPlayerOName("AI Bot");
    } else {
        setPlayerOName("Player O");
    }
    handleNewGame();
  }

  const playerNames = {
    X: playerXName,
    O: gameMode === 'pva' ? 'AI Bot' : playerOName,
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 font-body">
      <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-md">
        <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary drop-shadow-md text-center">
          Super Tic Tac Toe
        </h1>
        
        <Tabs value={gameMode} onValueChange={handleModeChange} className="w-full justify-center flex">
            <TabsList>
                <TabsTrigger value="pvp"><Users className="mr-2"/>Player vs Player</TabsTrigger>
                <TabsTrigger value="pva"><Bot className="mr-2"/>Player vs AI</TabsTrigger>
            </TabsList>
        </Tabs>

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
                    <Input value={playerOName} onChange={(e) => setPlayerOName(e.target.value)} placeholder="Player O Name" disabled={gameMode === 'pva'}/>
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
                    <div className="font-semibold text-muted-foreground">{playerNames.X}</div>
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
                  <AvatarFallback className={cn("font-bold", gameMode === 'pva' ? 'bg-blue-500/20 text-blue-500' : 'bg-primary/20 text-primary' )}>
                    {gameMode === 'pva' ? <Bot/> : 'O'}
                  </AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold text-muted-foreground">{playerNames.O}</div>
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
