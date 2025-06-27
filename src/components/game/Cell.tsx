import { Button } from "@/components/ui/button";
import { X, Circle } from 'lucide-react';
import { cn } from "@/lib/utils";

type CellProps = {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
};

export function Cell({ value, onClick, isWinning, disabled }: CellProps) {
  const Icon = value === 'X' ? X : value === 'O' ? Circle : null;

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-24 h-24 md:w-32 md:h-32 rounded-xl flex items-center justify-center p-0 border-4 transition-all duration-300 shadow-lg",
        "bg-card/70 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:scale-105",
        isWinning && "bg-accent animate-pulse border-accent-foreground/50 scale-105",
        value ? "cursor-not-allowed" : "cursor-pointer"
      )}
      aria-label={`Cell ${value ? `is ${value}` : 'is empty'}`}
    >
      {Icon && <Icon className={cn(
        "h-16 w-16 md:h-20 md:w-20 drop-shadow-lg transition-transform",
        isWinning ? 'text-accent-foreground' : (value === 'X' ? 'text-destructive' : 'text-primary'),
      )} strokeWidth={4} />}
    </Button>
  );
}
