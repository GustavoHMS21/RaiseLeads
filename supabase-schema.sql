-- =============================================
-- RaiseLead - Schema do Banco de Dados (Supabase/PostgreSQL)
-- =============================================

-- Habilitar extensoes necessarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABELA: profiles (dados do usuario)
-- =============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- TABELA: clients (empresas/clientes)
-- =============================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nome_empresa TEXT NOT NULL,
  segmento TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT '',
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  plano TEXT NOT NULL DEFAULT 'starter' CHECK (plano IN ('starter', 'growth', 'scale')),
  status TEXT NOT NULL DEFAULT 'trial' CHECK (status IN ('ativo', 'inativo', 'trial')),
  meta_pixel_id TEXT,
  instagram_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_clients_user_id ON clients(user_id);

-- =============================================
-- TABELA: leads
-- =============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  origem TEXT NOT NULL DEFAULT 'Meta Ads',
  campanha TEXT,
  interesse TEXT,
  status TEXT NOT NULL DEFAULT 'novo' CHECK (status IN ('novo', 'contactado', 'qualificado', 'convertido', 'perdido')),
  notas TEXT,
  valor_estimado DECIMAL(12, 2),
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_client_id ON leads(client_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_data ON leads(data);

-- =============================================
-- TABELA: campaigns (campanhas)
-- =============================================
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  nome_campanha TEXT NOT NULL,
  objetivo TEXT NOT NULL DEFAULT 'Geracao de Leads',
  orcamento_diario DECIMAL(10, 2) NOT NULL DEFAULT 0,
  orcamento_total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  cpl_meta DECIMAL(10, 2) NOT NULL DEFAULT 0,
  cpl_atual DECIMAL(10, 2),
  leads_gerados INTEGER NOT NULL DEFAULT 0,
  impressoes INTEGER DEFAULT 0,
  cliques INTEGER DEFAULT 0,
  conversoes INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'rascunho' CHECK (status IN ('ativa', 'pausada', 'finalizada', 'rascunho')),
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  data_fim DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_campaigns_client_id ON campaigns(client_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- =============================================
-- TABELA: guia_progress (progresso do guia de trafego)
-- =============================================
CREATE TABLE guia_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  step_id INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(client_id, step_id)
);

CREATE INDEX idx_guia_progress_client_id ON guia_progress(client_id);

-- =============================================
-- TABELA: notifications
-- =============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('novo_lead', 'cpl_alto', 'relatorio', 'lembrete')),
  titulo TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  lida BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_client_id ON notifications(client_id);
CREATE INDEX idx_notifications_lida ON notifications(lida);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE guia_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: usuarios so veem seus proprios dados
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Clients: usuarios so veem seus proprios clientes
CREATE POLICY "Users can view own clients"
  ON clients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clients"
  ON clients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clients"
  ON clients FOR UPDATE
  USING (auth.uid() = user_id);

-- Leads: acesso via client_id -> user_id
CREATE POLICY "Users can view leads of their clients"
  ON leads FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert leads for their clients"
  ON leads FOR INSERT
  WITH CHECK (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update leads of their clients"
  ON leads FOR UPDATE
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Campaigns: mesma logica
CREATE POLICY "Users can view campaigns of their clients"
  ON campaigns FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert campaigns for their clients"
  ON campaigns FOR INSERT
  WITH CHECK (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update campaigns of their clients"
  ON campaigns FOR UPDATE
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Guia Progress
CREATE POLICY "Users can manage their guia progress"
  ON guia_progress FOR ALL
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Notifications
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their notifications"
  ON notifications FOR UPDATE
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- =============================================
-- FUNCAO: Auto-criar profile ao registrar
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- FUNCAO: Auto-atualizar updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
