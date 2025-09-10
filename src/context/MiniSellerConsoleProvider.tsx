import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  ConvertLeadToOpportunityConfigProps,
  PanelConfigProps,
  Lead,
  Opportunity,
  ErrorConfigProps,
} from "../interfaces/miniSellerConsole";
import { useToast } from "./ToastProvider";

interface MiniSellerConsoleContextProps {
  leads: Lead[];
  filteredLeads: Lead[];
  selectedLead: Lead | null;
  opportunities: Opportunity[];
  loadingLeads: boolean;
  panelConfig: PanelConfigProps | null;
  convertLeadToOpportunityConfig: ConvertLeadToOpportunityConfigProps | null;
  errorConfig: ErrorConfigProps | null;
  onLeadSelect: (lead: Lead) => void;
  onClosePanel: () => void;
  onCancelCovert: () => void;
  onFilterLeads: (filtered: Lead[]) => void;
  onUpdateLead: (leadId: string, updates: Partial<Lead>) => Promise<void>;
  onConvertLeadToOpportunity: (lead: Lead) => void;
  onCreateOpportunity: (newOpportunity: Opportunity) => void;
  onSelectLeadToEdit: (lead: Lead) => void
}

const MiniSellerConsoleContext = createContext<
  MiniSellerConsoleContextProps | undefined
>(undefined);

interface MiniSellerConsoleProviderProps {
  children: React.ReactNode;
}

export const MiniSellerConsoleProvider = ({
  children,
}: MiniSellerConsoleProviderProps) => {
  const { success, error } = useToast();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [panelConfig, setPanelConfig] = useState<PanelConfigProps | null>(null);
  const [convertLeadToOpportunityConfig, setConvertLeadToOpportunityConfig] =
    useState<ConvertLeadToOpportunityConfigProps | null>(null);
  const [loadingLeads, setLoadinLeads] = useState(false);
  const [errorConfig, setErrorConfig] = useState<ErrorConfigProps | null>(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoadinLeads(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch("/leads.json");
        if (!response.ok) {
          throw new Error("Failed to load leads data");
        }
        const leadsData: Lead[] = await response.json();
        setLeads(leadsData);
        setFilteredLeads(leadsData);
        setErrorConfig(null);
      } catch (err) {
        setErrorConfig({
          isError: true,
          message: "Failed to load leads. Please try again.",
        });
        console.error("Error loading leads:", err);
      } finally {
        setLoadinLeads(false);
      }
    };

    loadLeads();
  }, []);

  const handleLeadSelect = (lead: Lead) => {
    setPanelConfig({
      open: true,
    });
    setSelectedLead(lead);
  };

  const handleClosePanel = () => {
    setPanelConfig(null);
    setSelectedLead(null);
  };

  const handleUpdateLead = async (leadId: string, updates: Partial<Lead>) => {
    setPanelConfig((prev) => (prev ? { ...prev, isLoading: true } : null));
    if (selectedLead?.id === leadId) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSelectedLead((prev) => (prev ? { ...prev, ...updates } : null));

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, ...updates } : lead
        )
      );
      setFilteredLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, ...updates } : lead
        )
      );
      setPanelConfig((prev) => (prev ? { ...prev, isLoading: false } : null));
      success("Lead updated successfully");
    }
  };

  const handleConvertLeadToOpportunity = (lead: Lead) => {
    if (opportunities.find((opp) => opp.leadId === lead.id)) {
      error("This lead has already been converted to an opportunity.");
      return;
    }

    setSelectedLead(lead);
    setPanelConfig({ open: false });
    setConvertLeadToOpportunityConfig({ open: true });
  };

  const handleCreateOpportunity = async (newOpportunity: Opportunity) => {
    setConvertLeadToOpportunityConfig((prev) =>
      prev ? { ...prev, isLoading: true } : null
    );
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOpportunities((prev) => [...prev, newOpportunity]);
    setConvertLeadToOpportunityConfig((prev) =>
      prev ? { ...prev, isLoading: false, open: false } : null
    );

    success("Opportunity created successfully");
  };

  const handleFilterLeads = useCallback((filtered: Lead[]) => {
    setFilteredLeads(filtered);
  }, []);

  const handleCancelCovert = () => {
    setConvertLeadToOpportunityConfig(null);
    setSelectedLead(null);
  };

  const handleSelectLeadToEdit = (lead: Lead) => {
    setPanelConfig((prev) => (prev ? { ...prev, editingLead: lead } : null));
  }

  return (
    <MiniSellerConsoleContext.Provider
      value={{
        leads,
        filteredLeads,
        selectedLead,
        opportunities,
        loadingLeads,
        errorConfig,
        panelConfig,
        convertLeadToOpportunityConfig,
        onLeadSelect: handleLeadSelect,
        onClosePanel: handleClosePanel,
        onConvertLeadToOpportunity: handleConvertLeadToOpportunity,
        onCreateOpportunity: handleCreateOpportunity,
        onUpdateLead: handleUpdateLead,
        onFilterLeads: handleFilterLeads,
        onCancelCovert: handleCancelCovert,
        onSelectLeadToEdit: handleSelectLeadToEdit,
      }}
    >
      {children}
    </MiniSellerConsoleContext.Provider>
  );
};

export const useMiniSellerConsoleContext = () => {
  const miniSellerConsoleContextConfig = useContext(MiniSellerConsoleContext);

  if (!miniSellerConsoleContextConfig) {
    throw new Error(
      "useMiniSellerConsoleContext must be used within a MiniSellerConsoleProvider"
    );
  }

  return miniSellerConsoleContextConfig;
};

export default MiniSellerConsoleProvider;
