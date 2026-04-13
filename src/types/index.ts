export type UserRole = "admin" | "client"

export type LeadStatus = "novo" | "contactado" | "qualificado" | "convertido" | "perdido"

export type CampaignStatus = "ativa" | "pausada" | "finalizada" | "rascunho"

export type PlanType = "starter" | "growth" | "scale"

export interface User {
  id: string
  email: string
  nome: string
  role: UserRole
  avatar_url?: string
  created_at: string
}

export interface Client {
  id: string
  user_id: string
  nome_empresa: string
  segmento: string
  cidade: string
  estado: string
  whatsapp: string
  email: string
  plano: PlanType
  status: "ativo" | "inativo" | "trial"
  meta_pixel_id?: string
  instagram_url?: string
  created_at: string
}

export interface Lead {
  id: string
  client_id: string
  nome: string
  telefone: string
  email?: string
  origem: string
  campanha?: string
  interesse?: string
  status: LeadStatus
  notas?: string
  valor_estimado?: number
  data: string
  created_at: string
}

export interface Campaign {
  id: string
  client_id: string
  nome_campanha: string
  objetivo: string
  orcamento_diario: number
  orcamento_total: number
  cpl_meta: number
  cpl_atual?: number
  leads_gerados: number
  impressoes?: number
  cliques?: number
  conversoes?: number
  status: CampaignStatus
  data_inicio: string
  data_fim?: string
  created_at: string
}

export interface NicheTemplate {
  id: string
  nome: string
  descricao: string
  icon: string
  publico_alvo: string[]
  interesses_meta: string[]
  faixa_etaria: { min: number; max: number }
  genero: "todos" | "masculino" | "feminino"
  copy_templates: CopyTemplate[]
  criativos_dicas: string[]
  cpl_medio: number
  ticket_medio: number
}

export interface CopyTemplate {
  tipo: "headline" | "descricao" | "cta"
  texto: string
  variante: string
}

export interface GuiaStep {
  id: number
  titulo: string
  descricao: string
  detalhes: string[]
  dica_pro?: string
  completed: boolean
}

export interface DashboardStats {
  total_leads: number
  leads_mes: number
  leads_semana: number
  cpl_medio: number
  taxa_conversao: number
  campanhas_ativas: number
  orcamento_total: number
  roi_estimado: number
}

export interface LeadsByDay {
  date: string
  leads: number
}

export interface LeadsByStatus {
  status: LeadStatus
  count: number
  color: string
}

export interface LeadsByOrigin {
  origem: string
  count: number
}
