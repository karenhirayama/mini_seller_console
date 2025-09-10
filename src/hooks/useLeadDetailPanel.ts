import { useEffect, useState } from "react";

import type { Lead, PanelConfigProps } from "../interfaces/miniSellerConsole";

export const useLeadDetailPanel = (
  panelConfig: PanelConfigProps | null,
  selectedLead: Lead | null,
  onUpdateLead: (leadId: string, updates: Partial<Lead>) => Promise<void>,
  onClosePanel: () => void
) => {
  const [editingLead, setEditingLead] = useState<Lead | null>(selectedLead);
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setEditingLead(selectedLead);

    if (!panelConfig?.isLoading) {
      setIsEditing(false);
    }
  }, [selectedLead]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = () => {
    if (!editingLead) return;

    if (!validateEmail(editingLead?.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    onUpdateLead(editingLead?.id, {
      email: editingLead?.email,
      status: editingLead?.status,
    });
    setEmailError("");
  };

  const handleCancel = () => {
    setEditingLead(null);
    setIsEditing(false);
    setEmailError("");
    onClosePanel();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditingLead(selectedLead);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingLead(selectedLead);
    setEmailError("");
  };

  return {
    editingLead,
    isEditing,
    emailError,
    setEditingLead,
    onEdit: handleEdit,
    onSave: handleSave,
    onCancel: handleCancel,
    onCancelEdit: handleCancelEdit,
  };
};
