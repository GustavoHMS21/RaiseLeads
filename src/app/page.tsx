import Link from "next/link"
import {
  Zap,
  Users,
  Target,
  BookOpen,
  Megaphone,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Star,
  TrendingUp,
  MessageCircle,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Gestao de Leads",
    description: "Cadastre, organize e acompanhe todos os seus leads em um so lugar. Mude status, adicione notas e nunca perca um contato.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Target,
    title: "Templates por Nicho",
    description: "Receba publico-alvo, interesses, copys e dicas de criativos prontos para seu segmento. E so copiar e usar.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: BookOpen,
    title: "Guia de Trafego Pago",
    description: "Passo a passo completo para criar campanhas no Meta Ads, desde zero. Mesmo sem nenhuma experiencia.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Megaphone,
    title: "Controle de Campanhas",
    description: "Registre suas campanhas, acompanhe CPL, impressoes, cliques e veja o que esta funcionando.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: BarChart3,
    title: "Dashboard Inteligente",
    description: "Metricas em tempo real: total de leads, CPL medio, taxa de conversao e campanhas ativas.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: MessageCircle,
    title: "Integracao WhatsApp",
    description: "Abra conversa no WhatsApp direto do sistema com um clique. Responda leads em segundos.",
    color: "bg-green-50 text-green-600",
  },
]

const plans = [
  {
    name: "Starter",
    price: "997",
    period: "/mes",
    description: "Para quem esta comecando",
    features: [
      "Ate 50 leads/mes",
      "1 campanha ativa",
      "Guia de trafego completo",
      "Templates de 2 nichos",
      "Dashboard basico",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "1.497",
    period: "/mes",
    description: "Para quem quer crescer",
    features: [
      "Ate 150 leads/mes",
      "Campanhas ilimitadas",
      "Guia de trafego completo",
      "Templates de todos os nichos",
      "Dashboard completo com graficos",
      "Suporte prioritario",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    price: "1.997",
    period: "/mes",
    description: "Para operacoes escaladas",
    features: [
      "Leads ilimitados",
      "Campanhas ilimitadas",
      "Tudo do Growth",
      "Multi-usuarios",
      "Relatorios avancados",
      "Consultoria mensal",
      "API de integracao",
    ],
    highlight: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RaiseLead</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Funcionalidades</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Planos</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              Comecar gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
              <Zap className="h-4 w-4" />
              Sistema de Gestao de Leads + Trafego Pago
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Seus leads{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                organizados
              </span>
              , seu trafego{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                orientado
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              RaiseLead e o sistema que organiza seus leads, ensina trafego pago
              do zero e da tudo pronto para voce so chegar e rodar suas campanhas.
              Mesmo sem experiencia nenhuma.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:shadow-blue-300"
              >
                Comecar gratis agora
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
              >
                Ja tenho conta
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Gratis para comecar
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Sem cartao de credito
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Setup em 5 minutos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Tudo que voce precisa para gerar leads
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Um sistema completo que te guia do zero ate a geracao de leads recorrentes pelo Meta Ads
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className={`inline-flex rounded-xl ${feature.color} p-3 mb-5`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Como funciona
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              3 passos simples para comecar a gerar leads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Escolha seu Nicho",
                description: "Selecione seu segmento e receba templates prontos de publico, copy e criativos.",
                icon: Target,
              },
              {
                step: "02",
                title: "Siga o Guia",
                description: "O passo a passo te ensina a criar campanhas no Meta Ads, do zero ao avancado.",
                icon: BookOpen,
              },
              {
                step: "03",
                title: "Gerencie seus Leads",
                description: "Leads entram, voce organiza, contacta e converte. Tudo em um dashboard limpo.",
                icon: TrendingUp,
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                  <item.icon className="h-8 w-8" />
                </div>
                <span className="text-sm font-bold text-blue-600">Passo {item.step}</span>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Planos simples e transparentes
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Escolha o plano ideal para o tamanho da sua operacao
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-blue-500 bg-blue-50/30 shadow-xl shadow-blue-100 ring-2 ring-blue-200 relative"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white shadow-sm">
                    <Star className="h-3.5 w-3.5" />
                    Mais popular
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-sm text-gray-500">R$</span>
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <Link
                href="/auth/register"
                className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Comecar agora
              </Link>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Pronto para organizar seus leads?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Comece gratis hoje e veja como e facil gerenciar leads e trafego pago com o RaiseLead.
          </p>
          <Link
            href="/auth/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 hover:bg-blue-50 shadow-lg transition-all"
          >
            Criar minha conta gratis
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">RaiseLead</span>
          </div>
          <p className="text-sm text-gray-400">
            2026 RaiseLead. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
