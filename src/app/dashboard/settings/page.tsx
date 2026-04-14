"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import {
  Settings,
  Building,
  CreditCard,
  Save,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react"
import type { PlanType } from "@/types"

type ProfileForm = {
  nome_empresa: string
  email: string
  whatsapp: string
  segmento: string
  cidade: string
  estado: string
}

const PLAN_DETAILS: Record<PlanType, { price: string; leads: string }> = {
  starter: { price: "R$97", leads: "50 leads/mes" },
  growth: { price: "R$197", leads: "150 leads/mes" },
  scale: { price: "R$297", leads: "Ilimitado" },
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientId, setClientId] = useState<string | null>(null)
  const [plan, setPlan] = useState<PlanType>("starter")
  const [profile, setProfile] = useState<ProfileForm>({
    nome_empresa: "",
    email: "",
    whatsapp: "",
    segmento: "",
    cidade: "",
    estado: "",
  })

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from("clients")
        .select("id, nome_empresa, email, whatsapp, segmento, cidade, estado, plano")
        .eq("user_id", user.id)
        .maybeSingle()

      if (error) {
        setError(error.message)
      } else if (data) {
        setClientId(data.id)
        setPlan((data.plano as PlanType) ?? "starter")
        setProfile({
          nome_empresa: data.nome_empresa ?? "",
          email: data.email ?? "",
          whatsapp: data.whatsapp ?? "",
          segmento: data.segmento ?? "",
          cidade: data.cidade ?? "",
          estado: data.estado ?? "",
        })
      }
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    if (!clientId) return
    setSaving(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase
      .from("clients")
      .update({
        nome_empresa: profile.nome_empresa,
        email: profile.email,
        whatsapp: profile.whatsapp,
        segmento: profile.segmento,
        cidade: profile.cidade,
        estado: profile.estado,
      })
      .eq("id", clientId)
    setSaving(false)
    if (error) {
      setError("Erro ao salvar: " + error.message)
      return
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Configuracoes</h1>
        </div>
        <p className="text-gray-500">Gerencie seu perfil e preferencias</p>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-400" />
            Dados da Empresa
          </CardTitle>
          <CardDescription>Informacoes basicas do seu negocio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Empresa
              </label>
              <Input
                value={profile.nome_empresa}
                onChange={(e) => setProfile({ ...profile, nome_empresa: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <Input
                value={profile.whatsapp}
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Segmento
              </label>
              <Select
                value={profile.segmento}
                onChange={(e) => setProfile({ ...profile, segmento: e.target.value })}
                options={[
                  { value: "clinica-estetica", label: "Clinica Estetica" },
                  { value: "dentista", label: "Dentista / Implante" },
                  { value: "imobiliaria", label: "Imobiliaria" },
                  { value: "academia", label: "Academia / CrossFit" },
                  { value: "energia-solar", label: "Energia Solar" },
                  { value: "advogado", label: "Advogado" },
                  { value: "outro", label: "Outro" },
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <Input
                value={profile.cidade}
                onChange={(e) => setProfile({ ...profile, cidade: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <Input
                maxLength={2}
                value={profile.estado}
                onChange={(e) => setProfile({ ...profile, estado: e.target.value.toUpperCase() })}
                placeholder="SP"
              />
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <Check className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar Alteracoes"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-400" />
            Plano Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Plano {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </h3>
                <Badge variant="default">Ativo</Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">{PLAN_DETAILS[plan].leads}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{PLAN_DETAILS[plan].price}</p>
              <p className="text-sm text-gray-500">/mes</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {(Object.keys(PLAN_DETAILS) as PlanType[]).map((p) => (
              <div
                key={p}
                className={`rounded-lg border p-4 text-center ${
                  p === plan ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200"
                }`}
              >
                <p className="font-semibold text-gray-900 capitalize">{p}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{PLAN_DETAILS[p].price}</p>
                <p className="text-xs text-gray-500">{PLAN_DETAILS[p].leads}</p>
                {p === plan && <Badge variant="default" className="mt-2">Atual</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
