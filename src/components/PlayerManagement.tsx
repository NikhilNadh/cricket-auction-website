import AuctionSettingsCard from "./player-management/AuctionSettingsCard";
import PlayerPoolCard from "./player-management/PlayerPoolCard";
import PlayerDatabaseCard from "./player-management/PlayerDatabaseCard";
import AddPlayerDialog from "./player-management/AddPlayerDialog";

const PlayerManagement = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="font-display text-3xl font-bold text-glow">
            Player Management
          </h2>

          <p className="text-muted-foreground mt-1">
            Manage your player database and auction pool
          </p>
        </div>

        <AddPlayerDialog />

      </div>

      {/* Cards */}
      <div className="grid gap-6">

        {/* Auction Settings */}
        <AuctionSettingsCard />

        {/* Auction Pool */}
        <PlayerPoolCard />

        {/* Player Database */}
        <PlayerDatabaseCard />

      </div>

    </div>
  );
};

export default PlayerManagement;