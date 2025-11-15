# 🎯 Feature Spec: TypeScript to Schema Converter

## 📋 Overview

Implementar funcionalidade que permite aos usuários converter interfaces e types TypeScript em JSON Schemas VTEX automaticamente, eliminando trabalho manual repetitivo e reduzindo erros.

---

## 🎯 Objetivos

### Objetivo Principal
Permitir que desenvolvedores convertam definições TypeScript existentes em schemas JSON válidos para VTEX IO com apenas alguns cliques.

### Objetivos Secundários
- Reduzir tempo de criação de schemas em 70%
- Eliminar erros de sintaxe manual
- Facilitar migração de projetos TypeScript para VTEX
- Manter sincronização entre código TS e schemas

---

## 👥 Personas

### Persona 1: Desenvolvedor VTEX Experiente
- Já trabalha com TypeScript
- Tem interfaces definidas em seus projetos
- Quer gerar schemas rapidamente
- Valoriza precisão e controle

### Persona 2: Desenvolvedor Novo no VTEX
- Conhece TypeScript mas não JSON Schema
- Aprende melhor vendo exemplos
- Precisa de validação e feedback
- Valoriza simplicidade

### Persona 3: Arquiteto de Soluções
- Gerencia múltiplos projetos
- Precisa padronizar schemas
- Quer reutilizar definições
- Valoriza consistência

---

## 📐 User Stories

### História 1: Conversão Básica
**Como** desenvolvedor VTEX  
**Eu quero** colar minha interface TypeScript  
**Para que** ela seja convertida automaticamente em JSON Schema

**Critérios de Aceitação:**
- [ ] Input aceita código TypeScript válido
- [ ] Output gera JSON Schema válido
- [ ] Suporta tipos primitivos (string, number, boolean)
- [ ] Suporta tipos opcionais (?)
- [ ] Preserva nomes de propriedades

### História 2: Tipos Complexos
**Como** desenvolvedor experiente  
**Eu quero** converter tipos complexos TypeScript  
**Para que** schemas aninhados sejam criados automaticamente

**Critérios de Aceitação:**
- [ ] Suporta objetos aninhados
- [ ] Suporta arrays
- [ ] Suporta union types (string | number)
- [ ] Suporta enums
- [ ] Suporta tipos literais ('admin' | 'user')

### História 3: Documentação
**Como** desenvolvedor organizado  
**Eu quero** que JSDoc comments sejam convertidos  
**Para que** descriptions apareçam no schema

**Critérios de Aceitação:**
- [ ] JSDoc @description vira "description"
- [ ] JSDoc @default vira "default"
- [ ] JSDoc @example vira "examples"
- [ ] Comentários de linha são preservados

### História 4: Validação
**Como** desenvolvedor cuidadoso  
**Eu quero** validação em tempo real do TypeScript  
**Para que** erros sejam detectados antes da conversão

**Critérios de Aceitação:**
- [ ] Valida sintaxe TypeScript
- [ ] Mostra erros de parsing
- [ ] Destaca linha com erro
- [ ] Sugere correções

---

## 🎨 Design da Interface

### Página: TypeScript to Schema

```
┌─────────────────────────────────────────────────────────┐
│  [← Voltar]  TypeScript to Schema  [Tema] [Ajuda]      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────┬──────────────────────────┐   │
│  │ TypeScript Input      │ JSON Schema Output       │   │
│  │ ┌──────────────────┐ │ ┌──────────────────────┐ │   │
│  │ │ interface Product│ │ │ {                    │ │   │
│  │ │   name: string;  │ │ │   "type": "object",  │ │   │
│  │ │   price: number; │ │ │   "properties": {    │ │   │
│  │ │ }                │ │ │     "name": {        │ │   │
│  │ │                  │ │ │       "type": "..."  │ │   │
│  │ │                  │ │ │     }                │ │   │
│  │ │                  │ │ │   }                  │ │   │
│  │ └──────────────────┘ │ └──────────────────────┘ │   │
│  │                      │                          │   │
│  │ [Upload .ts] [Clear] │ [Copy] [Download] [Usar] │   │
│  └──────────────────────┴──────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 📝 Opções de Conversão                          │   │
│  │  ☑ Incluir required fields                      │   │
│  │  ☑ Adicionar descriptions do JSDoc              │   │
│  │  ☑ Gerar título automático                      │   │
│  │  ☐ Incluir examples                             │   │
│  │  Format: [Compacto ▼]                           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 💡 Exemplos Rápidos                             │   │
│  │  [Simple Object] [Array] [Enum] [Complex]      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Componentes Necessários

1. **CodeEditor** (Monaco Editor ou similar)
   - Syntax highlighting para TypeScript
   - Line numbers
   - Error highlighting
   - Auto-complete

2. **SchemaPreview**
   - Reutilizar JsonPreview existente
   - Adicionar opção de formatação

3. **OptionsPanel**
   - Checkboxes para opções
   - Select para formato
   - Tooltips explicativos

4. **ExamplesPanel**
   - Botões de exemplo
   - Preview ao hover
   - One-click load

---

## 🔧 Arquitetura Técnica

### Estrutura de Arquivos

```
utils/
├── typescript/
│   ├── parser.ts           # Parser de TypeScript
│   ├── converter.ts        # Conversor TS -> Schema
│   ├── validator.ts        # Validação de código TS
│   └── examples.ts         # Exemplos pré-definidos
├── tsToSchema.test.ts      # Testes
└── tsToSchema.ts           # Função principal

app/
└── typescript-to-schema/
    ├── page.tsx            # Página principal
    └── layout.tsx          # Layout específico

components/
└── TypeScript/
    ├── CodeEditor.tsx      # Editor de código
    ├── ConversionOptions.tsx
    └── ExampleSelector.tsx
```

### Fluxo de Dados

```
User Input (TS Code)
    ↓
Validation (Syntax Check)
    ↓
Parsing (AST Generation)
    ↓
Conversion (AST → Schema)
    ↓
Post-processing (Options)
    ↓
Output (JSON Schema)
```

### Dependências Técnicas

```json
{
  "dependencies": {
    "typescript": "^5.0.0",           // TS Compiler API
    "@monaco-editor/react": "^4.6.0", // Code Editor
    "prettier": "^3.0.0"              // Code formatting
  }
}
```

---

## 🛠️ Implementação

### Fase 1: Setup e Estrutura (Semana 1)
- [ ] Criar estrutura de arquivos
- [ ] Instalar dependências
- [ ] Configurar TypeScript Compiler API
- [ ] Setup Monaco Editor

### Fase 2: Parser Básico (Semana 2)
- [ ] Implementar parser para interfaces
- [ ] Suporte para tipos primitivos
- [ ] Suporte para tipos opcionais
- [ ] Testes unitários

### Fase 3: Tipos Complexos (Semana 3)
- [ ] Suporte para objetos aninhados
- [ ] Suporte para arrays
- [ ] Suporte para enums
- [ ] Suporte para union types
- [ ] Testes unitários

### Fase 4: Features Avançadas (Semana 4)
- [ ] JSDoc parsing
- [ ] Validação em tempo real
- [ ] Error handling
- [ ] Testes unitários

### Fase 5: Interface (Semana 5)
- [ ] Implementar página
- [ ] Integrar Monaco Editor
- [ ] Implementar options panel
- [ ] Adicionar exemplos

### Fase 6: Polimento (Semana 6)
- [ ] Melhorias de UX
- [ ] Otimização de performance
- [ ] Documentação
- [ ] Testes E2E

---

## 🧪 Casos de Teste

### Teste 1: Interface Simples
**Input:**
```typescript
interface Product {
  name: string;
  price: number;
  inStock: boolean;
}
```

**Expected Output:**
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "price": { "type": "number" },
    "inStock": { "type": "boolean" }
  },
  "required": ["name", "price", "inStock"]
}
```

### Teste 2: Tipos Opcionais
**Input:**
```typescript
interface User {
  id: string;
  name: string;
  email?: string;
}
```

**Expected Output:**
```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "email": { "type": "string" }
  },
  "required": ["id", "name"]
}
```

### Teste 3: Objetos Aninhados
**Input:**
```typescript
interface Product {
  name: string;
  dimensions: {
    width: number;
    height: number;
  };
}
```

**Expected Output:**
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "dimensions": {
      "type": "object",
      "properties": {
        "width": { "type": "number" },
        "height": { "type": "number" }
      },
      "required": ["width", "height"]
    }
  },
  "required": ["name", "dimensions"]
}
```

### Teste 4: Arrays
**Input:**
```typescript
interface Store {
  name: string;
  products: string[];
}
```

**Expected Output:**
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "products": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["name", "products"]
}
```

### Teste 5: Enums
**Input:**
```typescript
enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest"
}

interface User {
  role: UserRole;
}
```

**Expected Output:**
```json
{
  "type": "object",
  "properties": {
    "role": {
      "type": "string",
      "enum": ["admin", "user", "guest"]
    }
  },
  "required": ["role"]
}
```

### Teste 6: Union Types
**Input:**
```typescript
interface Config {
  port: number | string;
}
```

**Expected Output:**
```json
{
  "type": "object",
  "properties": {
    "port": {
      "oneOf": [
        { "type": "number" },
        { "type": "string" }
      ]
    }
  },
  "required": ["port"]
}
```

### Teste 7: JSDoc
**Input:**
```typescript
interface Product {
  /**
   * Nome do produto
   * @default "Produto sem nome"
   */
  name: string;
}
```

**Expected Output:**
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Nome do produto",
      "default": "Produto sem nome"
    }
  },
  "required": ["name"]
}
```

---

## 📊 Métricas de Sucesso

### Adoção
- [ ] 50+ usuários utilizando a feature no primeiro mês
- [ ] 500+ conversões realizadas
- [ ] Taxa de erro < 5%

### Qualidade
- [ ] 95% de schemas gerados são válidos
- [ ] Tempo médio de conversão < 1 segundo
- [ ] 90% de satisfação do usuário (survey)

### Performance
- [ ] Lighthouse score > 90
- [ ] Tempo de carregamento < 2s
- [ ] Bundle size < 200KB

---

## 🚧 Riscos e Mitigações

### Risco 1: Complexidade do TypeScript
**Mitigação:** Começar com casos simples, expandir gradualmente

### Risco 2: Performance com Arquivos Grandes
**Mitigação:** Limitar tamanho de input, usar web workers

### Risco 3: Casos Edge Não Cobertos
**Mitigação:** Feedback claro ao usuário, documentação extensa

### Risco 4: Bundle Size
**Mitigação:** Code splitting, lazy loading, tree shaking

---

## 📚 Documentação Necessária

- [ ] Guia de uso da feature
- [ ] API documentation
- [ ] Exemplos de conversão
- [ ] Limitações conhecidas
- [ ] FAQ
- [ ] Tutorial em vídeo

---

## 🔄 Iterações Futuras

### v2.0
- Suporte para type aliases
- Suporte para generics
- Import de múltiplos arquivos
- Batch conversion

### v3.0
- Conversão reversa (Schema → TS)
- Sincronização bidirecional
- VS Code extension
- CLI tool

---

## 💬 Feedback da Comunidade

<!-- Espaço para coletar feedback durante desenvolvimento -->

---

**Status:** 📋 Planejamento  
**Prioridade:** 🔥 Alta  
**Estimativa:** 6 semanas  
**Assignee:** TBD  
**Última Atualização:** 15 de Novembro de 2025
