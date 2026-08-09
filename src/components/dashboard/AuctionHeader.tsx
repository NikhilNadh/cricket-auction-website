import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Trophy, X } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  onBack: () => void;
  onClose: () => void;
  onDownload: () => void;
}

const AuctionHeader = ({
  title,
  subtitle,
  onBack,
  onClose,
  onDownload,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">

      {/* Top Bar */}

      <div className="flex items-center justify-between border-b px-6 py-4">

        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex gap-2">

          <Button
            variant="outline"
            onClick={onDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
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

      {/* Title */}

      <div className="text-center py-8">

        <div className="flex justify-center mb-4">

          <div className="rounded-full bg-yellow-500/20 p-5">

            <Trophy
              className="w-12 h-12 text-yellow-400"
              fill="currentColor"
            />

          </div>

        </div>

        <h1 className="font-display text-4xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="text-muted-foreground mt-3">
            {subtitle}
          </p>
        )}

      </div>

    </div>
  );
};

export default AuctionHeader;