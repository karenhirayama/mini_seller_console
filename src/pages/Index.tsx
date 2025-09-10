import ConvertLeadDialog from "../components/ConvertLeadDialog"
import LeadDetailPanel from "../components/LeadDetailPanel"
import LeadsTable from "../components/LeadsTable"
import OpportunitiesTable from "../components/OpportunitiesTable"
import { useMiniSellerConsoleContext } from "../context/MiniSellerConsoleContex"

const Index = () => {
  const { errorConfig, loadingLeads, leads } = useMiniSellerConsoleContext()

  if (errorConfig?.isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Data</h1>
          <p className="text-gray-900 mb-4">{errorConfig?.message}</p>
          <button onClick={() => window.location.reload()} className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Mini Seller Console</h1>
          <p className="text-gray-400">Manage leads and convert them into opportunities</p>
        </div>
      </header>
      <main className="container mx-auto px-6 py-6">
        <div className="space-y-6">
          {/* Leads Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Leads</h2>
              <p className="text-gray-500">{loadingLeads ? "Loading leads..." : `${leads.length} total leads`}</p>
            </div>

            <LeadsTable />
          </div>

          {/* Opportunities Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Opportunities</h2>
              <p className="text-gray-500">Track converted leads and their progress</p>
            </div>

            <OpportunitiesTable />
          </div>
        </div>
      </main>

      <LeadDetailPanel />

      <ConvertLeadDialog />
    </div>
  )
}

export default Index
