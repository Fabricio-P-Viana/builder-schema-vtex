# 🏗️ VTEX Schema Builder

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Uma ferramenta visual poderosa para criar e gerenciar schemas JSON do VTEX IO**

[🚀 Demo](#) • [📖 Documentação](#features) • [🤝 Contribuir](CONTRIBUTING.md) • [🐛 Reportar Bug](../../issues)

</div>

---

## 📋 Sobre o Projeto

O **VTEX Schema Builder** é uma aplicação web interativa que facilita a criação de schemas JSON para aplicações VTEX IO. Com uma interface intuitiva e moderna, você pode criar, visualizar e exportar schemas complexos sem precisar escrever JSON manualmente.

### ✨ Features

- 🎨 **Interface Visual Intuitiva** - Crie schemas sem escrever código JSON
- 🌓 **Tema Claro/Escuro** - Suporte completo para dark mode com next-themes
- 📱 **Totalmente Responsivo** - Design adaptável para mobile, tablet e desktop
- 🔍 **Preview em Tempo Real** - Visualize o JSON gerado instantaneamente
- 📋 **Copiar com Um Clique** - Copie o schema pronto para usar
- ✅ **Validação Integrada** - Validação de campos com Zod
- 🎯 **Campos Condicionais** - Suporte para enum dependencies
- 📦 **Tipos de Array** - Configure arrays com objetos complexos
- 🔧 **TypeScript Support** - Tipagem completa em todo o projeto
- 🧪 **Testes Unitários** - Cobertura de testes com Jest

### 🚧 Próximas Features

- [ ] **TypeScript para Schema** - Converter interfaces/types TypeScript em schemas JSON automaticamente
- [ ] **Import de Schema** - Importar schemas existentes para edição
- [ ] **Templates Pré-definidos** - Biblioteca de schemas comuns do VTEX
- [ ] **Validação de Schema** - Validar schemas contra especificação JSON Schema
- [ ] **Export Multi-formato** - Exportar para diferentes formatos (JSON, YAML, TypeScript)
- [ ] **Histórico de Versões** - Controle de versões dos schemas criados
- [ ] **Colaboração em Tempo Real** - Editar schemas colaborativamente

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/Fabricio-P-Viana/builder-schema-vtex.git
cd builder-schema-vtex
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🛠️ Stack Tecnológica

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript 5](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Temas:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Formulários:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Testes:** [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)

## 📁 Estrutura do Projeto

```
builder-schema-vtex/
├── app/                      # App Router do Next.js
│   ├── layout.tsx           # Layout root com ThemeProvider
│   ├── page.tsx             # Página inicial
│   ├── create/              # Página do editor de schemas
│   └── globals.css          # Estilos globais e variáveis CSS
├── components/              # Componentes React
│   ├── Form/               # Componentes do formulário
│   │   ├── PropertyField.tsx
│   │   ├── PropertyList.tsx
│   │   ├── JsonPreview.tsx
│   │   ├── ArrayItemConfig.tsx
│   │   └── ConditionalFieldsConfig.tsx
│   ├── ui/                 # Componentes UI reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   └── Badge.tsx
│   ├── Navbar.tsx          # Barra de navegação
│   └── Footer.tsx          # Rodapé
├── types/                   # Definições de tipos TypeScript
│   ├── index.ts
│   └── schema.ts
├── utils/                   # Utilitários e helpers
│   ├── schemaGenerator.ts
│   ├── typeGenerator.ts
│   ├── validation.ts
│   └── cn.ts
└── tests/                   # Arquivos de teste
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir para o projeto.

### Passos Rápidos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature incrível'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `style:` formatação, ponto e vírgula faltando, etc
- `refactor:` refatoração de código
- `test:` adição ou correção de testes
- `chore:` atualização de tarefas de build, configurações, etc

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Fabricio P. Viana** - [GitHub](https://github.com/Fabricio-P-Viana)

## 🙏 Agradecimentos

- Comunidade VTEX IO
- Todos os contribuidores do projeto
- Next.js e Vercel team

## 📞 Suporte

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para:

- Abrir uma [Issue](../../issues)
- Iniciar uma [Discussion](../../discussions)
- Entrar em contato via [email](mailto:seu-email@exemplo.com)

---

<div align="center">

Feito com ❤️ para a comunidade VTEX

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
