export type SortField = "name" | "company" | "score" | "status"
export type SortDirection = "asc" | "desc"
export type LeadStatus = "new" | "contacted" | "qualified" | "lost"
export type StageOpportunity = "Closed Won" | "Closed Lost" | "Prospecting" | "Qualification" | "Proposal" | "Negotiation"

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  source: string
  score: number
  status: LeadStatus
}

export interface Opportunity {
  id: string
  name: string
  stage: StageOpportunity
  amount?: string
  accountName: string
  createdAt: Date
  leadId: string
}

export interface PanelConfigProps {
  open: boolean
  isLoading?: boolean
  isError?: boolean
}

export interface ConvertLeadToOpportunityConfigProps {
  open: boolean
  isLoading?: boolean
  isError?: boolean
}

export interface ErrorConfigProps {
    isError: boolean
    message: string
}