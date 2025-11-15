# 🚀 Guia Rápido para Novos Contribuidores

Bem-vindo ao VTEX Schema Builder! Este guia vai te ajudar a fazer sua primeira contribuição em menos de 10 minutos.

## ⚡ Início Rápido

### 1️⃣ Setup do Projeto (5 min)

```bash
# Clone o repositório
git clone https://github.com/Fabricio-P-Viana/builder-schema-vtex.git
cd builder-schema-vtex

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

✅ Abra http://localhost:3000 - se aparecer, está funcionando!

### 2️⃣ Estrutura do Projeto (2 min)

```
📦 builder-schema-vtex
├── 📁 app/              ← Páginas Next.js
├── 📁 components/       ← Componentes React
│   ├── Form/           ← Componentes de formulário
│   └── ui/             ← Componentes UI base
├── 📁 utils/            ← Funções auxiliares
├── 📁 types/            ← Tipos TypeScript
└── 📁 docs/             ← Documentação
```

### 3️⃣ Comandos Úteis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm test             # Executar testes
npm run lint         # Verificar código
```

## 🎯 Tipos de Contribuição

### 🐛 Corrigir um Bug (Fácil)

1. Encontre uma [issue com label `good first issue`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
2. Comente "Eu gostaria de trabalhar nisso"
3. Aguarde aprovação
4. Crie um branch: `git checkout -b fix/nome-do-bug`
5. Faça as correções
6. Commit: `git commit -m "fix: corrige bug X"`
7. Push: `git push origin fix/nome-do-bug`
8. Abra um Pull Request

### ✨ Adicionar Feature (Médio)

1. Verifique o [ROADMAP.md](../ROADMAP.md) para features planejadas
2. Abra uma issue discutindo a feature
3. Aguarde aprovação dos mantenedores
4. Crie branch: `git checkout -b feature/nome-da-feature`
5. Implemente a feature
6. Adicione testes
7. Commit: `git commit -m "feat: adiciona feature X"`
8. Push e abra PR

### 📚 Melhorar Documentação (Super Fácil!)

1. Encontre um typo ou seção que pode melhorar
2. Edite o arquivo diretamente no GitHub (clique no ícone de lápis)
3. Faça commit: `docs: corrige typo em README`
4. Crie PR automaticamente

### 🎨 Melhorar UI/UX (Médio)

1. Identifique melhorias de design
2. Crie mockups/screenshots
3. Abra uma issue com sua proposta
4. Aguarde feedback
5. Implemente as mudanças
6. Abra PR com antes/depois

## 📋 Checklist Antes do PR

```markdown
- [ ] Código funciona localmente
- [ ] Testes passam: `npm test`
- [ ] Lint sem erros: `npm run lint`
- [ ] Commit messages seguem padrão
- [ ] Documentação atualizada (se necessário)
- [ ] PR descreve claramente as mudanças
```

## 💡 Dicas de Contribuição

### ✅ Boas Práticas

- **Comece pequeno** - PRs menores são mais fáceis de revisar
- **Um problema por vez** - Não misture bugs e features no mesmo PR
- **Comunique-se** - Pergunte se tiver dúvidas
- **Seja paciente** - Reviews podem levar alguns dias
- **Aceite feedback** - Sugestões são para melhorar o código

### ❌ Evite

- PRs gigantes com muitas mudanças
- Mudanças sem testes
- Ignorar feedback dos revisores
- Código não formatado
- Commits genéricos ("fix", "update", etc)

## 🎓 Aprendendo o Código

### Fluxo de Criação de Schema

```typescript
// 1. Usuário cria propriedade (PropertyField.tsx)
const property = { name: 'title', type: 'string' }

// 2. Propriedade é adicionada à lista (PropertyList.tsx)
const properties = [...currentProperties, property]

// 3. Schema é gerado (schemaGenerator.ts)
const schema = generateSchema(properties)

// 4. JSON é exibido (JsonPreview.tsx)
<pre>{JSON.stringify(schema, null, 2)}</pre>
```

### Componentes Principais

**PropertyField** - Input para criar/editar propriedades
```typescript
// components/Form/PropertyField.tsx
export function PropertyField({ property, onChange }) {
  // Inputs para name, type, description, etc
}
```

**JsonPreview** - Mostra o JSON gerado
```typescript
// components/Form/JsonPreview.tsx
export function JsonPreview({ schema }) {
  // Exibe JSON formatado com highlight
}
```

**schemaGenerator** - Lógica de geração
```typescript
// utils/schemaGenerator.ts
export function generateSchema(properties) {
  // Converte properties para JSON Schema
}
```

## 🐛 Debugging

### Problema: Erro ao instalar dependências

```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Problema: Porta 3000 em uso

```bash
# Use outra porta
PORT=3001 npm run dev
```

### Problema: Testes falhando

```bash
# Limpe cache do Jest
npm test -- --clearCache
npm test
```

## 🤝 Conseguindo Ajuda

### Antes de Pedir Ajuda

1. Leia a documentação relevante
2. Procure issues similares
3. Tente debugar você mesmo
4. Prepare informações sobre o problema

### Onde Pedir Ajuda

- 💬 [Discussions](../../discussions) - Para dúvidas gerais
- 🐛 [Issues](../../issues) - Para bugs específicos
- 📧 Email - Para questões sensíveis

### Como Pedir Ajuda

```markdown
**O que você está tentando fazer?**
Descrição clara do objetivo

**O que você tentou?**
Passos que você seguiu

**O que aconteceu?**
Erro ou comportamento inesperado

**Ambiente:**
- OS: Windows 11
- Node: 20.10.0
- Browser: Chrome 120
```

## 🏆 Primeiras Contribuições

Ótimas issues para começar:

- `good first issue` - Issues simples para iniciantes
- `help wanted` - Issues que precisam de ajuda
- `documentation` - Melhorias na documentação
- `bug` - Bugs para corrigir

## 📚 Recursos para Aprender

### React/Next.js
- [React Docs](https://react.dev/)
- [Next.js Learn](https://nextjs.org/learn)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/)

### Git/GitHub
- [GitHub Skills](https://skills.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

## 🎉 Sua Primeira Contribuição

Parabéns por querer contribuir! Aqui está um desafio simples:

1. Encontre um typo em qualquer arquivo `.md`
2. Corrija-o
3. Faça commit: `docs: corrige typo em [arquivo]`
4. Abra seu primeiro PR!

**É assim que grandes contribuidores começam!** 🚀

## 💪 Níveis de Contribuição

### 🌱 Iniciante
- Corrigir typos
- Melhorar documentação
- Adicionar exemplos
- Reportar bugs

### 🌿 Intermediário
- Corrigir bugs simples
- Adicionar testes
- Melhorar UI/UX
- Refatorar código

### 🌳 Avançado
- Implementar features complexas
- Otimizar performance
- Revisar PRs
- Mentorear iniciantes

## 🙏 Obrigado!

Toda contribuição, não importa o tamanho, é valiosa! 

**Você está ajudando a construir uma ferramenta incrível para a comunidade VTEX!** 🎉

---

**Perguntas?** Abra uma [Discussion](../../discussions) ou [Issue](../../issues)

**Pronto para começar?** Veja as [good first issues](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)!
