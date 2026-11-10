
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ListingType = "Buy" | "Rent";

export type SearchFilters = {
  location: string;
  listingType: ListingType;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;
  propertyType: string | null;
};

type SearchContextType = {
  filters: SearchFilters;
  updateFilters: (updates: Partial<SearchFilters>) => void;
  resetFilters: () => void;
};

const initialFilters: SearchFilters = {
  location: "",
  listingType: "Buy",
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  propertyType: null,
};

const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    setFilters((current) => ({
      ...current,
      ...updates,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <SearchContext.Provider
      value={{ filters, updateFilters, resetFilters }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }

  return context;
}
