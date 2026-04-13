import { NicheTemplate } from "@/types"

export const nichosTemplates: NicheTemplate[] = [
  {
    id: "clinica-estetica",
    nome: "Clinicas Esteticas",
    descricao: "Clinicas de estetica, harmonizacao facial, botox, preenchimento e procedimentos esteticos em geral.",
    icon: "Sparkles",
    publico_alvo: [
      "Mulheres 25-55 anos",
      "Classe B e C",
      "Interesse em beleza e autoestima",
      "Moradoras da regiao (raio 10km)",
    ],
    interesses_meta: [
      "Beleza", "Cuidados com a pele", "Estetica",
      "Harmonizacao facial", "Botox", "Skincare",
      "Anti-envelhecimento", "Clinica de estetica",
    ],
    faixa_etaria: { min: 25, max: 55 },
    genero: "feminino",
    copy_templates: [
      {
        tipo: "headline",
        texto: "Harmonizacao Facial com resultado natural a partir de R$XX",
        variante: "oferta-direta",
      },
      {
        tipo: "headline",
        texto: "Antes e Depois REAL - Veja a transformacao das nossas pacientes",
        variante: "prova-social",
      },
      {
        tipo: "descricao",
        texto: "Agende sua avaliacao GRATUITA e descubra o procedimento ideal para voce. Resultados visiveis desde a primeira sessao. Profissionais especializados com mais de X anos de experiencia.",
        variante: "padrao",
      },
      {
        tipo: "cta",
        texto: "Quero minha avaliacao gratuita",
        variante: "padrao",
      },
      {
        tipo: "cta",
        texto: "Agendar pelo WhatsApp",
        variante: "whatsapp",
      },
    ],
    criativos_dicas: [
      "Use ANTES e DEPOIS reais (com autorizacao do paciente)",
      "Videos curtos de 15s mostrando o procedimento",
      "Depoimentos em video de pacientes satisfeitas",
      "Fotos da clinica mostrando ambiente profissional",
      "Evite promessas exageradas - seja realista nos resultados",
      "Use cores suaves: rosa, dourado, branco",
    ],
    cpl_medio: 12,
    ticket_medio: 800,
  },
  {
    id: "dentista-implante",
    nome: "Dentistas e Implantes",
    descricao: "Consultorios odontologicos focados em implantes, proteses, lentes de contato dental e tratamentos esteticos.",
    icon: "Smile",
    publico_alvo: [
      "Adultos 30-65 anos",
      "Pessoas com problemas dentarios",
      "Interesse em saude bucal",
      "Classe B e C",
    ],
    interesses_meta: [
      "Implante dentario", "Odontologia", "Saude bucal",
      "Protese dentaria", "Lentes de contato dental",
      "Clareamento dental", "Dentista",
    ],
    faixa_etaria: { min: 30, max: 65 },
    genero: "todos",
    copy_templates: [
      {
        tipo: "headline",
        texto: "Implante Dentario completo com condicoes especiais este mes",
        variante: "oferta-direta",
      },
      {
        tipo: "headline",
        texto: "Volte a sorrir com confianca - Implantes a partir de 12x de R$XX",
        variante: "emocional",
      },
      {
        tipo: "descricao",
        texto: "Avaliacao e radiografia panoramica GRATIS. Implantes com tecnologia de ponta, equipe especializada e parcelamento facilitado. Agende hoje mesmo!",
        variante: "padrao",
      },
      {
        tipo: "cta",
        texto: "Agendar avaliacao gratuita",
        variante: "padrao",
      },
    ],
    criativos_dicas: [
      "Antes e depois de sorrisos (com autorizacao)",
      "Mostrar tecnologia e equipamentos modernos",
      "Depoimentos de pacientes em video",
      "Informar sobre formas de pagamento e parcelamento",
      "Transmitir confianca e profissionalismo",
      "Cores: azul, branco, verde suave",
    ],
    cpl_medio: 18,
    ticket_medio: 3500,
  },
  {
    id: "imobiliaria",
    nome: "Imobiliarias",
    descricao: "Imobiliarias, corretores e incorporadoras focadas em venda e aluguel de imoveis.",
    icon: "Home",
    publico_alvo: [
      "Adultos 25-55 anos",
      "Casais e familias",
      "Interesse em investimento e moradia",
      "Renda media-alta",
    ],
    interesses_meta: [
      "Imoveis", "Casa propria", "Apartamento",
      "Investimento imobiliario", "Financiamento",
      "Minha Casa Minha Vida", "Condominio fechado",
    ],
    faixa_etaria: { min: 25, max: 55 },
    genero: "todos",
    copy_templates: [
      {
        tipo: "headline",
        texto: "Apartamentos a partir de R$XX mil em [CIDADE] - Entrada facilitada",
        variante: "oferta-direta",
      },
      {
        tipo: "headline",
        texto: "Realize o sonho da casa propria! Condominios prontos para morar",
        variante: "emocional",
      },
      {
        tipo: "descricao",
        texto: "Visite nosso plantao e conheca as melhores opcoes de imoveis na regiao. Financiamento aprovado na hora, entrada facilitada e documentacao inclusa.",
        variante: "padrao",
      },
      {
        tipo: "cta",
        texto: "Quero conhecer os imoveis",
        variante: "padrao",
      },
    ],
    criativos_dicas: [
      "Fotos profissionais do imovel (drone se possivel)",
      "Tour virtual em video",
      "Destacar localizacao e infraestrutura",
      "Mostrar facilidades de pagamento",
      "Usar escassez: 'ultimas unidades'",
      "Cores: azul escuro, dourado, branco",
    ],
    cpl_medio: 25,
    ticket_medio: 250000,
  },
  {
    id: "academia",
    nome: "Academias e CrossFit",
    descricao: "Academias, studios de pilates, crossfit boxes e centros de treinamento funcional.",
    icon: "Dumbbell",
    publico_alvo: [
      "Jovens e adultos 18-45 anos",
      "Interesse em fitness e saude",
      "Moradores proximos (raio 5km)",
      "Classe B e C",
    ],
    interesses_meta: [
      "Academia", "Musculacao", "Fitness",
      "CrossFit", "Treino funcional", "Emagrecimento",
      "Vida saudavel", "Personal trainer",
    ],
    faixa_etaria: { min: 18, max: 45 },
    genero: "todos",
    copy_templates: [
      {
        tipo: "headline",
        texto: "Primeira semana GRATIS + Avaliacao fisica completa",
        variante: "oferta-direta",
      },
      {
        tipo: "headline",
        texto: "Transforme seu corpo em 90 dias - Plano especial de lancamento",
        variante: "urgencia",
      },
      {
        tipo: "descricao",
        texto: "Venha treinar na melhor academia da regiao! Equipamentos de ultima geracao, professores qualificados e ambiente motivador. Matricula ZERO esta semana.",
        variante: "padrao",
      },
      {
        tipo: "cta",
        texto: "Garantir minha vaga",
        variante: "padrao",
      },
    ],
    criativos_dicas: [
      "Videos de treinos com energia alta",
      "Transformacoes reais de alunos",
      "Mostrar ambiente e equipamentos",
      "Fotos do time de profissionais",
      "Usar urgencia e escassez nas vagas",
      "Cores: preto, vermelho, laranja",
    ],
    cpl_medio: 8,
    ticket_medio: 150,
  },
  {
    id: "energia-solar",
    nome: "Energia Solar",
    descricao: "Empresas de energia solar fotovoltaica, instalacao de paineis e sistemas de energia limpa.",
    icon: "Sun",
    publico_alvo: [
      "Proprietarios de imoveis",
      "Adultos 30-60 anos",
      "Conta de luz alta (acima de R$300)",
      "Classe A e B",
    ],
    interesses_meta: [
      "Energia solar", "Sustentabilidade", "Economia",
      "Energia renovavel", "Painel solar",
      "Conta de luz", "Investimento",
    ],
    faixa_etaria: { min: 30, max: 60 },
    genero: "todos",
    copy_templates: [
      {
        tipo: "headline",
        texto: "Reduza ate 95% da sua conta de luz com energia solar",
        variante: "beneficio",
      },
      {
        tipo: "headline",
        texto: "Simulacao GRATUITA - Descubra quanto voce pode economizar",
        variante: "oferta-direta",
      },
      {
        tipo: "descricao",
        texto: "Faca uma simulacao gratuita e descubra em quanto tempo o sistema solar se paga. Financiamento em ate 60x e economia desde o primeiro mes de instalacao.",
        variante: "padrao",
      },
      {
        tipo: "cta",
        texto: "Fazer simulacao gratuita",
        variante: "padrao",
      },
    ],
    criativos_dicas: [
      "Mostrar economia real em reais",
      "Comparativo conta antes vs depois",
      "Fotos de instalacoes concluidas",
      "Depoimentos com numeros reais",
      "Informar sobre financiamento",
      "Cores: amarelo, verde, azul",
    ],
    cpl_medio: 22,
    ticket_medio: 25000,
  },
  {
    id: "advogado-previdenciario",
    nome: "Advogados Previdenciarios",
    descricao: "Escritorios de advocacia focados em direito previdenciario, aposentadoria, BPC/LOAS e revisoes.",
    icon: "Scale",
    publico_alvo: [
      "Adultos 40-70 anos",
      "Trabalhadores proximos da aposentadoria",
      "Pessoas com beneficio negado",
      "Classe C e D",
    ],
    interesses_meta: [
      "Aposentadoria", "INSS", "Previdencia social",
      "Direito trabalhista", "BPC LOAS",
      "Revisao de aposentadoria", "Advogado",
    ],
    faixa_etaria: { min: 40, max: 70 },
    genero: "todos",
    copy_templates: [
      {
        tipo: "headline",
        texto: "Teve aposentadoria negada? Voce pode ter direito a receber!",
        variante: "problema",
      },
      {
        tipo: "headline",
        texto: "Analise GRATUITA do seu caso - Descubra se voce tem direito",
        variante: "oferta-direta",
      },
      {
        tipo: "descricao",
        texto: "Consulta gratuita com advogado especialista em INSS. Mais de X casos resolvidos com sucesso. Voce so paga se ganhar. Atendimento presencial e online.",
        variante: "padrao",
      },
      {
        tipo: "cta",
        texto: "Quero analise gratuita do meu caso",
        variante: "padrao",
      },
    ],
    criativos_dicas: [
      "Linguagem simples e acessivel",
      "Numeros de casos ganhos",
      "Evite jargao juridico complexo",
      "Transmitir confianca e seriedade",
      "Videos explicativos sobre direitos",
      "Cores: azul marinho, dourado, branco",
    ],
    cpl_medio: 15,
    ticket_medio: 5000,
  },
]

export function getNicheById(id: string): NicheTemplate | undefined {
  return nichosTemplates.find((n) => n.id === id)
}

export function getNicheNames(): { value: string; label: string }[] {
  return nichosTemplates.map((n) => ({ value: n.id, label: n.nome }))
}
