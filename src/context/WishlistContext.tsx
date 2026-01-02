import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlistIds: Set<number>;
  wishlistCount: number;
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  toggleWishlist: (productId: number) => Promise<void>;
  isLoading: boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch wishlist from API
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlistIds(new Set());
      return;
    }

    try {
      setIsLoading(true);
      const wishlistProducts = await api.getWishlist();
      const ids = new Set(wishlistProducts.map((product) => product.id));
      setWishlistIds(ids);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistIds(new Set());
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Load wishlist when user logs in
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Check if product is in wishlist (instant, no API call)
  const isInWishlist = useCallback(
    (productId: number): boolean => {
      return wishlistIds.has(productId);
    },
    [wishlistIds]
  );

  // Add to wishlist with optimistic update
  const addToWishlist = useCallback(
    async (productId: number) => {
      if (!isAuthenticated) return;

      // Optimistic update - use Array.from to avoid spread operator issue
      setWishlistIds((prev) => {
        const newSet = new Set(Array.from(prev));
        newSet.add(productId);
        return newSet;
      });

      try {
        await api.addToWishlist(productId);
      } catch (error) {
        // Revert on error
        setWishlistIds((prev) => {
          const newSet = new Set(Array.from(prev));
          newSet.delete(productId);
          return newSet;
        });
        console.error("Error adding to wishlist:", error);
        throw error;
      }
    },
    [isAuthenticated]
  );

  // Remove from wishlist with optimistic update
  const removeFromWishlist = useCallback(
    async (productId: number) => {
      if (!isAuthenticated) return;

      // Optimistic update
      setWishlistIds((prev) => {
        const newSet = new Set(Array.from(prev));
        newSet.delete(productId);
        return newSet;
      });

      try {
        await api.removeFromWishlist(productId);
      } catch (error) {
        // Revert on error
        setWishlistIds((prev) => {
          const newSet = new Set(Array.from(prev));
          newSet.add(productId);
          return newSet;
        });
        console.error("Error removing from wishlist:", error);
        throw error;
      }
    },
    [isAuthenticated]
  );

  // Toggle wishlist (add or remove)
  const toggleWishlist = useCallback(
    async (productId: number) => {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  // Refresh wishlist from server
  const refreshWishlist = useCallback(async () => {
    await fetchWishlist();
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.size,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isLoading,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
}
