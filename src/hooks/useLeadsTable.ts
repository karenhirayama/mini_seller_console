import { useEffect, useMemo } from "react";

import type {
  Lead,
  SortDirection,
  SortField,
} from "../interfaces/miniSellerConsole";
import { useLocalStorage } from "./useLocalStorage";
import { useDebounce } from "./useDebounce";

export const useLeadsTable = (
  leads: Lead[] | null,
  onFilterLeads: (filtered: Lead[]) => void
) => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    "miniSellerConsoleFilterSearchTerms",
    ""
  );
  const [statusFilter, setStatusFilter] = useLocalStorage<string>(
    "miniSellerConsoleFilterStatus",
    "all"
  );
  const [sortField, setSortField] = useLocalStorage<SortField>(
    "miniSellerConsoleFilterFilter",
    "score"
  );
  const [sortDirection, setSortDirection] = useLocalStorage<SortDirection>(
    "miniSellerConsoleFilterSortDirection",
    "desc"
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const filteredAndSortedLeads = useMemo(() => {
    if (!leads) return []

    let filtered = leads?.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered?.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
      }
      if (typeof bValue === "string") {
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [leads, debouncedSearchTerm, statusFilter, sortField, sortDirection]);

  useEffect(() => {
    onFilterLeads(filteredAndSortedLeads ?? []);
  }, [filteredAndSortedLeads, onFilterLeads]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    filteredAndSortedLeads,
    onSort: handleSort,
  };
};
