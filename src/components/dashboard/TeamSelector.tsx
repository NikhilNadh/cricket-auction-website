import { Team } from "@/types/auction";
import { Button } from "@/components/ui/button";
import { getImageByCode } from "@/lib/imageUtils";

interface Props {
  teams: Team[];
  onSelect: (team: Team) => void;
}

const TeamSelector = ({ teams, onSelect }: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {teams.map((team) => (
        <Button
          key={team.id}
          variant="outline"
          className="justify-start h-20"
          onClick={() => onSelect(team)}
        >
          <div className="flex items-center gap-3">

            {getImageByCode(team.logoCode) ? (
              <img
                src={getImageByCode(team.logoCode)!}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                style={{
                  backgroundColor: team.color + "30",
                  color: team.color,
                }}
              >
                {team.name[0]}
              </div>
            )}

            <div className="text-left">
              <div className="font-bold">
                {team.name}
              </div>

              <div className="text-sm text-muted-foreground">
                {team.players.length} Players
              </div>
            </div>

          </div>
        </Button>
      ))}
    </div>
  );
};

export default TeamSelector;