"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "Email ou senha incorretos"
          : signInError.message
      )
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">RaiseLead</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h1>
          <p className="mt-2 text-gray-500">
            Acesse sua conta para gerenciar seus leads
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                icon={<Mail className="h-4 w-4" />}
                className="h-12"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Sua senha"
                icon={<Lock className="h-4 w-4" />}
                className="h-12"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 h-12 text-base"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Ainda nao tem conta?{" "}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-700">
              Criar conta gratis
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-12">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-bold leading-tight">
            Seus leads organizados em um so lugar
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Gerencie leads, acompanhe campanhas e receba orientacoes de trafego pago mesmo sem experiencia.
          </p>
          <div className="mt-8 space-y-4">
            {[
              "Dashboard com metricas em tempo real",
              "Guia completo de trafego pago",
              "Templates prontos por nicho",
              "Gestao simples de leads e campanhas",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/30">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-blue-50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
