import { useMiniSellerConsoleContext } from "../context/MiniSellerConsoleContex"

import { useLeadDetailPanel } from "../hooks/useLeadDetailPanel"
import type { LeadStatus } from "../interfaces/miniSellerConsole"

const LeadDetailPanel = () => {
  const { selectedLead, panelConfig, onClosePanel, onUpdateLead, onConvertLeadToOpportunity } = useMiniSellerConsoleContext()
  const { editingLead, isEditing, emailError, setIsEditing, setEditingLead, onSave, onCancel } = useLeadDetailPanel(selectedLead, onUpdateLead)

  if (!selectedLead || !editingLead) return

  return (
    <div className={`fixed inset-0 overflow-hidden z-50 ${panelConfig?.open ? "block" : "hidden"}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClosePanel}></div>

        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 py-6 sm:px-6 bg-gray-50">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Lead Details</h2>
                  <button type="button" className="text-gray-400 hover:text-gray-500" onClick={onClosePanel}>
                    <span className="sr-only">Close</span>✕
                  </button>
                </div>
              </div>

              <div className="flex-1 py-6 px-4 sm:px-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedLead?.name}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedLead?.company}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <>
                        <input type="email" value={editingLead?.email} onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                      </>
                    ) : (
                      <div className="mt-1 text-sm text-gray-900">{selectedLead?.email}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedLead?.source}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Score</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedLead?.score}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    {isEditing ? (
                      <select value={editingLead?.status} onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as LeadStatus })} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>
                      </select>
                    ) : (
                      <div className="mt-1 text-sm text-gray-900">{selectedLead?.status}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 px-4 py-5 sm:px-6 border-t border-gray-200">
                <div className="flex justify-between">
                  {!isEditing ? (
                    <>
                      <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setIsEditing(true)}>
                        Edit
                      </button>
                      <button type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => onConvertLeadToOpportunity(selectedLead)}>
                        Convert to Opportunity
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onCancel}>
                        Cancel
                      </button>
                      <button type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onSave}>
                        Save
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
  )
}

export default LeadDetailPanel
