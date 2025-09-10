import { useEffect, useState } from "react";

import type { Lead, Opportunity } from "../interfaces/miniSellerConsole";

export const useConvertLeadDialog = (
  selectedLead: Lead | null,
  onCreateOpportunity:(newOpportunity: Opportunity) => void,
  onCancel: () => void
) => {
  const [opportunityData, setOpportunityData] = useState<Opportunity>({
    id: selectedLead?.id || "",
    name: `${selectedLead?.company} Opportunity` || "",
    stage: "Prospecting",
    amount: "",
    accountName: selectedLead?.company || "",
    createdAt: new Date(),
    leadId: selectedLead?.id || "",
  });

  useEffect(() => {
    if (selectedLead) {
      setOpportunityData({
        id: selectedLead?.id,
        name: `${selectedLead?.company} Opportunity`,
        stage: "Prospecting",
        amount: "",
        accountName: selectedLead?.company,
        createdAt: new Date(),
        leadId: selectedLead?.id,
      });
    }
  }, [selectedLead]);

  const handleSubmitOpportunity = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    onCreateOpportunity(opportunityData);
  };

  const handleChangeOpportunityData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOpportunityData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onCancel();
  };

  return {
    opportunityData,
    onClose: handleClose,
    onSubmitOpportunity: handleSubmitOpportunity,
    onChangeOpportunityData: handleChangeOpportunityData,
  };
};
