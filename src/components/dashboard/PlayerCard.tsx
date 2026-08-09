import { Player } from "@/types/auction";
import { Badge } from "@/components/ui/badge";
import { getImageByCode } from "@/lib/imageUtils";

interface Props {
  player: Player;
}

const PlayerCard = ({ player }: Props) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border bg-secondary/30">

      {getImageByCode(player.imageCode) ? (
        <img
          src={getImageByCode(player.imageCode)!}
          className="w-14 h-14 rounded-full object-cover"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
          {player.name[0]}
        </div>
      )}

      <div className="flex-1">
        <div className="font-semibold">
          {player.name}
        </div>

        <Badge variant="outline">
          {player.role}
        </Badge>
      </div>

      {player.soldPrice && (
        <div className="font-display text-primary">
          ₹{player.soldPrice}
        </div>
      )}

    </div>
  );
};

export default PlayerCard;