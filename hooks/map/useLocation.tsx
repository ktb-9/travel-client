import { categoryMap, initialLocationState } from "@/constants/default";
import { LocationSearchProps, SearchResult } from "@/types/map/map";
import { LocationItem } from "@/types/viewTrip/viewTrip";

export const useLocation = ({
  currentLocationIndex,
  setShowSearchResults,
  useDebouncedSearch,
  setIsSearching,
  setSearchResults,
  setNewLocation,
  setCurrentLocationIndex,
  newLocation,
}: LocationSearchProps) => {
  const handleSearch = (text: string) => {
    updateLocationField(currentLocationIndex, "name", text);
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
    updateLocationField(currentLocationIndex, "name", place.place_name);
    updateLocationField(currentLocationIndex, "address", place.address_name);
    updateLocationField(
      currentLocationIndex,
      "category",
      categoryMap[place.category_group_code] || "기타"
    );
    setShowSearchResults(false);
  };

  const updateLocationField = (
    index: number,
    field: keyof LocationItem,
    value: string
  ) => {
    setNewLocation((prev) => {
      const updatedLocations = [...prev.locations];
      updatedLocations[index] = {
        ...updatedLocations[index],
        [field]: value,
      };
      return {
        ...prev,
        locations: updatedLocations,
      };
    });
  };

  const handleDestinationChange = (text: string) => {
    setNewLocation((prev) => ({
      ...prev,
      destination: text,
    }));
  };

  const addNewLocation = () => {
    setNewLocation((prev) => ({
      ...prev,
      locations: [...prev.locations, { ...initialLocationState }],
    }));
    setCurrentLocationIndex(newLocation.locations.length);
  };

  const removeLocation = (index: number) => {
    if (newLocation.locations.length > 1) {
      setNewLocation((prev) => ({
        ...prev,
        locations: prev.locations.filter((_, i) => i !== index),
      }));
      setCurrentLocationIndex(Math.max(0, currentLocationIndex - 1));
    }
  };
  return {
    handleSearch,
    handleSelectPlace,
    updateLocationField,
    handleDestinationChange,
    addNewLocation,
    removeLocation,
  };
};
