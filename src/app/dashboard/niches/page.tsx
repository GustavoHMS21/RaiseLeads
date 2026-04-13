"use client"

import { useState } from "react"
import { nichosTemplates } from "@/data/nichos"
import { NicheTemplate } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import {
  Target,
  Sparkles,
  Smile,
  Home,
  Dumbbell,
  Sun,
  Scale,
  Users,
  DollarSign,
  Copy,
  ChevronRight,
  X,
  Lightbulb,
  Palette,
  MessageSquare,
  Eye,
  ArrowRight,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-6 w-6" />,
  Smile: <Smile className="h-6 w-6" />,
  Home: <Home className="h-6 w-6" />,
  Dumbbell: <Dumbbell className="h-6 w-6" />,
  Sun: <Sun className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
}

const colorPalette = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-emerald-500 to-emerald-600",
  "from-red-500 to-red-600",
  "from-amber-500 to-amber-600",
  "from-indigo-500 to-indigo-600",
]

export default function NichesPage() {
  const [selectedNiche, setSelectedNiche] = useState<NicheTemplate | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => setCopiedText(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Target className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Nichos e Templates</h1>
        </div>
        <p className="text-gray-500">
          Escolha seu nicho e receba templates prontos de publico, copy e criativos para usar no Meta Ads
        </p>
      </div>

      {!selectedNiche ? (
        /* Niche Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nichosTemplates.map((niche, index) => (
            <div
              key={niche.id}
              className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer"
              onClick={() => setSelectedNiche(niche)}
            >
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${colorPalette[index]} p-3 text-white mb-4`}>
                {iconMap[niche.icon]}
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {niche.nome}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{niche.descricao}</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    CPL medio: {formatCurrency(niche.cpl_medio)}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {niche.publico_alvo.slice(0, 2).map((p) => (
                  <Badge key={p} variant="secondary" className="text-xs">
                    {p}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Ver templates completos
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Niche Detail */
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedNiche(null)}
            className="gap-2 text-gray-500"
          >
            <X className="h-4 w-4" />
            Voltar para todos os nichos
          </Button>

          {/* Niche Header */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className={`rounded-xl bg-gradient-to-br ${colorPalette[nichosTemplates.indexOf(selectedNiche)]} p-4 text-white`}>
                {iconMap[selectedNiche.icon]}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{selectedNiche.nome}</h2>
                <p className="text-gray-500 mt-1">{selectedNiche.descricao}</p>
                <div className="mt-3 flex items-center gap-4">
                  <Badge variant="default">CPL medio: {formatCurrency(selectedNiche.cpl_medio)}</Badge>
                  <Badge variant="success">Ticket medio: {formatCurrency(selectedNiche.ticket_medio)}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Publico Alvo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Publico-Alvo Recomendado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedNiche.publico_alvo.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-700">{p}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Faixa Etaria: {selectedNiche.faixa_etaria.min} - {selectedNiche.faixa_etaria.max} anos
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Genero: {selectedNiche.genero === "todos" ? "Todos" : selectedNiche.genero === "masculino" ? "Masculino" : "Feminino"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Interesses Meta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Interesses para Segmentacao no Meta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-3">
                Cole esses interesses no Gerenciador de Anuncios do Meta na secao de segmentacao:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedNiche.interesses_meta.map((interesse) => (
                  <button
                    key={interesse}
                    onClick={() => copyToClipboard(interesse, interesse)}
                    className="flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm text-purple-700 hover:bg-purple-100 transition-colors"
                  >
                    {interesse}
                    <Copy className="h-3 w-3" />
                    {copiedText === interesse && (
                      <span className="text-xs text-emerald-600 ml-1">Copiado!</span>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Copy Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
                Templates de Copy (Textos Prontos)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedNiche.copy_templates.map((template, i) => (
                <div
                  key={i}
                  className="relative rounded-lg border border-gray-100 bg-gray-50 p-4 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={
                      template.tipo === "headline" ? "default" :
                      template.tipo === "descricao" ? "purple" : "success"
                    }>
                      {template.tipo === "headline" ? "Titulo" :
                       template.tipo === "descricao" ? "Descricao" : "CTA (Botao)"}
                    </Badge>
                    <Badge variant="secondary">{template.variante}</Badge>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed">{template.texto}</p>
                  <button
                    onClick={() => copyToClipboard(template.texto, `copy-${i}`)}
                    className="absolute top-3 right-3 rounded-lg p-2 text-gray-400 hover:bg-white hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copiedText === `copy-${i}` && (
                    <span className="absolute top-4 right-12 text-xs text-emerald-600">Copiado!</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dicas de Criativos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-amber-600" />
                Dicas para Criativos (Imagens/Videos)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedNiche.criativos_dicas.map((dica, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
                    <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">{dica}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
