
import { X, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameStatusProps = {
  winner: 'X' | 'O' | null;
  isXNext: boolean;
  isDraw: boolean;
  playerNames: { X: string, O: string };
};

const PlayerDisplay = ({ player, playerName }: { player: 'X' | 'O', playerName: string }) => {
    const Icon = player === 'X' ? X : Circle;
    const color = player === 'X' ? 'text-destructive' : 'text-primary';
    return (
        <span className={cn('flex items-center gap-2 font-semibold', color)}>
            <Icon className="h-8 w-8 inline-block" strokeWidth={3} />
            {playerName}
        </span>
    );
}

export function GameStatus({ winner, isXNext, isDraw, playerNames }: GameStatusProps) {
  let statusContent;

  if (winner) {
    statusContent = (
      <div className="flex items-center gap-2">
        <span className="text-primary/90">Winner:</span>
        <PlayerDisplay player={winner} playerName={playerNames[winner]} />
      </div>
    );
  } else if (isDraw) {
    statusContent = <span className="text-primary/90">It's a Draw!</span>;
  } else {
    statusContent = (
      <div className="flex items-center gap-2">
        <span className="text-primary/80">Next:</span>
        <PlayerDisplay player={isXNext ? 'X' : 'O'} playerName={playerNames[isXNext ? 'X' : 'O']} />
      </div>
    );
  }

  return (
    <div className="text-2xl md:text-3xl font-headline text-center h-10">
      <div className="flex items-center justify-center gap-3">
        {statusContent}
      </div>
    </div>
  );
}
