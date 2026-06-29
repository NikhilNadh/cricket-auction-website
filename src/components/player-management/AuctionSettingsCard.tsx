import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, IndianRupee } from "lucide-react";
import { useAuction } from "@/context/AuctionContext";

const BASE_PRICES = [
  150, 200, 300, 400, 500, 750, 1000, 1500,
  2000, 2500, 3000, 4000, 5000,
];

const AuctionSettingsCard = () => {
  const {
    players,
    basePrice,
    setBasePrice,
    bidIncrement,
    setBidIncrement,
    setStep,
  } = useAuction();

  const basePriceSet = players.length > 0;

  return (
    <Card className="card-stadium">
      <CardHeader>
        <CardTitle className="font-display text-lg flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-accent" />
          Auction Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Base Price (₹)</Label>

          <Select
            value={basePrice.toString()}
            onValueChange={(v) => setBasePrice(Number(v))}
            disabled={basePriceSet}
          >
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {BASE_PRICES.map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  ₹{price.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {basePriceSet && (
            <p className="text-xs text-muted-foreground mt-1">
              Base price is locked after players are added.
            </p>
          )}
        </div>

        <div>
          <Label>Bid Increment (₹)</Label>

          <Input
            type="number"
            value={bidIncrement}
            min={10}
            step={10}
            className="bg-secondary border-border"
            onChange={(e) => setBidIncrement(Number(e.target.value))}
          />
        </div>

        <div className="border-t border-border pt-4">
          <div className="text-sm text-muted-foreground mb-2">
            Quick Stats
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-secondary/50 rounded-lg p-2 text-center">
              <div className="font-display text-lg text-primary">
                {players.length}
              </div>

              <div className="text-xs text-muted-foreground">
                Auction Pool
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-2 text-center">
              <div className="font-display text-lg text-accent">
                ₹{basePrice}
              </div>

              <div className="text-xs text-muted-foreground">
                Base Price
              </div>
            </div>
          </div>
        </div>

        {players.length > 0 && (
          <Button
            size="lg"
            className="w-full btn-auction mt-2"
            onClick={() => setStep("auction")}
          >
            Start Auction

            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AuctionSettingsCard;