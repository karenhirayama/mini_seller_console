import { useMiniSellerConsoleContext } from "../context/MiniSellerConsoleProvider";
import { statusColors } from "../helpers/statusColors";

import { useLeadDetailPanel } from "../hooks/useLeadDetailPanel";
import type { LeadStatus } from "../interfaces/miniSellerConsole";

const LeadDetailPanel = () => {
  const {
    selectedLead,
    panelConfig,
    onClosePanel,
    onUpdateLead,
    onConvertLeadToOpportunity,
  } = useMiniSellerConsoleContext();

  const {
    editingLead,
    isEditing,
    emailError,
    onEdit,
    setEditingLead,
    onSave,
    onCancel,
    onCancelEdit,
  } = useLeadDetailPanel(panelConfig, selectedLead, onUpdateLead, onClosePanel);

  if (!selectedLead) return;

  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 ${
        panelConfig?.open ? "block" : "hidden"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 backdrop-blur-[1px] transition-opacity"
          onClick={onCancel}
        ></div>

        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 py-6 sm:px-6 bg-gray-50">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Lead Details
                  </h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onCancel}
                  >
                    <span className="sr-only">Close</span>✕
                  </button>
                </div>
              </div>

              <div className="flex-1 py-6 px-4 sm:px-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="mt-1 text-sm text-gray-900">
                      {selectedLead?.name}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <div className="mt-1 text-sm text-gray-900">
                      {selectedLead?.company}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    {isEditing && editingLead ? (
                      <>
                        <input
                          type="email"
                          value={editingLead?.email}
                          onChange={(e) =>
                            setEditingLead({
                              ...editingLead,
                              email: e.target.value,
                            })
                          }
                          disabled={panelConfig?.isLoading}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 disabled:bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {emailError && (
                          <p className="mt-1 text-sm text-red-600">
                            {emailError}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="mt-1 text-sm text-gray-900">
                        {selectedLead?.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Source
                    </label>
                    <div className="mt-1 text-sm text-gray-900">
                      {selectedLead?.source}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Score
                    </label>
                    <div className="mt-1 text-sm text-gray-900">
                      {selectedLead?.score}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    {isEditing && editingLead ? (
                      <select
                        value={editingLead?.status}
                        onChange={(e) =>
                          setEditingLead({
                            ...editingLead,
                            status: e.target.value as LeadStatus,
                          })
                        }
                        disabled={panelConfig?.isLoading}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>
                      </select>
                    ) : (
                      <div>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[selectedLead?.status]
                          }`}
                        >
                          {selectedLead?.status.charAt(0).toUpperCase() +
                            selectedLead?.status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 px-4 py-5 sm:px-6 border-t border-gray-200">
                <div className="flex justify-between">
                  {!isEditing ? (
                    <>
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={onEdit}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => onConvertLeadToOpportunity(selectedLead)}
                      >
                        Convert Lead
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100"
                        onClick={onCancelEdit}
                        disabled={panelConfig?.isLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={onSave}
                      >
                        {panelConfig?.isLoading ? 'Saving changes' :'Save'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPanel;
