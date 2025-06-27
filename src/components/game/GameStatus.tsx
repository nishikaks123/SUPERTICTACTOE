import { X, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameStatusProps = {
  winner: string | null;
  isXNext: boolean;
  isDraw: boolean;
};

const PlayerDisplay = ({ player }: { player: 'X' | 'O' }) => {
    const Icon = player === 'X' ? X : Circle;
    const color = player === 'X' ? 'text-destructive' : 'text-primary';
    return <Icon className={cn('h-8 w-8 inline-block align-middle', color)} strokeWidth={3} />;
}

export function GameStatus({ winner, isXNext, isDraw }: GameStatusProps) {
  let statusContent;
  if (winner) {
    statusContent = <>Winner: <PlayerDisplay player={winner as 'X' | 'O'} /></>;
  } else if (isDraw) {
    statusContent = "It's a Draw!";
  } else {
    statusContent = <>Next player: <PlayerDisplay player={isXNext ? 'X' : 'O'} /></>;
  }

  return (
    <div className="text-2xl md:text-4xl font-headline font-semibold text-primary/80 mb-6 text-center h-10">
      <div className="flex items-center justify-center gap-3">
        {statusContent}
      </div>
    </div>
  );
}
