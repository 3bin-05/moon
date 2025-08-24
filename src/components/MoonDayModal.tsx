import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MoonPhase, formatFullDate } from "@/lib/moonPhase";

interface MoonDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  moonPhase: MoonPhase | null;
  luck: string | null;
}

export function MoonDayModal({ isOpen, onClose, date, moonPhase, luck }: MoonDayModalProps) {
  if (!date || !moonPhase || !luck) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cosmic-card/95 border-cosmic-accent/30 backdrop-blur-md max-w-md mx-auto">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {formatFullDate(date)}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-6">
              {/* Moon Phase Display */}
              <Card className="bg-cosmic-accent/10 border-cosmic-accent/20 p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-cosmic-card/50 border-2 border-cosmic-accent/30 flex items-center justify-center shadow-glow-primary">
                    <img
                      src={moonPhase.image}
                      alt={moonPhase.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {moonPhase.name}
                    </h3>
                    <Badge variant="secondary" className="bg-cosmic-accent/20 text-cosmic-glow border-cosmic-accent/30">
                      {moonPhase.illumination}% Illuminated
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Lucky Fortune */}
              <Card className="bg-gradient-to-r from-cosmic-glow/10 to-cosmic-accent/10 border-cosmic-glow/30 p-6">
                <div className="text-center space-y-3">
                  <div className="text-2xl">🌟</div>
                  <h4 className="font-semibold text-foreground">Moon Luck</h4>
                  <p className="text-cosmic-silver/80 leading-relaxed italic">
                    "{luck}"
                  </p>
                </div>
              </Card>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}