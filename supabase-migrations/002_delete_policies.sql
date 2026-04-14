-- =============================================
-- Migration 002: Adiciona policies de DELETE
-- =============================================
-- Rodar no SQL Editor do Supabase apos o schema inicial.

-- Leads: permite apagar leads dos proprios clientes
CREATE POLICY "Users can delete leads of their clients"
  ON leads FOR DELETE
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Campaigns: permite apagar campanhas dos proprios clientes
CREATE POLICY "Users can delete campaigns of their clients"
  ON campaigns FOR DELETE
  USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

-- Clients: permite apagar a propria empresa
CREATE POLICY "Users can delete own clients"
  ON clients FOR DELETE
  USING (auth.uid() = user_id);
