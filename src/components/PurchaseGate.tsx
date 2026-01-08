import { ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { usePurchaseStatus } from "@/hooks/use-purchase-status";
import { Loader2 } from "lucide-react";

interface PurchaseGateProps {
  user: User | null;
  children: ReactNode;
  fallback: ReactNode;
}

const PurchaseGate = ({ user, children, fallback }: PurchaseGateProps) => {
  const { hasPurchased, isLoading } = usePurchaseStatus(user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!hasPurchased) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PurchaseGate;
