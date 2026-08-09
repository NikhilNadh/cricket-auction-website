import { Team } from "@/types/auction";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Crown,
  Download,
  Star,
  Wallet,
  Users,
  X,
} from "lucide-react";
import { getImageByCode } from "@/lib/imageUtils";

interface Props {
  team: Team;
  onBack: () => void;
  onClose: () => void;
  onDownload: () => void;
}

const TeamHeader = ({
  team,
  onBack,
  onClose,
  onDownload,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">

      {/* Top Action Bar */}
      <div className="flex items-center justify-between border-b px-5 py-3">

        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">

          <Button
            variant="outline"
            onClick={onDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Team
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

        </div>
      </div>

      {/* Team Information */}

      <div className="p-8">

        <div className="flex gap-6 items-center">

          {/* Logo */}

          {getImageByCode(team.logoCode) ? (
            <img
              src={getImageByCode(team.logoCode)!}
              alt={team.name}
              className="
                w-32
                h-32
                rounded-2xl
                object-cover
                border-4
                border-primary
                shadow-[0_0_30px_hsl(var(--primary)/0.35)]
              "
            />
          ) : (
            <div
              className="
                w-32
                h-32
                rounded-2xl
                flex
                items-center
                justify-center
                text-5xl
                font-bold
              "
              style={{
                backgroundColor: team.color + "30",
                color: team.color,
              }}
            >
              {team.name.charAt(0)}
            </div>
          )}

          {/* Team Details */}

          <div className="flex-1">

            <h1 className="font-display text-4xl font-bold">
              {team.name}
            </h1>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="flex items-center gap-3">

                <Crown
                  className="w-8 h-8 text-yellow-500"
                  fill="currentColor"
                />

                <div>

                  <div className="text-xs uppercase text-muted-foreground">
                    Captain
                  </div>

                  <div className="font-semibold text-lg">
                    {team.captain}
                  </div>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Star
                  className="w-8 h-8 text-yellow-400"
                  fill="currentColor"
                />

                <div>

                  <div className="text-xs uppercase text-muted-foreground">
                    Icon Player
                  </div>

                  <div className="font-semibold text-lg">
                    {team.iconPlayer || "-"}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Stats */}

        <div className="grid grid-cols-2 mt-8 gap-4">

          <div className="rounded-xl bg-secondary/40 p-4 flex items-center gap-4">

            <Users className="w-8 h-8 text-primary" />

            <div>

              <div className="text-xs uppercase text-muted-foreground">
                Players
              </div>

              <div className="font-display text-2xl">
                {team.players.length}/{team.maxSize}
              </div>

            </div>

          </div>

          <div className="rounded-xl bg-secondary/40 p-4 flex items-center gap-4">

            <Wallet className="w-8 h-8 text-primary" />

            <div>

              <div className="text-xs uppercase text-muted-foreground">
                Remaining Budget
              </div>

              <div className="font-display text-2xl text-primary">
                ₹{team.remainingBudget.toLocaleString()}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TeamHeader;