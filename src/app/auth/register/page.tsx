"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Zap, User, Mail, Lock, Building, Phone, ArrowRight, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    whatsapp: "",
    segmento: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { nome: form.nome },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    const userId = data.user?.id
    if (userId) {
      const { error: clientError } = await supabase.from("clients").insert({
        user_id: userId,
        nome_empresa: form.empresa,
        segmento: form.segmento,
        cidade: "",
        estado: "",
        whatsapp: form.whatsapp,
        email: form.email,
        plano: "starter",
        status: "trial",
      })

      if (clientError) {
        setError("Conta criada, mas erro ao salvar empresa: " + clientError.message)
        setLoading(false)
        return
      }
    }

    // Se confirmação de email estiver desativada, já tem sessão → dashboard
    if (data.session) {
      router.push("/dashboard")
      router.refresh()
    } else {
      setError("Conta criada! Verifique seu email para confirmar antes de fazer login.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-12">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-bold leading-tight">
            Comece a gerar leads hoje
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Crie sua conta e tenha acesso a todas as ferramentas para gerenciar
            seus leads e campanhas de trafego pago.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { value: "100%", label: "Gratis para comecar" },
              { value: "5min", label: "Para configurar" },
              { value: "6+", label: "Nichos com templates" },
              { value: "8", label: "Passos no guia" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-blue-500/20 p-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">RaiseLead</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">Criar sua conta</h1>
          <p className="mt-2 text-gray-500">
            Preencha os dados abaixo para comecar
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seu nome
                </label>
                <Input
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Joao Silva"
                  icon={<User className="h-4 w-4" />}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa
                </label>
                <Input
                  required
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  placeholder="Minha Empresa"
                  icon={<Building className="h-4 w-4" />}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                icon={<Mail className="h-4 w-4" />}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <Input
                required
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="11987654321"
                icon={<Phone className="h-4 w-4" />}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Segmento
              </label>
              <Select
                required
                value={form.segmento}
                onChange={(e) => setForm({ ...form, segmento: e.target.value })}
                placeholder="Escolha seu segmento"
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
                Senha
              </label>
              <Input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimo 6 caracteres"
                icon={<Lock className="h-4 w-4" />}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 h-12 text-base mt-2"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Criar conta gratis"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Ja tem conta?{" "}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-700">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
