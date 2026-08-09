import { Team } from "@/types/auction";
import { useRef } from "react";
import html2canvas from "html2canvas";

import TeamHeader from "./TeamHeader";
import RosterPlayerCard from "./RosterPlayerCard";

interface Props {
  team: Team;
  onBack: () => void;
  onClose: () => void;
}

const TeamRoster = ({ team, onBack, onClose }: Props) => {
  const rosterRef = useRef<HTMLDivElement>(null);

  const spent = team.budget - team.remainingBudget;

  const downloadTeamSheet = async () => {
    if (!rosterRef.current) return;

    const element = rosterRef.current;

    const canvas = await html2canvas(element, {
      backgroundColor: "#09090B",
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.download = `${team.name}-TeamSheet.png`;

    link.href = image;

    link.click();
  };

  return (
    <div
      ref={rosterRef}
      className="space-y-6 bg-background p-4 rounded-xl"
    >
      <TeamHeader
        team={team}
        onBack={onBack}
        onClose={onClose}
        onDownload={downloadTeamSheet}
      />

      {/* Player Grid */}

      <div
        className="
          grid
          gap-5
          grid-cols-2
          md:grid-cols-3
          xl:grid-cols-5
        "
      >
        {team.players.length > 0 ? (
          team.players.map((player) => (
            <RosterPlayerCard
              key={player.id}
              player={player}
              team={team}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            No Players Bought Yet
          </div>
        )}
      </div>

      {/* Footer */}

      <div className="rounded-xl border bg-card p-6">
        <div className="grid grid-cols-3 text-center">

          <div>
            <div className="text-muted-foreground">
              Players
            </div>

            <div className="font-display text-3xl">
              {team.players.length}/{team.maxSize}
            </div>
          </div>

          <div>
            <div className="text-muted-foreground">
              Remaining Budget
            </div>

            <div className="font-display text-3xl text-primary">
              ₹{team.remainingBudget.toLocaleString()}
            </div>
          </div>

          <div>
            <div className="text-muted-foreground">
              Total Spent
            </div>

            <div className="font-display text-3xl text-accent">
              ₹{spent.toLocaleString()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeamRoster;