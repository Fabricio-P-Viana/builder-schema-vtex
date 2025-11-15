# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### 🎯 Planejado
- TypeScript para Schema - Converter interfaces/types TypeScript em schemas JSON automaticamente
- Import de Schema - Importar schemas existentes para edição
- Templates Pré-definidos - Biblioteca de schemas comuns do VTEX
- Validação de Schema - Validar schemas contra especificação JSON Schema
- Export Multi-formato - Exportar para diferentes formatos (JSON, YAML, TypeScript)
- Histórico de Versões - Controle de versões dos schemas criados
- Colaboração em Tempo Real - Editar schemas colaborativamente

## [0.1.0] - 2025-11-15

### ✨ Adicionado
- Interface visual para criação de schemas JSON do VTEX IO
- Sistema de tema claro/escuro com next-themes
- Design responsivo para mobile, tablet e desktop
- Preview em tempo real do JSON gerado
- Funcionalidade de copiar schema com um clique
- Validação de campos com Zod
- Suporte para campos condicionais (enum dependencies)
- Configuração de arrays com objetos complexos
- Componentes UI customizados:
  - Button com variantes (primary, secondary, success, warning, danger, destructive)
  - Input com suporte a temas
  - Select com suporte a temas
  - Textarea com suporte a temas
  - Label estilizado
  - Badge com múltiplas variantes
- Navbar responsiva com theme switcher
- Footer com links para redes sociais
- Testes unitários com Jest e Testing Library
- Documentação completa do projeto
- Guia de contribuição
- Código de conduta
- Licença MIT

### 🛠️ Técnico
- Next.js 16 com App Router
- React 19 com hooks modernos
- TypeScript 5 com tipagem completa
- Tailwind CSS 4 para estilização
- React Hook Form para gerenciamento de formulários
- Zod para validação de schemas
- Lucide React para ícones
- Sistema de variáveis CSS para temas
- Estrutura de projeto modular e escalável

### 📚 Documentação
- README.md completo com badges, features e instruções
- CONTRIBUTING.md com guia detalhado de contribuição
- CODE_OF_CONDUCT.md baseado no Contributor Covenant
- LICENSE (MIT)
- CHANGELOG.md para rastreamento de versões

### 🎨 Design
- Paleta de cores consistente entre temas
- Animações suaves de transição
- Scrollbar customizada
- Componentes com estados visuais (hover, focus, disabled)
- Layout em 3 colunas (sidebar, editor, preview)
- Breakpoints responsivos bem definidos

### 🧪 Testes
- Configuração Jest com TypeScript
- Testes para schemaGenerator
- Testes para typeGenerator
- Setup para Testing Library
- Scripts para test watch e coverage

---

## Tipos de Mudanças

- `Added` para novas funcionalidades
- `Changed` para mudanças em funcionalidades existentes
- `Deprecated` para funcionalidades que serão removidas
- `Removed` para funcionalidades removidas
- `Fixed` para correções de bugs
- `Security` para correções de vulnerabilidades
