import { Player, Team } from "@/types/auction";
import { Badge } from "@/components/ui/badge";
import { Crown, Star } from "lucide-react";
import { getImageByCode } from "@/lib/imageUtils";

interface Props {
  player: Player;
  team: Team;
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

const RosterPlayerCard = ({ player, team }: Props) => {
  const isCaptain = player.name === team.captain;
  const isIcon = player.name === team.iconPlayer;

  return (
    <div
      className="
      relative
      rounded-2xl
      overflow-hidden
      border
      bg-card
      hover:border-primary
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-[0_0_30px_hsl(var(--primary)/0.35)]
    "
    >
      {/* Captain */}
      {isCaptain && (
        <div className="absolute top-3 left-3 z-20">
          <Crown
            className="w-6 h-6 text-yellow-500"
            fill="currentColor"
          />
        </div>
      )}

      {/* Icon */}
      {isIcon && (
        <div className="absolute top-3 right-3 z-20">
          <Star
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
          />
        </div>
      )}

      {/* Image */}

      <div className="h-52 bg-secondary flex items-center justify-center">

        {getImageByCode(player.imageCode) ? (
          <img
            src={getImageByCode(player.imageCode)!}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl font-display">
            {player.name[0]}
          </div>
        )}

      </div>

      {/* Details */}

      <div className="p-4">

        <h3 className="font-display text-lg font-bold truncate">
          {player.name}
        </h3>

        <Badge
          variant="outline"
          className={`${getRoleColor(player.role)} mt-2`}
        >
          {player.role}
        </Badge>

        <div className="mt-4 flex justify-between items-center">

          <span className="text-muted-foreground text-sm">
            Sold Price
          </span>

          <span className="font-display text-primary text-lg">
            ₹{player.soldPrice?.toLocaleString()}
          </span>

        </div>

      </div>
    </div>
  );
};

export default RosterPlayerCard;