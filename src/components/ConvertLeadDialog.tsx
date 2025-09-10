import { useMiniSellerConsoleContext } from "../context/MiniSellerConsoleProvider";

import { useConvertLeadDialog } from "../hooks/useConvertLeadDialog";

const ConvertLeadDialog = () => {
  const {
    convertLeadToOpportunityConfig,
    selectedLead,
    onCreateOpportunity,
    onCancelCovert,
  } = useMiniSellerConsoleContext();
  const {
    opportunityData,
    onClose,
    onSubmitOpportunity,
    onChangeOpportunityData,
  } = useConvertLeadDialog(selectedLead, onCreateOpportunity, onCancelCovert);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        convertLeadToOpportunityConfig?.open ? "block" : "hidden"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Convert Lead to Opportunity
              </h3>

              <form onSubmit={onSubmitOpportunity}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Opportunity Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={opportunityData.name}
                    onChange={onChangeOpportunityData}
                    disabled={convertLeadToOpportunityConfig?.isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="accountName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Account Name *
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    id="accountName"
                    required
                    value={opportunityData.accountName}
                    onChange={onChangeOpportunityData}
                    disabled={convertLeadToOpportunityConfig?.isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="stage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Stage
                  </label>
                  <select
                    name="stage"
                    id="stage"
                    value={opportunityData.stage}
                    onChange={onChangeOpportunityData}
                    disabled={convertLeadToOpportunityConfig?.isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                  >
                    <option value="Prospecting">Prospecting</option>
                    <option value="Qualification">Qualification</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Closed Won">Closed Won</option>
                    <option value="Closed Lost">Closed Lost</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount (USD)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    min="0"
                    step="0.01"
                    value={opportunityData.amount}
                    onChange={onChangeOpportunityData}
                    disabled={convertLeadToOpportunityConfig?.isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Lead Information
                  </h4>
                  <div className="text-sm">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedLead?.name}
                    </div>
                    <div>
                      <span className="font-medium">Company:</span>{" "}
                      {selectedLead?.company}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Email:</span>{" "}
                      {selectedLead?.email}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    onClick={onClose}
                    disabled={convertLeadToOpportunityConfig?.isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={convertLeadToOpportunityConfig?.isLoading}
                  >
                    {convertLeadToOpportunityConfig?.isLoading
                      ? "Converting..."
                      : "Convert to Opportunity"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertLeadDialog;
