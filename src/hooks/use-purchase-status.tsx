import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface PurchaseStatus {
  hasPurchased: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePurchaseStatus = (user: User | null): PurchaseStatus => {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkPurchaseStatus = async () => {
    if (!user) {
      setHasPurchased(false);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Check for verified purchase by user_id or email
      const { data, error: fetchError } = await supabase
        .from("user_purchases")
        .select("id, is_verified")
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)
        .eq("is_verified", true)
        .limit(1);

      if (fetchError) {
        console.error("Error checking purchase status:", fetchError);
        setError("Failed to check purchase status");
        setHasPurchased(false);
      } else {
        setHasPurchased(data && data.length > 0);
      }
    } catch (err) {
      console.error("Error in usePurchaseStatus:", err);
      setError("An unexpected error occurred");
      setHasPurchased(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkPurchaseStatus();
  }, [user?.id, user?.email]);

  return {
    hasPurchased,
    isLoading,
    error,
    refetch: checkPurchaseStatus,
  };
};
