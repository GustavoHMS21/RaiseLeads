"use client"

import { useState } from "react"
import { guiaMetaAds, dicasGerais } from "@/data/guia-trafego"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  BookOpen,
  Trophy,
  Clock,
  DollarSign,
  FlaskConical,
  Target,
  Zap,
  ClipboardList,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-5 w-5" />,
  Clock: <Clock className="h-5 w-5" />,
  FlaskConical: <FlaskConical className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  ClipboardList: <ClipboardList className="h-5 w-5" />,
}

export default function GuiaPage() {
  const [steps, setSteps] = useState(guiaMetaAds)
  const [expandedStep, setExpandedStep] = useState<number | null>(1)

  const completedCount = steps.filter((s) => s.completed).length
  const progressPercent = (completedCount / steps.length) * 100

  const toggleStep = (id: number) => {
    setExpandedStep(expandedStep === id ? null : id)
  }

  const toggleComplete = (id: number) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Guia de Trafego Pago</h1>
          </div>
          <p className="text-gray-500">
            Passo a passo completo para criar suas campanhas no Meta Ads, mesmo sem experiencia
          </p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-blue-50/30 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">Seu Progresso</span>
          </div>
          <Badge variant="default">
            {completedCount}/{steps.length} etapas
          </Badge>
        </div>
        <Progress value={progressPercent} color="bg-blue-600" className="h-3" />
        <p className="mt-2 text-sm text-gray-500">
          {completedCount === 0
            ? "Comece pelo passo 1 e siga em ordem!"
            : completedCount === steps.length
            ? "Parabens! Voce completou todo o guia!"
            : `Continue de onde parou - proximo: ${steps.find((s) => !s.completed)?.titulo}`}
        </p>
      </div>

      {/* Dicas Gerais */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-gray-900">Dicas Essenciais</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dicasGerais.map((dica) => (
            <div
              key={dica.titulo}
              className="flex items-start gap-3 rounded-lg bg-white p-4 border border-amber-100"
            >
              <div className="rounded-lg bg-amber-100 p-2 text-amber-600 shrink-0">
                {iconMap[dica.icon]}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{dica.titulo}</p>
                <p className="text-xs text-gray-500 mt-0.5">{dica.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          Passo a Passo
        </h2>

        {steps.map((step, index) => {
          const isExpanded = expandedStep === step.id
          const isCompleted = step.completed
          const isNext = !isCompleted && steps.slice(0, index).every((s) => s.completed)

          return (
            <div
              key={step.id}
              className={`rounded-xl border bg-white shadow-sm overflow-hidden transition-all ${
                isCompleted
                  ? "border-emerald-200 bg-emerald-50/30"
                  : isNext
                  ? "border-blue-200 ring-2 ring-blue-100"
                  : "border-gray-200"
              }`}
            >
              {/* Step Header */}
              <div
                className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => toggleStep(step.id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleComplete(step.id)
                  }}
                  className="shrink-0"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                  ) : (
                    <Circle className={`h-7 w-7 ${isNext ? "text-blue-400" : "text-gray-300"}`} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={isCompleted ? "success" : isNext ? "default" : "secondary"}
                    >
                      Passo {step.id}
                    </Badge>
                    {isNext && !isCompleted && (
                      <Badge variant="default" className="animate-pulse">
                        Proximo
                      </Badge>
                    )}
                  </div>
                  <h3 className={`mt-1 text-base font-semibold ${
                    isCompleted ? "text-emerald-700 line-through" : "text-gray-900"
                  }`}>
                    {step.titulo}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">{step.descricao}</p>
                </div>

                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                )}
              </div>

              {/* Step Content */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                  <div className="pl-11 space-y-4">
                    {/* Detalhes */}
                    <div className="space-y-2">
                      {step.detalhes.map((detalhe, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{detalhe}</span>
                        </div>
                      ))}
                    </div>

                    {/* Dica Pro */}
                    {step.dica_pro && (
                      <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 border border-blue-100">
                        <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-700">Dica Pro</p>
                          <p className="text-sm text-blue-600 mt-0.5">{step.dica_pro}</p>
                        </div>
                      </div>
                    )}

                    {/* Mark Complete Button */}
                    <Button
                      variant={isCompleted ? "outline" : "success"}
                      size="sm"
                      onClick={() => toggleComplete(step.id)}
                      className="gap-2"
                    >
                      {isCompleted ? (
                        <>
                          <Circle className="h-4 w-4" />
                          Desmarcar como feito
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Marcar como feito
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
