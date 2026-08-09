import { Player, Team } from "@/types/auction";
import { Crown } from "lucide-react";
import { getImageByCode } from "@/lib/imageUtils";

interface Props {
  players: Player[];
  teams: Team[];
}

const medals = ["🥇", "🥈", "🥉"];

const AuctionPodium = ({ players, teams }: Props) => {
  const top3 = players.slice(0, 3);

  const getTeamName = (player: Player) => {
    return (
      teams.find((team) => team.id === player.soldTo)?.name ??
      "Unknown Team"
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 my-8 items-end">

      {top3.map((player, index) => (
        <div
          key={player.id}
          className={`
            rounded-2xl
            border
            bg-card
            p-6
            text-center
            transition-all
            hover:scale-105

            ${
              index === 0
                ? "border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,.35)] md:order-2 md:-mt-8"
                : index === 1
                ? "border-gray-400 md:order-1"
                : "border-orange-600 md:order-3"
            }
          `}
        >
          <div className="text-5xl mb-4">
            {medals[index]}
          </div>

          {getImageByCode(player.imageCode) ? (
            <img
              src={getImageByCode(player.imageCode)!}
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center text-5xl mx-auto">
              {player.name[0]}
            </div>
          )}

          <h2 className="font-display text-2xl mt-5">
            {player.name}
          </h2>

          <p className="text-muted-foreground">
            {getTeamName(player)}
          </p>

          <div className="text-4xl font-display text-primary mt-4">
            ₹{player.soldPrice}
          </div>

          {index === 0 && (
            <div className="mt-5 flex justify-center">

              <div className="flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-2">

                <Crown
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                />

                Highest Value Player

              </div>

            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AuctionPodium;