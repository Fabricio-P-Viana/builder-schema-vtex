# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o VTEX Schema Builder! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Convenções de Commit](#convenções-de-commit)
- [Pull Requests](#pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Features](#sugerindo-features)

## 📜 Código de Conduta

Este projeto segue um Código de Conduta. Ao participar, você concorda em manter um ambiente respeitoso e inclusivo para todos.

### Nossas Regras

- Use linguagem acolhedora e inclusiva
- Respeite pontos de vista e experiências diferentes
- Aceite críticas construtivas graciosamente
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros da comunidade

## 🎯 Como Posso Contribuir?

Existem várias maneiras de contribuir com o projeto:

### 1. Reportar Bugs 🐛

Encontrou um bug? Ajude-nos a melhorar:

1. Verifique se o bug já não foi reportado nas [Issues](../../issues)
2. Crie uma nova issue usando o template de bug
3. Inclua informações detalhadas (versão do navegador, passos para reproduzir, etc.)

### 2. Sugerir Features 💡

Tem uma ideia para melhorar o projeto?

1. Verifique se a feature já não foi sugerida nas [Issues](../../issues)
2. Crie uma nova issue usando o template de feature request
3. Descreva claramente a funcionalidade e seus benefícios

### 3. Melhorar Documentação 📚

- Corrija erros de digitação
- Melhore exemplos existentes
- Adicione tutoriais ou guias
- Traduza documentação

### 4. Contribuir com Código 💻

- Corrija bugs
- Implemente novas features
- Melhore performance
- Adicione testes

## ⚙️ Configuração do Ambiente

### Requisitos

- Node.js 18 ou superior
- npm, yarn, pnpm ou bun
- Git

### Passos de Instalação

1. **Fork o repositório**
   - Clique em "Fork" no canto superior direito da página do repositório

2. **Clone seu fork**
   ```bash
   git clone https://github.com/SEU-USUARIO/builder-schema-vtex.git
   cd builder-schema-vtex
   ```

3. **Adicione o repositório original como upstream**
   ```bash
   git remote add upstream https://github.com/Fabricio-P-Viana/builder-schema-vtex.git
   ```

4. **Instale as dependências**
   ```bash
   npm install
   ```

5. **Execute o projeto localmente**
   ```bash
   npm run dev
   ```

6. **Abra http://localhost:3000** no navegador

## 🔄 Processo de Desenvolvimento

### 1. Crie uma Branch

Sempre crie uma nova branch para suas mudanças:

```bash
# Para uma nova feature
git checkout -b feature/nome-da-feature

# Para correção de bug
git checkout -b fix/descricao-do-bug

# Para documentação
git checkout -b docs/descricao-da-mudanca
```

### 2. Faça suas Alterações

- Escreva código limpo e bem documentado
- Adicione comentários quando necessário
- Mantenha consistência com o estilo do projeto
- Adicione testes para novas funcionalidades

### 3. Execute os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### 4. Execute o Linter

```bash
npm run lint
```

### 5. Commit suas Mudanças

Use mensagens de commit descritivas seguindo o padrão [Conventional Commits](#convenções-de-commit):

```bash
git add .
git commit -m "feat: adiciona funcionalidade X"
```

### 6. Mantenha seu Fork Atualizado

```bash
git fetch upstream
git rebase upstream/master
```

### 7. Push para seu Fork

```bash
git push origin feature/nome-da-feature
```

## 🎨 Padrões de Código

### TypeScript

- Use tipos explícitos sempre que possível
- Evite usar `any` - prefira `unknown` se necessário
- Documente interfaces e tipos complexos

```typescript
// ✅ Bom
interface UserData {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<UserData> {
  // ...
}

// ❌ Evite
function getUser(id: any): any {
  // ...
}
```

### React

- Use componentes funcionais com hooks
- Prefira composição sobre herança
- Mantenha componentes pequenos e focados
- Use TypeScript para props

```typescript
// ✅ Bom
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={variant}>
      {label}
    </button>
  );
}
```

### CSS/Tailwind

- Use Tailwind CSS classes quando possível
- Mantenha classes organizadas
- Use variáveis CSS do tema para cores
- Evite magic numbers

```tsx
// ✅ Bom
<div className="flex flex-col gap-4 p-4 bg-background text-foreground">
  {/* conteúdo */}
</div>

// ❌ Evite
<div style={{ padding: '16px', backgroundColor: '#fff' }}>
  {/* conteúdo */}
</div>
```

### Estrutura de Arquivos

- Um componente por arquivo
- Nomeie arquivos com PascalCase para componentes
- Coloque componentes relacionados em pastas
- Mantenha utils separados dos componentes

```
components/
├── Form/
│   ├── PropertyField.tsx
│   ├── PropertyList.tsx
│   └── index.ts
└── ui/
    ├── Button.tsx
    ├── Input.tsx
    └── index.ts
```

## 📝 Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit consistentes.

### Formato

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Mudanças na documentação
- **style**: Formatação, ponto e vírgula faltando, etc (sem mudança de código)
- **refactor**: Refatoração de código
- **perf**: Melhorias de performance
- **test**: Adição ou correção de testes
- **chore**: Tarefas de manutenção, configurações, etc
- **ci**: Mudanças em CI/CD
- **build**: Mudanças no sistema de build

### Exemplos

```bash
feat: adiciona suporte para import de schemas existentes
fix: corrige validação de campos obrigatórios
docs: atualiza README com novos exemplos
style: formata código com prettier
refactor: reorganiza estrutura de pastas dos componentes
perf: otimiza geração de JSON preview
test: adiciona testes para schemaGenerator
chore: atualiza dependências do projeto
```

### Escopo (opcional)

```bash
feat(ui): adiciona componente de modal
fix(validation): corrige regex de validação de email
docs(readme): adiciona seção de troubleshooting
```

### Breaking Changes

Para mudanças que quebram compatibilidade:

```bash
feat!: remove suporte para schemas v1

BREAKING CHANGE: Schemas v1 não são mais suportados. 
Migre para v2 usando o conversor disponível em /tools/migrate
```

## 🔀 Pull Requests

### Antes de Submeter

- [ ] Código segue os padrões do projeto
- [ ] Testes estão passando (`npm test`)
- [ ] Linter não reporta erros (`npm run lint`)
- [ ] Commits seguem convenções
- [ ] Branch está atualizada com master
- [ ] Documentação foi atualizada (se necessário)
- [ ] Testes foram adicionados/atualizados (se necessário)

### Processo de Submissão

1. **Push sua branch** para seu fork
2. **Abra um Pull Request** no repositório original
3. **Preencha o template** de PR completamente
4. **Aguarde review** - pode levar alguns dias
5. **Responda feedback** e faça ajustes se necessário

### Template de Pull Request

Ao abrir um PR, inclua:

```markdown
## Descrição
Descrição clara das mudanças realizadas.

## Tipo de Mudança
- [ ] Bug fix (correção que resolve uma issue)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (correção ou feature que altera comportamento existente)
- [ ] Documentação

## Como Testar
Passos para testar as mudanças:
1. ...
2. ...

## Checklist
- [ ] Código segue padrões do projeto
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Commits seguem convenções
```

### Review

- Mantenha PRs pequenos e focados
- Um PR = Uma feature/fix
- Responda comentários educadamente
- Esteja aberto a sugestões
- Faça os ajustes solicitados

## 🐛 Reportando Bugs

### Antes de Reportar

1. Verifique se está usando a versão mais recente
2. Procure nas [Issues](../../issues) existentes
3. Tente reproduzir o bug consistentemente

### Template de Bug Report

```markdown
**Descrição do Bug**
Descrição clara e concisa do bug.

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [ex: Windows 11]
 - Browser: [ex: Chrome 120]
 - Versão do Node: [ex: 18.17.0]

**Contexto Adicional**
Qualquer outra informação relevante.
```

## 💡 Sugerindo Features

### Template de Feature Request

```markdown
**A feature resolve um problema? Descreva.**
Descrição clara do problema. Ex: Sempre fico frustrado quando [...]

**Descreva a solução que você gostaria**
Descrição clara da funcionalidade desejada.

**Descreva alternativas consideradas**
Outras soluções ou features que você considerou.

**Contexto Adicional**
Screenshots, mockups, ou exemplos de outras aplicações.
```

## 🎓 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [VTEX IO Documentation](https://developers.vtex.com/)

## 📞 Precisa de Ajuda?

- 💬 Inicie uma [Discussion](../../discussions)
- 📧 Entre em contato via email
- 🐛 Abra uma [Issue](../../issues) para problemas específicos

## 🙏 Agradecimento

Toda contribuição, não importa o tamanho, é muito apreciada! Obrigado por fazer parte deste projeto! 🎉

---

**Happy Coding!** 🚀
