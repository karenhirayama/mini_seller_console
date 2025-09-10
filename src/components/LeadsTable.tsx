import { ArrowDown, ArrowUp, ArrowUpDown, Filter, Search } from "lucide-react";

import { useMiniSellerConsoleContext } from "../context/MiniSellerConsoleProvider";

import type { SortField } from "../interfaces/miniSellerConsole";

import { useLeadsTable } from "../hooks/useLeadsTable";
import { statusColors } from "../helpers/statusColors";

const LeadsTable = () => {
  const { leads, filteredLeads, loadingLeads, onLeadSelect, onFilterLeads } =
    useMiniSellerConsoleContext();
  const {
    searchTerm,
    statusFilter,
    sortDirection,
    sortField,
    setSearchTerm,
    setStatusFilter,
    onSort,
  } = useLeadsTable(leads, onFilterLeads);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  if (loadingLeads) {
    return (
      <div className="flex items-center justify-center bg-white rounded-lg shadow h-90 bg-green overflow-y-auto">
        <div className="text-gray-500">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              placeholder="Search leads by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10"
            />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-gray-300 h-10 px-3 py-2">
            <Filter className="h-5 w-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
              <option value="all">All Statuses</option>
            </select>
          </div>
        </div>
      </div>
      {filteredLeads.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-900">
            No leads found matching your criteria.
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow max-h-90 bg-green overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort("name")}
                    className="h-auto p-0 hover:bg-transparent flex items-center gap-1"
                  >
                    Name {getSortIcon("name")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort("company")}
                    className="h-auto p-0 hover:bg-transparent flex items-center gap-1"
                  >
                    Company {getSortIcon("company")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort("score")}
                    className="h-auto p-0 hover:bg-transparent flex items-center gap-1"
                  >
                    Score {getSortIcon("score")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort("status")}
                    className="h-auto p-0 hover:bg-transparent flex items-center gap-1"
                  >
                    Status {getSortIcon("status")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onLeadSelect(lead)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status.charAt(0).toUpperCase() +
                        lead.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default LeadsTable;
