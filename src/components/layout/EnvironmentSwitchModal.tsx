import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface EnvironmentSwitchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetEnvironment: 'production' | 'sandbox';
  onConfirm: () => void;
}

export function EnvironmentSwitchModal({
  open,
  onOpenChange,
  targetEnvironment,
  onConfirm,
}: EnvironmentSwitchModalProps) {
  const isProduction = targetEnvironment === 'production';

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {isProduction ? (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--env-production-light))]">
                <AlertTriangle className="h-6 w-6 text-[hsl(var(--env-production-primary))]" />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--env-sandbox-light))]">
                <RefreshCw className="h-6 w-6 text-[hsl(var(--env-sandbox-primary))]" />
              </div>
            )}
            <DialogTitle className="text-xl">Confirm Environment Switch</DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed pt-2">
            {isProduction ? (
              <>
                <p className="font-semibold text-foreground mb-3">
                  ⚠️ You are switching to the <span className="text-[hsl(var(--env-production-primary))]">Production</span> environment.
                </p>
                <p className="text-muted-foreground">
                  Manual billing will be activated, and you will be charged for all identity verification transactions.
                </p>
                <p className="mt-3 font-medium text-foreground">
                  Are you sure you want to continue?
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-foreground mb-3">
                  🔄 You are switching back to the <span className="text-[hsl(var(--env-sandbox-primary))]">Sandbox</span> environment.
                </p>
                <p className="text-muted-foreground">
                  Sandbox mode is free and used for testing only — no billing will occur.
                </p>
                <p className="mt-3 font-medium text-foreground">
                  Do you want to continue?
                </p>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className={
              isProduction
                ? "bg-[hsl(var(--env-production-primary))] hover:bg-[hsl(var(--env-production-primary))]/90"
                : "bg-[hsl(var(--env-sandbox-primary))] hover:bg-[hsl(var(--env-sandbox-primary))]/90"
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
