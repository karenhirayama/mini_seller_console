import { createContext, useContext, useEffect, useState } from "react"

import type { ConvertLeadToOpportunityConfigProps, PanelConfigProps, Lead, Opportunity, ErrorConfigProps } from "../interfaces/miniSellerConsole"

interface MiniSellerConsoleContextProps {
  leads: Lead[]
  filteredLeads: Lead[]
  selectedLead: Lead | null
  opportunities: Opportunity[]
  loadingLeads: boolean
  panelConfig: PanelConfigProps | null
  convertLeadToOpportunityConfig: ConvertLeadToOpportunityConfigProps | null
  errorConfig: ErrorConfigProps | null
  onLeadSelect: (lead: Lead) => void
  onClosePanel: () => void
  onUpdateLead: (leadId: string, updates: Partial<Lead>) => Promise<void>
  onConvertLeadToOpportunity: (lead: Lead) => void
  onCreateOpportunity: (opportunityData: Omit<Opportunity, "id" | "createdAt">) => void
}

const MiniSellerConsoleContext = createContext<MiniSellerConsoleContextProps | undefined>(undefined)

interface MiniSellerConsoleProviderProps {
  children: React.ReactNode
}

export const MiniSellerConsoleProvider = ({ children }: MiniSellerConsoleProviderProps) => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [panelConfig, setPanelConfig] = useState<PanelConfigProps | null>(null)
  const [convertLeadToOpportunityConfig, setConvertLeadToOpportunityConfig] = useState<ConvertLeadToOpportunityConfigProps | null>(null)
  const [loadingLeads, setLoadinLeads] = useState(false)
  const [errorConfig, setErrorConfig] = useState<ErrorConfigProps | null>(null)

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoadinLeads(true)
        const response = await fetch("/leads.json")
        if (!response.ok) {
          throw new Error("Failed to load leads data")
        }
        const leadsData: Lead[] = await response.json()
        setLeads(leadsData)
        setFilteredLeads(leadsData)
        setErrorConfig(null)
      } catch (err) {
        setErrorConfig({ isError: true, message: "Failed to load leads. Please try again." })
        console.error("Error loading leads:", err)
      } finally {
        setLoadinLeads(false)
      }
    }

    loadLeads()
  }, [])

  const handleLeadSelect = (lead: Lead) => {
    setPanelConfig({
      open: true,
    })
    setSelectedLead(lead)
  }

  const handleClosePanel = () => {
    setPanelConfig(null)
    setSelectedLead(null)
  }

  const handleUpdateLead = async (leadId: string, updates: Partial<Lead>) => {
    // Simulate API delay
    setPanelConfig((prev) => (prev ? { ...prev, isLoading: true } : null))
    await new Promise((resolve) => setTimeout(resolve, 500))

    setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, ...updates } : lead)))

    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, ...updates } : null))
    }
  }

  const handleConvertLeadToOpportunity = (lead: Lead) => {
    setSelectedLead(lead)
    setPanelConfig(null)
    setConvertLeadToOpportunityConfig({ open: true })
  }

  const handleCreateOpportunity = (opportunityData: Omit<Opportunity, "id" | "createdAt">) => {
    const newOpportunity: Opportunity = {
      ...opportunityData,
      id: `OPP-${Date.now()}`,
      createdAt: new Date(),
    }

    setOpportunities((prev) => [...prev, newOpportunity])
  }

  return <MiniSellerConsoleContext.Provider value={{ leads, filteredLeads, selectedLead, opportunities, loadingLeads, errorConfig, panelConfig, convertLeadToOpportunityConfig, onLeadSelect: handleLeadSelect, onClosePanel: handleClosePanel, onConvertLeadToOpportunity: handleConvertLeadToOpportunity, onCreateOpportunity: handleCreateOpportunity, onUpdateLead: handleUpdateLead }}>{children}</MiniSellerConsoleContext.Provider>
}

export const useMiniSellerConsoleContext = () => {
  const miniSellerConsoleContextConfig = useContext(MiniSellerConsoleContext)

  if (!miniSellerConsoleContextConfig) {
    throw new Error("useMiniSellerConsoleContext must be used within a MiniSellerConsoleProvider")
  }

  return miniSellerConsoleContextConfig
}

export default MiniSellerConsoleProvider
