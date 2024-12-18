import { categoryMap } from "@/constants/default";
import { EditSearchProps, SearchResult } from "@/types/map/map";

export const useEditSerachPlace = ({
  setFormData,
  setShowSearchResults,
  useDebouncedSearch,
  setSearchResults,
  setIsSearching,
}: EditSearchProps) => {
  const handleSearch = (text: string) => {
    setFormData((prev) => ({ ...prev, name: text }));
    if (text.length >= 2) {
      setShowSearchResults(true);
      useDebouncedSearch({
        searchQuery: text,
        setIsSearching,
        setSearchResults,
      });
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const handleSelectPlace = (place: SearchResult) => {
    setFormData((prev) => ({
      ...prev,
      name: place.place_name,
      address: place.address_name,
      category: categoryMap[place.category_group_code],
    }));
    setShowSearchResults(false);
  };
  return { handleSearch, handleSelectPlace };
};
