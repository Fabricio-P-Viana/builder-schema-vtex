# Security Policy

## 🔒 Supported Versions

Atualmente, as seguintes versões do VTEX Schema Builder recebem atualizações de segurança:

| Versão | Suportada          |
| ------ | ------------------ |
| 0.1.x  | :white_check_mark: |
| < 0.1  | :x:                |

## 🐛 Reportando uma Vulnerabilidade

A segurança do VTEX Schema Builder é levada muito a sério. Se você descobriu uma vulnerabilidade de segurança, pedimos que nos ajude reportando-a de forma responsável.

### Como Reportar

**NÃO** crie uma issue pública para vulnerabilidades de segurança.

Em vez disso, por favor:

1. **Envie um email para:** [security@example.com] (substituir pelo email real)
2. **Ou use:** GitHub Security Advisories em https://github.com/Fabricio-P-Viana/builder-schema-vtex/security/advisories/new

### Informações para Incluir

Para nos ajudar a entender e resolver o problema rapidamente, inclua:

- Tipo de vulnerabilidade
- Localização do código afetado (arquivo, linha)
- Passos detalhados para reproduzir
- Impacto potencial
- Sugestões de correção (se houver)
- Seu nome/handle para crédito (opcional)

### O Que Esperar

1. **Confirmação Inicial:** Dentro de 48 horas
2. **Avaliação:** Dentro de 1 semana
3. **Correção:** Dependendo da severidade
   - Crítica: 1-2 semanas
   - Alta: 2-4 semanas
   - Média: 4-8 semanas
   - Baixa: Próxima release

### Processo de Divulgação

1. Você reporta a vulnerabilidade privadamente
2. Confirmamos e avaliamos o impacto
3. Desenvolvemos e testamos a correção
4. Lançamos a versão corrigida
5. Publicamos o advisory de segurança
6. Creditamos o descobridor (se desejado)

## 🛡️ Políticas de Segurança

### Autenticação e Autorização

Este projeto atualmente não possui autenticação, pois é uma ferramenta client-side. Dados não são enviados para servidores.

### Dados do Usuário

- Nenhum dado pessoal é coletado
- Schemas criados ficam apenas no browser
- LocalStorage usado apenas para preferências de tema
- Nenhum tracking ou analytics por padrão

### Dependências

- Monitoramento contínuo com Dependabot
- Atualizações de segurança aplicadas rapidamente
- Audit automático em CI/CD
- Revisão manual de dependências críticas

### Code Review

- Todo código passa por review antes do merge
- PRs externos são revisados cuidadosamente
- Testes de segurança em CI/CD
- Scanning automático de vulnerabilidades

## 🔍 Escopo de Segurança

### Em Escopo

- Vulnerabilidades XSS
- Injeção de código
- Exposição de dados sensíveis
- Vulnerabilidades de dependências
- Problemas de CORS
- CSP bypasses

### Fora de Escopo

- Ataques de engenharia social
- Vulnerabilidades em browsers
- Issues de UI/UX que não afetam segurança
- Rate limiting (não aplicável)
- DDoS (aplicação client-side)

## 🏆 Hall da Fama de Segurança

Agradecemos aos seguintes pesquisadores por reportar vulnerabilidades:

<!-- Lista será atualizada conforme reports -->

*Nenhum report ainda - seja o primeiro!*

## 📋 Checklist de Segurança para Contribuidores

Ao contribuir, certifique-se de:

- [ ] Não expor secrets ou tokens
- [ ] Validar todos os inputs do usuário
- [ ] Escapar outputs em HTML
- [ ] Usar dependências confiáveis
- [ ] Evitar eval() e similares
- [ ] Implementar CSP apropriado
- [ ] Não armazenar dados sensíveis

## 🔐 Melhores Práticas

### Para Usuários

- Mantenha seu browser atualizado
- Não cole código de fontes não confiáveis
- Revise schemas antes de usar em produção
- Use HTTPS sempre que possível

### Para Desenvolvedores

- Sempre execute `npm audit`
- Revise dependências novas
- Use ESLint com regras de segurança
- Implemente testes de segurança
- Mantenha-se atualizado com CVEs

## 📞 Contato

Para questões de segurança:

- 🔒 Email: [security@example.com]
- 🔐 PGP Key: [link para chave pública]
- 🛡️ Security Advisories: [link do GitHub]

Para outras questões, use os canais normais de suporte.

## 📜 Política de Divulgação Responsável

Concordamos em:

- Responder prontamente aos reports
- Manter você informado sobre o progresso
- Creditar você pela descoberta (se desejar)
- Não tomar ações legais contra pesquisadores de boa fé

Pedimos que você:

- Nos dê tempo razoável para corrigir antes de divulgar
- Não explore a vulnerabilidade além do necessário para demonstração
- Não acesse ou modifique dados de outros usuários
- Não execute ataques de DoS

## 🙏 Agradecimentos

Agradecemos à comunidade de segurança por nos ajudar a manter o projeto seguro para todos.

---

**Última Atualização:** 15 de Novembro de 2025  
**Versão da Política:** 1.0
