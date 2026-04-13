"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Settings,
  User,
  Building,
  CreditCard,
  Bell,
  Shield,
  Save,
  Check,
} from "lucide-react"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    nome: "Minha Empresa",
    email: "contato@minhaempresa.com",
    whatsapp: "11987654321",
    segmento: "clinica-estetica",
    cidade: "Sao Paulo",
    estado: "SP",
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Configuracoes</h1>
        </div>
        <p className="text-gray-500">Gerencie seu perfil e preferencias</p>
      </div>

      {/* Profile */}
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
                value={profile.nome}
                onChange={(e) => setProfile({ ...profile, nome: e.target.value })}
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
                  { value: "dentista-implante", label: "Dentista / Implante" },
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
                value={profile.estado}
                onChange={(e) => setProfile({ ...profile, estado: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Salvo!" : "Salvar Alteracoes"}
          </Button>
        </CardContent>
      </Card>

      {/* Plan */}
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
                <h3 className="text-lg font-bold text-gray-900">Plano Growth</h3>
                <Badge variant="default">Ativo</Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">Ate 150 leads/mes</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">R$1.497</p>
              <p className="text-sm text-gray-500">/mes</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { name: "Starter", price: "R$997", leads: "50 leads/mes", current: false },
              { name: "Growth", price: "R$1.497", leads: "150 leads/mes", current: true },
              { name: "Scale", price: "R$1.997", leads: "Ilimitado", current: false },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border p-4 text-center ${
                  plan.current ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200"
                }`}
              >
                <p className="font-semibold text-gray-900">{plan.name}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{plan.price}</p>
                <p className="text-xs text-gray-500">{plan.leads}</p>
                {plan.current && (
                  <Badge variant="default" className="mt-2">Atual</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gray-400" />
            Notificacoes
          </CardTitle>
          <CardDescription>Configure como deseja receber alertas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Novo lead recebido", desc: "Notificar quando um novo lead entrar", enabled: true },
            { label: "Relatorio semanal", desc: "Resumo dos leads e campanhas", enabled: true },
            { label: "CPL acima da meta", desc: "Alertar quando o CPL subir demais", enabled: false },
            { label: "Lead sem contato 24h", desc: "Lembrar leads nao contactados", enabled: true },
          ].map((notif) => (
            <div key={notif.label} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{notif.label}</p>
                <p className="text-xs text-gray-500">{notif.desc}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked={notif.enabled} className="peer sr-only" />
                <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
