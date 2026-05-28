"use client";

import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import type { ImcResults } from "@/lib/imc/calculate";
import {
  downloadResultsText,
  formatResultsForExport,
  shareResultsText,
} from "@/lib/imc/export-results";

type ShareResultsActionsProps = {
  results: ImcResults;
};

export function ShareResultsActions({ results }: ShareResultsActionsProps) {
  const { locale, t } = useLocale();

  const getExportText = () => formatResultsForExport(results, t, locale);

  const handleShare = async () => {
    const text = getExportText();
    const outcome = await shareResultsText(text, t.results.shareTitle);

    if (outcome === "shared") {
      toast.success(t.toast.shareSuccess);
    } else if (outcome === "copied") {
      toast.success(t.toast.shareCopied);
    } else {
      toast.error(t.toast.shareFailed);
    }
  };

  const handleDownload = () => {
    const text = getExportText();
    const filename =
      locale === "pt" ? "resultado-imc.txt" : "bmi-result-summary.txt";
    downloadResultsText(text, filename);
    toast.success(t.toast.downloadSuccess);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        className="min-h-11 gap-2 rounded-full"
        onClick={handleShare}
      >
        <Share2 className="size-4" aria-hidden />
        {t.common.share}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="min-h-11 gap-2 rounded-full"
        onClick={handleDownload}
      >
        <Download className="size-4" aria-hidden />
        {t.common.download}
      </Button>
    </div>
  );
}
