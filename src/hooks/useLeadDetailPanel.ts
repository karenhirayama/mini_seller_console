import { useState } from "react"

import type { Lead } from "../interfaces/miniSellerConsole"

export const useLeadDetailPanel = (selectedLead: Lead | null, onUpdateLead: (leadId: string, updates: Partial<Lead>) => Promise<void>) => {
  const [editingLead, setEditingLead] = useState<Lead | null>(selectedLead)
  const [isEditing, setIsEditing] = useState(false)
  const [emailError, setEmailError] = useState("")

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSave = () => {
    if (!editingLead) return 

    if (!validateEmail(editingLead?.email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    onUpdateLead(editingLead?.id, { email: editingLead?.email, status: editingLead?.status })
    setIsEditing(false)
    setEmailError("")
  }

  const handleCancel = () => {
    setEditingLead(null)
    setIsEditing(false)
    setEmailError("")
  }

  return { editingLead, isEditing, emailError, setIsEditing, setEditingLead, onSave: handleSave, onCancel: handleCancel }
}
