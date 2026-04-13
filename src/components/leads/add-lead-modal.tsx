"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { X, UserPlus } from "lucide-react"

interface AddLeadModalProps {
  open: boolean
  onClose: () => void
  onAdd: (lead: {
    nome: string
    telefone: string
    email: string
    origem: string
    campanha: string
    interesse: string
    valor_estimado: number
  }) => void
}

export function AddLeadModal({ open, onClose, onAdd }: AddLeadModalProps) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    origem: "Meta Ads",
    campanha: "",
    interesse: "",
    valor_estimado: 0,
  })

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(form)
    setForm({
      nome: "",
      telefone: "",
      email: "",
      origem: "Meta Ads",
      campanha: "",
      interesse: "",
      valor_estimado: 0,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl mx-4">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Novo Lead</h2>
              <p className="text-sm text-gray-500">Cadastre um lead manualmente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo *
            </label>
            <Input
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: Maria Silva"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone *
              </label>
              <Input
                required
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                placeholder="11987654321"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origem
            </label>
            <Select
              value={form.origem}
              onChange={(e) => setForm({ ...form, origem: e.target.value })}
              options={[
                { value: "Meta Ads", label: "Meta Ads" },
                { value: "Instagram", label: "Instagram" },
                { value: "Google Ads", label: "Google Ads" },
                { value: "Indicacao", label: "Indicacao" },
                { value: "WhatsApp", label: "WhatsApp" },
                { value: "Outro", label: "Outro" },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campanha
            </label>
            <Input
              value={form.campanha}
              onChange={(e) => setForm({ ...form, campanha: e.target.value })}
              placeholder="Nome da campanha"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interesse
              </label>
              <Input
                value={form.interesse}
                onChange={(e) => setForm({ ...form, interesse: e.target.value })}
                placeholder="Ex: Botox"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Estimado (R$)
              </label>
              <Input
                type="number"
                value={form.valor_estimado || ""}
                onChange={(e) => setForm({ ...form, valor_estimado: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Cadastrar Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
