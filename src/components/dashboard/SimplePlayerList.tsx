import { Player } from "@/types/auction";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, Users } from "lucide-react";
import { getImageByCode } from "@/lib/imageUtils";

interface Props {
  title: string;
  players: Player[];
  onBack: () => void;
  onClose: () => void;
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "Batsman":
      return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    case "Bowler":
      return "bg-red-500/20 text-red-400 border-red-500/50";
    case "All-Rounder":
      return "bg-purple-500/20 text-purple-400 border-purple-500/50";
    case "Wicket-Keeper":
      return "bg-amber-500/20 text-amber-400 border-amber-500/50";
    default:
      return "";
  }
};

const SimplePlayerList = ({
  title,
  players,
  onBack,
  onClose,
}: Props) => {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-xl border bg-card overflow-hidden">

        <div className="flex justify-between items-center border-b px-6 py-4">

          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <h2 className="font-display text-2xl font-bold">
            {title}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

        </div>

      </div>

      {/* Empty */}

      {players.length === 0 ? (

        <div className="rounded-xl border bg-card py-20 text-center">

          <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />

          <h3 className="text-2xl font-display">
            No {title}
          </h3>

          <p className="text-muted-foreground mt-2">
            Nothing to display.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {players.map((player, index) => (

            <div
              key={player.id}
              className="
                rounded-xl
                border
                bg-card
                px-5
                py-4
                flex
                items-center
                justify-between
                hover:border-primary
                transition-all
              "
            >

              <div className="flex items-center gap-4">

                <div className="text-xl font-display w-10">
                  #{index + 1}
                </div>

                {getImageByCode(player.imageCode) ? (

                  <img
                    src={getImageByCode(player.imageCode)!}
                    className="w-14 h-14 rounded-full object-cover border"
                  />

                ) : (

                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center font-bold text-xl">
                    {player.name.charAt(0)}
                  </div>

                )}

                <div>

                  <div className="font-semibold text-lg">
                    {player.name}
                  </div>

                  <Badge
                    variant="outline"
                    className={getRoleColor(player.role)}
                  >
                    {player.role}
                  </Badge>

                </div>

              </div>

              <div className="text-right">

                <div className="text-sm text-muted-foreground">
                  Base Price
                </div>

                <div className="font-display text-xl text-primary">
                  ₹{player.basePrice.toLocaleString()}
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default SimplePlayerList;