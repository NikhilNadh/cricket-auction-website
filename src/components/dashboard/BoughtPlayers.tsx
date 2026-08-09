import { useRef } from "react";
import html2canvas from "html2canvas";
import { Player, Team } from "@/types/auction";
import { Badge } from "@/components/ui/badge";
import { getImageByCode } from "@/lib/imageUtils";
import AuctionHeader from "./AuctionHeader";
import AuctionPodium from "./AuctionPodium";

interface Props {
  players: Player[];
  teams: Team[];
  onBack: () => void;
  onClose: () => void;
}




const BoughtPlayers = ({
  players,
  teams,
  onBack,
  onClose,
}: Props) => {


  const podiumRef = useRef<HTMLDivElement>(null);
const downloadPodium = async () => {
  if (!podiumRef.current) return;

  const canvas = await html2canvas(podiumRef.current, {
    backgroundColor: "#111827", // Match your dark theme
    scale: 3,                   // High quality
    useCORS: true,
    logging: false,
  });

  const link = document.createElement("a");

  link.download = "Auction-Podium.png";

  link.href = canvas.toDataURL("image/png");

  link.click();
};





  const soldPlayers = [...players]
    .filter((player) => player.status === "sold")
    .sort((a, b) => (b.soldPrice ?? 0) - (a.soldPrice ?? 0));

  const highestPlayer = soldPlayers[0];

  const totalSpent = soldPlayers.reduce(
    (sum, player) => sum + (player.soldPrice ?? 0),
    0
  );

  const averagePrice =
    soldPlayers.length > 0
      ? Math.round(totalSpent / soldPlayers.length)
      : 0;

  return (
    <div className="space-y-6">

    <AuctionHeader
  title="Auction Leaderboard"
  subtitle="Top purchased players ranked by sold price"
  onBack={onBack}
  onClose={onClose}
  onDownload={downloadPodium}
/>



<div ref={podiumRef}>
    <AuctionPodium
        players={soldPlayers}
        teams={teams}
    />
</div>





      <div className="grid grid-cols-4 gap-4">

        <div className="rounded-xl border p-5 text-center">
          <div className="text-muted-foreground text-sm">
            Highest Bid
          </div>

          <div className="text-3xl font-display text-primary">
            ₹{highestPlayer?.soldPrice ?? 0}
          </div>
        </div>

        <div className="rounded-xl border p-5 text-center">
          <div className="text-muted-foreground text-sm">
            Average Price
          </div>

          <div className="text-3xl font-display">
            ₹{averagePrice}
          </div>
        </div>

        <div className="rounded-xl border p-5 text-center">
          <div className="text-muted-foreground text-sm">
            Players Bought
          </div>

          <div className="text-3xl font-display">
            {soldPlayers.length}
          </div>
        </div>

        <div className="rounded-xl border p-5 text-center">
          <div className="text-muted-foreground text-sm">
            Total Spent
          </div>

          <div className="text-3xl font-display text-green-500">
            ₹{totalSpent}
          </div>
        </div>

      </div>

      <div className="rounded-xl border bg-card overflow-hidden">

  <div className="px-6 py-4 border-b">
    <h2 className="text-2xl font-display font-bold">
      Auction Leaderboard
    </h2>

    <p className="text-muted-foreground text-sm mt-1">
      Players ranked by highest sold price
    </p>
  </div>

  <div className="divide-y">

    {soldPlayers.map((player, index) => {

      const team = teams.find(
        t => t.id === player.soldTo
      );

      return (

        <div
          key={player.id}
          className="
            flex
            items-center
            justify-between
            px-6
            py-4
            hover:bg-secondary/30
            transition-all
          "
        >

          <div className="flex items-center gap-5">

            <div className="w-10 text-center font-display text-xl text-muted-foreground">
              <div
  className={`
    w-12 h-12 rounded-full flex items-center justify-center
    font-bold text-lg
    ${
      index === 0
        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
        : index === 1
        ? "bg-gray-500/20 text-gray-300 border border-gray-500"
        : index === 2
        ? "bg-orange-500/20 text-orange-400 border border-orange-500"
        : "bg-secondary text-muted-foreground"
    }
  `}
>
  {index === 0
    ? "🥇"
    : index === 1
    ? "🥈"
    : index === 2
    ? "🥉"
    : `#${index + 1}`}
</div>
            </div>

            {getImageByCode(player.imageCode) ? (

              <img
                src={getImageByCode(player.imageCode)!}
                className="w-14 h-14 rounded-full object-cover border-2 border-border"
              />

            ) : (

              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-xl">
                {player.name[0]}
              </div>

            )}

            <div>

              <div className="font-semibold text-lg">
                {player.name}
              </div>

              <div className="text-sm text-muted-foreground">
                {team?.name}
              </div>

            </div>

          </div>

          <div className="flex items-center gap-5">

            <Badge
              variant="outline"
              className="text-sm"
            >
              {player.role}
            </Badge>

            <div className="font-display text-2xl text-primary">
              ₹{player.soldPrice?.toLocaleString()}
            </div>

          </div>

        </div>

      );

    })}

  </div>

</div>

    </div>
  );
};

export default BoughtPlayers;