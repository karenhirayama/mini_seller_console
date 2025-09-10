import { useMiniSellerConsoleContext } from "../context/MiniSellerConsoleProvider";

import type { StageOpportunity } from "../interfaces/miniSellerConsole";

const OpportunityTable = () => {
  const { opportunities } = useMiniSellerConsoleContext();

  if (opportunities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow flex flex-col gap-4 p-4">
        <span className="text-center text-gray-500 py-12">
          No opportunities yet. Convert leads to get started!
        </span>
      </div>
    );
  }

  const getStageColor = (stage: StageOpportunity) => {
    switch (stage) {
      case "Closed Won":
        return "bg-green-100 text-green-800";
      case "Closed Lost":
        return "bg-red-100 text-red-800";
      case "Prospecting":
        return "bg-blue-100 text-blue-800";
      case "Qualification":
        return "bg-yellow-100 text-yellow-800";
      case "Proposal":
        return "bg-purple-100 text-purple-800";
      case "Negotiation":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-2xl font-semibold leading-none tracking-tight">
            Opportunities ({opportunities.length})
          </span>
        </div>
        <div className="bg-white rounded-lg shadow max-h-90 bg-green overflow-y-auto">
          <table className="bg-white rounded-lg shadow overflow-hidden min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {opportunities.map((opportunity) => (
                <tr key={opportunity.id} id={opportunity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {opportunity.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opportunity.accountName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(
                        opportunity.stage
                      )}`}
                    >
                      {opportunity.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opportunity.amount
                      ? `$${opportunity.amount.toLocaleString()}`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OpportunityTable;
