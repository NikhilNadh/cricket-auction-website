import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Gavel, UserPlus } from "lucide-react";
import { useAuction } from "@/context/AuctionContext";
import { Player } from "@/types/auction";
import { getImageByCode } from "@/lib/imageUtils";

const PlayerPoolCard = () => {
  const { players, setPlayers } = useAuction();

  const removePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== id));
  };

  const getRoleColor = (role: Player["role"]) => {
    switch (role) {
      case "Batsman":
        return "text-blue-400";
      case "Bowler":
        return "text-red-400";
      case "All-Rounder":
        return "text-purple-400";
      case "Wicket-Keeper":
        return "text-amber-400";
    }
  };

  return (
    <Card className="card-stadium">
      <CardHeader>
        <CardTitle className="font-display text-lg flex items-center gap-2">
          <Gavel className="w-5 h-5 text-primary" />
          Auction Pool ({players.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        {players.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No players in auction pool.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary transition-all flex items-center gap-3"
              >
                {getImageByCode(player.imageCode) ? (
                  <img
                    src={getImageByCode(player.imageCode)!}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-primary">
                    {player.name.charAt(0)}
                  </div>
                )}

                <div className="flex-1">
                  <div className="font-semibold">
                    {player.name}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className={getRoleColor(player.role)}>
                      {player.role}
                    </span>

                    <span className="text-muted-foreground">
                      ₹{player.basePrice}
                    </span>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removePlayer(player.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerPoolCard;