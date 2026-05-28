# Calculadora de IMC

Aplicação web para calcular o **Índice de Massa Corporal (IMC)**, classificar o resultado segundo a **OMS**, estimar a **faixa de peso saudável** e as **calorias diárias** para manutenção. O fluxo é guiado por um wizard em etapas, com painel de resultados no estilo de apps de saúde e fitness.

Projeto desenvolvido no contexto do curso **EBAC** (exercício prático de front-end com React e Next.js).

## Funcionalidades

- **Wizard em 5 etapas:** idade, sexo biológico, altura, peso e nível de atividade física
- **Sliders interativos** com valor editável ao clicar (altura e peso incluem régua visual)
- **Toggle kg/lb** no peso (valores sempre persistidos em quilogramas)
- **Painel de resultados:** IMC, gráfico por categoria, faixa de peso ideal, TDEE/calorias, carrossel de categorias OMS e card de insight
- **Internacionalização (pt/en)** com troca de idioma em tempo real
- **Tema claro/escuro**
- **Persistência da sessão** no `sessionStorage` (retoma etapa e dados ao recarregar)
- **Compartilhar** (Web Share API) e **baixar resumo** em `.txt`
- **Animações** entre etapas e ao exibir resultados (`motion`)
- **Acessibilidade:** rótulos ARIA, foco em erros de validação, suporte a `prefers-reduced-motion`

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router), React 19 |
| Estilo | [Tailwind CSS 4](https://tailwindcss.com), tokens OKLCH, [shadcn/ui](https://ui.shadcn.com) (radix-nova) |
| Formulário | [react-hook-form](https://react-hook-form.com), [Zod](https://zod.dev) |
| Gráficos | [Recharts](https://recharts.org) |
| Qualidade | [Biome](https://biomejs.dev), [Bun](https://bun.sh) (runtime e testes) |

## Como rodar

Requisitos: [Bun](https://bun.sh) instalado (recomendado) ou Node.js 20+.

```bash
# instalar dependências
bun install

# desenvolvimento
bun dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando | Descrição |
|---------|-----------|
| `bun dev` | Servidor de desenvolvimento |
| `bun run build` | Build de produção |
| `bun start` | Servidor após o build |
| `bun test` | Testes unitários (domínio IMC) |
| `bun run check` | Biome + testes |

## Estrutura do projeto

```
src/
├── app/                 # layout, página inicial, globals.css
├── components/
│   ├── imc/             # wizard, steps, widgets de resultado
│   └── ui/              # componentes shadcn
├── contexts/            # LocaleProvider (i18n)
├── hooks/               # wizard, sessão, foco em erros
└── lib/
    ├── imc/             # cálculos, schema Zod, exportação
    ├── i18n/            # mensagens pt/en
    └── motion/          # presets de animação
```

## Cálculos

- **IMC:** peso (kg) ÷ altura (m)²
- **Categorias OMS:** abaixo de 18,5 · normal (18,5–24,9) · sobrepeso (25–29,9) · obesidade (≥ 30)
- **Peso saudável:** limites 18,5 e 24,9 aplicados à altura informada
- **Metabolismo basal (BMR):** equação de **Mifflin–St Jeor**
- **Calorias diárias (TDEE):** BMR × multiplicador do nível de atividade

A lógica de domínio fica em `src/lib/imc/` e é coberta por testes em `calculate.test.ts`.

## Configuração do editor

O projeto inclui `.vscode/settings.json` e `tailwind.css-data.json` para o editor reconhecer diretivas Tailwind v4 (`@theme`, `@apply`, etc.). O `biome.json` usa `css.parser.tailwindDirectives: true` para lint e formatação de CSS.

## Licença

Projeto educacional — uso livre para estudo e portfólio.
