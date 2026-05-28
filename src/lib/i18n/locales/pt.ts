import type { LocaleMessages } from "@/lib/i18n/types";

export const pt: LocaleMessages = {
  meta: {
    title: "Calculadora de IMC",
    description:
      "Calcule seu IMC, classificação OMS, faixa de peso saudável e calorias diárias para manutenção.",
  },
  common: {
    next: "Próximo",
    calculate: "Calcular",
    back: "Voltar para etapa anterior",
    newAssessment: "Nova avaliação",
    share: "Compartilhar",
    download: "Baixar resumo",
  },
  toast: {
    validationError: "Verifique os dados antes de calcular.",
    formError: "Não foi possível validar o formulário.",
    calculateError: "Preencha os campos corretamente para continuar.",
    unexpectedError: "Ocorreu um erro inesperado. Tente novamente.",
    shareSuccess: "Resultado compartilhado.",
    shareCopied: "Resumo copiado para a área de transferência.",
    shareFailed: "Não foi possível compartilhar o resultado.",
    downloadSuccess: "Resumo baixado com sucesso.",
  },
  wizard: {
    age: {
      title: "Quantos anos você tem?",
      subtitle: "Usamos sua idade para calcular seu IMC e suas calorias diárias.",
      ariaLabel: "Idade",
    },
    sex: {
      title: "Qual é o seu sexo biológico?",
      subtitle: "Necessário para a estimativa de metabolismo basal.",
      ariaLabel: "Sexo biológico",
    },
    height: {
      title: "Qual é a sua altura?",
      subtitle: "Arraste para ajustar ou use o controle abaixo.",
      ariaLabel: "Altura",
    },
    weight: {
      title: "Qual é o seu peso atual?",
      subtitle: "Arraste para ajustar ou use o controle abaixo.",
      ariaLabel: "Peso",
    },
    activity: {
      title: "Quão ativo você é no dia a dia?",
      subtitle: "Isso define quantas calorias você precisa por dia.",
      ariaLabel: "Nível de atividade",
    },
  },
  sex: {
    male: "Masculino",
    female: "Feminino",
  },
  activity: {
    sedentary: {
      label: "Sedentário",
      description: "Pouco ou nenhum exercício",
    },
    light: {
      label: "Levemente ativo",
      description: "Exercício leve, 1–3 dias por semana",
    },
    moderate: {
      label: "Moderadamente ativo",
      description: "Exercício moderado, 3–5 dias por semana",
    },
    active: {
      label: "Muito ativo",
      description: "Exercício intenso, 6–7 dias por semana",
    },
    very_active: {
      label: "Extremamente ativo",
      description: "Exercício muito intenso ou trabalho físico",
    },
  },
  categories: {
    underweight: "Magreza",
    normal: "Normal",
    overweight: "Sobrepeso",
    obese: "Obesidade",
  },
  categoryRanges: {
    underweight: "< 18,5",
    normal: "18,5 – 24,9",
    overweight: "25 – 29,9",
    obese: "≥ 30",
  },
  categoryActive: "Sua categoria",
  units: {
    years: "anos",
    cm: "cm",
    kg: "kg",
    lb: "lb",
    kcalPerDay: "kcal/dia",
  },
  sliders: {
    age: "Idade em anos",
    height: "Altura em centímetros",
    weightKg: "Peso em quilogramas",
    weightLb: "Peso em libras",
  },
  fieldsets: {
    sex: "Sexo biológico",
    activity: "Nível de atividade física",
  },
  results: {
    title: "Seu resultado",
    subtitle: "Resumo da sua avaliação corporal",
    classification: "Classificação",
    bmiLabel: "IMC",
    caloriesLabel: "Calorias",
    caloriesHint: "Estimativa para manter seu peso atual (TDEE).",
    weightRangeLabel: "Peso ideal",
    weightRangeHint: "Faixa de peso para IMC normal na sua altura.",
    insightTitle: "Orientação OMS",
    insightDisclaimer:
      "Informação educativa. Consulte um profissional de saúde para avaliação personalizada.",
    shareTitle: "Meu resultado de IMC",
    shareTextTitle: "Calculadora de IMC — Resumo",
  },
  insights: {
    underweight: ({ bmi, min, max }) =>
      `De acordo com a Organização Mundial da Saúde, seu IMC de ${bmi} é considerado abaixo do peso (magreza) para a sua altura. Para alcançar a faixa considerada normal, seu peso pode variar entre ${min} e ${max}.`,
    normal: ({ bmi, min, max }) =>
      `De acordo com a Organização Mundial da Saúde, seu IMC de ${bmi} é considerado normal para a sua altura. Para manter o valor de IMC normal, seu peso pode variar entre ${min} e ${max}.`,
    overweight: ({ bmi, min, max }) =>
      `De acordo com a Organização Mundial da Saúde, seu IMC de ${bmi} é considerado sobrepeso para a sua altura. Para retornar à faixa normal, seu peso pode variar entre ${min} e ${max}.`,
    obese: ({ bmi, min, max }) =>
      `De acordo com a Organização Mundial da Saúde, seu IMC de ${bmi} é considerado obesidade para a sua altura. Para alcançar a faixa normal, seu peso pode variar entre ${min} e ${max}.`,
  },
  export: {
    header: "Calculadora de IMC — Resumo",
    bmi: "IMC",
    category: "Classificação",
    calories: "Calorias diárias (manutenção)",
    weightRange: "Faixa de peso ideal",
    insight: "Orientação",
  },
};
