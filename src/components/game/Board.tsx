import { Cell } from "./Cell";

type BoardProps = {
  squares: ('X' | 'O' | null)[];
  onPlay: (i: number) => void;
  winningLine: number[] | null;
  isGameOver: boolean;
};

export function Board({ squares, onPlay, winningLine, isGameOver }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 p-2 md:p-4 rounded-2xl bg-primary/5 shadow-inner">
      {squares.map((square, i) => (
        <Cell
          key={i}
          value={square}
          onClick={() => onPlay(i)}
          isWinning={winningLine?.includes(i) ?? false}
          disabled={isGameOver || !!square}
        />
      ))}
    </div>
  );
}
