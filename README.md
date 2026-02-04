# 🦷 Odonto PRO

> Plataforma SaaS para gestão completa de clínicas odontológicas, com automação do atendimento, prontuários digitais e controle financeiro em tempo real.

## Visão geral do sistema

Odonto PRO combina um backend FastAPI escalável com um frontend React responsivo para entregar experiências clínicas, administrativas e financeiras em um único produto. A API oferece autenticação JWT com refresh tokens, controle de acesso baseado em papéis (RBAC) e integrações com serviços de mensageria e armazenamento de arquivos. O frontend consome os endpoints REST via Axios e TanStack Query, oferecendo fluxos SPA otimizados com componentes reutilizáveis e design system baseado em Tailwind.

Principais características arquiteturais:

- **FastAPI + PostgreSQL** para gerenciamento transacional de pacientes, agenda, financeiro, estoque e auditoria LGPD.
- **Redis** para cache, filas de notificações e verificação de disponibilidade.
- **MinIO** como storage compatível com S3 para radiografias, fotos clínicas e documentos.
- **React + Vite + Tailwind** para uma interface modular, com navegação por domínio e hooks especializados.
- **Docker Compose** padronizando a experiência local com banco, cache, storage e API em containers.

## Principais funcionalidades

- Cadastro completo de clínicas, profissionais, pacientes e permissões por papel.
- Agendamento médico-odontológico com disponibilidades por profissional, confirmações e integrações com notificações WhatsApp.
- Prontuário digital com odontograma, histórico ortodôntico, anexos clínicos e auditoria de alterações.
- Controle financeiro com lançamentos a pagar/receber, resumo consolidado e gestão de procedimentos.
- Upload seguro de arquivos com fluxo presigned (prepare → upload direto no MinIO → confirm) e URLs temporárias para download.
- Painel de notificações assíncronas, relatórios gerenciais, estoque, fornecedores e serviço de suporte integrado.

## Stack técnica

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) com Pydantic v2, SQLAlchemy e Alembic.
- Autenticação JWT com refresh tokens e RBAC (`admin`, `recepcao`, `dentista`, `financeiro`).
- Redis para filas do `notify_svc` e cache de sessões.
- MinIO via SDK oficial para geração de URLs pré-assinadas.
- Observabilidade com logs estruturados (Structlog) e métricas Prometheus (`/metrics`).

### Frontend
- React 18 + TypeScript com bundler [Vite](https://vitejs.dev/).
- Tailwind CSS, shadcn/ui e Radix UI para o design system.
- TanStack Query, Axios e React Hook Form para dados, requisições e formulários.
- Rotas SPA com React Router, componentes especializados em `src/components` e hooks em `src/hooks`.

### Infraestrutura
- Docker e Docker Compose para orquestração local de API, PostgreSQL, Redis e MinIO.
- Scripts de teste automatizados (`test_backend.sh`, `test_frontend.sh`, `test_functional.sh`) e docs dedicados em `docs/`.
- Integração planejada com GitHub Actions para CI/CD e observabilidade via Grafana/Sentry.

## Estrutura de pastas

```text
.
├── backend/                   # API FastAPI, migrations e serviços auxiliares
│   ├── app/                   # Código principal (rotas, auth, serviços, schemas)
│   ├── alembic/               # Migrations e versões do banco de dados
│   ├── docs/                  # Guias técnicos específicos do backend
│   ├── Dockerfile             # Build da API
│   └── docker-compose.yml     # Stack local: API + Postgres + Redis + MinIO
├── src/                       # Frontend React (Vite + Tailwind)
│   ├── components/            # UI e componentes por domínio (agenda, pacientes, financeiro...)
│   ├── hooks/                 # Hooks especializados (useAppointments, useFiles, etc.)
│   ├── pages/                 # Páginas SPA e layouts
│   ├── services/              # Clientes REST (authService, patientsService, filesService...)
│   └── lib/, contexts/, assets
├── docs/                      # Documentação geral (LGPD, segurança, planos técnicos)
├── scripts/                   # Automação e utilitários
├── .env.example               # Variáveis de ambiente padrão
└── package.json, vite.config  # Configurações do frontend
```

## Instalação e execução com Docker

1. **Pré-requisitos**
   - Docker ≥ 24 e Docker Compose Plugin ≥ 2.20
   - Node.js 20+ (para executar o frontend localmente)

2. **Configurar variáveis de ambiente**
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```

3. **Inicializar serviços de backend**
   ```bash
   cd backend
   docker compose up -d --build
   docker compose exec api alembic upgrade head
   ```
   Serviços expostos:
   - API: http://localhost:8000/api
   - Postgres: localhost:5432
   - Redis: localhost:6379
   - MinIO Console: http://localhost:9001 (usuário `admin`, senha `admin123` por padrão)

4. **Executar o frontend**
   ```bash
   cd ..
   npm install
   npm run dev
   ```
   A aplicação estará disponível em http://localhost:5173 consumindo a API local (`VITE_API_BASE_URL`).

5. **Verificar saúde do ambiente**
   ```bash
   curl http://localhost:8000/health
   curl -sS http://localhost:8000/api/meta/endpoints | jq '.[0:5]'
   ```

Para encerrar os serviços:
```bash
cd backend
docker compose down -v
```

## Variáveis de ambiente essenciais

| Variável | Descrição |
|----------|-----------|
| `JWT_SECRET_KEY` | Segredo usado para assinar tokens de acesso e refresh. |
| `DATABASE_URL` | URL SQLAlchemy (`postgresql+psycopg://usuario:senha@host:5432/odonto`). |
| `MINIO_ENDPOINT` / `MINIO_BUCKET` | Endpoint e bucket padrão para uploads clínicos. |
| `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` | Credenciais administrativas do MinIO. |
| `REDIS_URL` | Conexão com Redis usado pelo notify service (`redis://redis:6379/0`). |
| `WHATICKET_BASE_URL` / `WHATICKET_TOKENAUTH` | Integração com gateway WhatsApp para confirmações automáticas. |
| `VITE_API_BASE_URL` | Endpoint base que o frontend usa para chamar a API (ex.: `http://localhost:8000/api`). |
| `FRONTEND_ORIGIN` / `FRONT_BASE` | Domínios autorizados no CORS e links de redirecionamento. |

Consulte `.env.example` e `backend/.env.example` para demais opções como limites de notificação, retenção LGPD e URLs públicas do MinIO.

## Endpoints principais

### Autenticação (`/api/auth`)
- `POST /login` — Autentica usuário e retorna tokens JWT + dados do perfil.
- `POST /refresh` — Gera novo access token a partir do refresh token.
- `GET /users/me` — Perfil do usuário autenticado com papéis e clínica atual.

### Pacientes (`/api/patients`)
- `GET /` — Lista pacientes da clínica, respeitando RBAC.
- `POST /` — Cria paciente com validação de CPF único por clínica.
- `PUT /{id}` e `DELETE /{id}` — Atualização e exclusão lógica com auditoria LGPD.

### Agenda (`/api/appointments`)
- `GET /` — Agenda filtrada por período, dentista, paciente ou status.
- `POST /` — Criação de consultas vinculadas a pacientes e profissionais.
- `GET /availability` e `POST /availability` — Configuração de slots recorrentes.

### Financeiro (`/api/finance`)
- `GET /` — Lançamentos por status, período e tipo (receber/pagar).
- `POST /` — Cria títulos vinculando paciente, agendamento e procedimento.
- `GET /summary` — Resumo consolidado da clínica.

### Uploads clínicos (`/api/files`)
- `POST /prepare` — Gera URL pré-assinada e metadados para upload direto ao MinIO.
- `POST /confirm` — Persiste metadados e associa arquivo ao paciente/atendimento.
- `GET /{id}` — Recupera metadados com `download_url` temporária.

Endpoints adicionais cobrem módulos de clínicas, estoque, fornecedores, relatórios, notificações e webhooks (ver `/api/meta/endpoints`).

## Roadmap

- Automação de confirmações via WhatsApp com reenvio inteligente e monitoramento de status.
- Dashboard financeiro em tempo real consolidando indicadores de fluxo de caixa, inadimplência e metas.
- Portal do paciente para acesso a documentos, agendamentos e pagamentos online.

## Plano de melhorias 2025 (checklist)

> Lista priorizada das evoluções que devem ser tratadas para posicionar o Odonto PRO como SaaS competitivo em 2025. Use o checklist para acompanhar a execução e marcar as entregas concluídas.

### 1. Notificações e automação via WhatsApp
- [ ] Centralizar lembretes D-2/D-1 em filas (RQ/Celery) com disparo automático para todos os agendamentos.
- [ ] Implementar botões interativos (confirmar/cancelar) via Whaticket/saas-what e sincronizar status no agendamento.
- [ ] Criar jobs D-90 (reativação) e pós-consulta (feedback) reaproveitando `notify_svc/jobs.py`.

### 2. Evolução financeira
- [ ] Expor `/finance/dashboard` com KPIs (receita, despesas, margem, inadimplência e comparação M/M).
- [ ] Integrar com pagamentos PIX/cartão, registrar liquidações e conciliações.
- [ ] Controlar glosas de convênios com relatórios de cobranças pendentes.
- [ ] Adicionar calculadora de precificação considerando custos e tempo de procedimento.

### 3. Retenção e fidelização
- [ ] Implementar programa de pontos por procedimento (níveis Bronze/Prata/Ouro + recompensas).
- [ ] Automatizar campanhas de reativação identificando pacientes inativos (≥90 dias).
- [ ] Liberar portal do paciente para histórico, downloads e autoagendamento seguro.

### 4. Multi-clínica e onboarding
- [ ] Introduzir `clinic_id` transversal para isolar dados em todas as tabelas/rotas.
- [ ] Permitir que um admin gerencie múltiplas clínicas com troca de contexto.
- [ ] Criar fluxo self-service de cadastro de clínica/plano com provisionamento automático (subdomínio + DB).

### 5. Integração com saas-what
- [ ] Reaproveitar `typebotListener` para triagem e coleta de sintomas pré-consulta.
- [ ] Usar `WbotMessageListener` para FAQs (horários, endereço, convênios) com respostas automáticas.
- [ ] Monitorar reconexões WhatsApp com métricas do saas-what e alertas proativos.

### 6. Observabilidade, testes e CI/CD
- [ ] Conectar Prometheus + Grafana e instrumentar métricas de API, filas e webhooks.
- [ ] Integrar Sentry (backend/frontend) e definir alertas de erro críticos.
- [ ] Expandir cobertura de testes (pytest, Vitest) para integrações com Whaticket e fluxos críticos (meta ≥70%).
- [ ] Configurar pipelines GitHub Actions com lint, testes e build contínuo.
- [ ] Automatizar backups (PostgreSQL + MinIO) e testes de restauração periódicos.

### 7. Teleodontologia e UX
- [ ] Integrar videochamadas (Jitsi/Zoom) para consultas remotas com agendamento online e pagamento antecipado.
- [ ] Adicionar feedback visual imediato (toasts/banners) em páginas sensíveis (pacientes, agenda, financeiro).
- [ ] Garantir responsividade mobile e acessibilidade (contraste, teclado, ARIA).
- [ ] Internacionalizar interface (PT-BR, EN, ES) com suporte a troca de idioma.

### 8. Suporte ao gestor
- [ ] Automatizar geração/envio de relatórios, recibos e alertas de estoque mínimo.
- [ ] Integrar convênios/órgãos reguladores com exportações (CNES/SUS) e webhooks dedicados.
- [ ] Criar painel de metas (faturamento, taxa de retorno, produtividade) com acompanhamento em tempo real.

### 9. Tendências 2025
- [ ] Incorporar recursos de teleodontologia, sustentabilidade operacional e IA para apoio a diagnósticos.
- [ ] Documentar como cada inovação atende dores de retenção, finanças e comunicação listadas na pesquisa 2024-2025.
- [ ] Revisitar o checklist trimestralmente para priorizar itens concluídos e próximos passos.

## Status atual do checklist 2025

| Pilar | Situação resumida | Principais lacunas |
|-------|-------------------|--------------------|
| Notificações e automação | Jobs de confirmação, lembrete e cobrança estão prontos em `notify_svc/jobs.py` e já escrevem métricas/logs estruturados. | Orquestração D-2/D-1/D-90, botões interativos do Whaticket e feedback pós-consulta precisam ser implementados. |
| Evolução financeira | API de lançamentos, resumo e `/finance/dashboard` exposta pelo FastAPI e alimentada pelos repositórios de relatórios. | Faltam integrações PIX/cartão, conciliação automática e o módulo de glosas/precificação. |
| Retenção e fidelização | Pacientes, prontuários e notificações estão maduros, porém não existe gamificação ou portal self-service. | Programa de pontos, campanhas automatizadas e portal do paciente permanecem zerados. |
| Multi-clínica e onboarding | Modelos e rotas já utilizam `clinic_id`, permitindo isolar dados entre unidades. | Falta o onboarding self-service com provisionamento de subdomínio/banco e troca dinâmica de contexto pelo admin. |
| Integração saas-what | Envio básico via Whaticket com fallback local já está encapsulado. | Typebot/Wbot listeners, FAQ automatizada e observabilidade da sessão WhatsApp ainda não foram ligados. |
| Observabilidade, testes e CI/CD | Métricas Prometheus, auditoria e suíte pytest/vitest estão configuradas. | Continua sem Sentry, sem pipeline GitHub Actions e sem automação de backup/restauração. |
| Teleodontologia e UX | Nenhuma dependência de vídeo ou fluxos mobile-first implementados até o momento. | Todo o módulo de teleconsulta, anexos ao vivo e revisão de UX móvel está pendente. |

### Destaques do que já está em produção

- **Financeiro consolidado** – Os endpoints `/api/finance` e `/api/finance/dashboard` já respondem com KPIs de receita, pendências e top procedimentos usando agregações SQL otimizadas em `app/repositories/reporting.py`. Isso cobre ~40% do item "Evolução financeira".
- **Notificações assíncronas** – A fila RQ exposta em `notify_svc/jobs.py` já lida com confirmações, lembretes e cobranças vencidas, garantindo rastreabilidade no banco e permitindo expansão para novos templates.
- **Instrumentação** – `app/core/metrics.py` mantém histogramas/counters registrados automaticamente, então Prometheus/Grafana podem ser habilitados sem retrabalho estrutural.

### Pontos críticos em aberto

1. **Pagamentos online** – Nenhuma integração com PIX/cartão existe hoje, logo a monetização depende de registro manual.
2. **Fidelização & portal** – A ausência de camadas específicas deixa todo o item 3 sem progresso mensurável.
3. **Teleodontologia** – É o maior bloco sem qualquer linha de código, devendo ser deixado para a reta final após fundações de dados e finanças.

## Linha do tempo estimada até o lançamento

Assumindo um squad enxuto de 4 pessoas (2 backend, 1 frontend, 1 product/QA) e cadência quinzenal, o roadmap abaixo entrega o checklist em ~16 semanas:

| Fase | Semanas | Objetivos chave | Dependências |
|------|---------|-----------------|--------------|
| F1 – Automação clínica | 1–3 | Orquestrar lembretes D-2/D-1/D-90, feedback pós-consulta e listeners Whaticket. | Infra de fila e templates existentes. |
| F2 – Pagamentos & KPIs | 4–6 | Gateway PIX/cartão + conciliação, glosas e calculadora de precificação integrada ao dashboard atual. | API Finance já publicada. |
| F3 – Fidelização | 7–9 | Programa de pontos, campanhas de reativação e MVP do portal do paciente (histórico + downloads). | Identidade unificada via `clinic_id`. |
| F4 – Multi-clínica SaaS | 10–12 | Context switch multi-clínica, onboarding self-service e provisionamento automático (subdomínio + DB/seed). | Base multi-tenant pronta. |
| F5 – Observabilidade & CI | 13–15 | Grafana/Prometheus gerenciados, Sentry (web/API), backups automatizados e pipelines GitHub Actions. | Métricas e testes existentes. |
| F6 – Teleodontologia & Go-live | 16 | Integração Jitsi/Zoom, sala virtual compartilhada e hardening mobile-first antes do lançamento público. | Portal do paciente estabilizado. |

## Gateways de pagamento recomendados (Brasil)

| Gateway | Motivos para adotar | Observações de integração |
|---------|---------------------|--------------------------|
| **PagSeguro** | Marca já conhecida dos pacientes, checkout transparente, PIX dinâmico, links de pagamento e split para repasse a dentistas. | SDKs REST/JS estáveis, dashboard antifraude nativo e suporte a recorrência. |
| **Mercado Pago** | Alto volume no Brasil, boas taxas de aprovação em cartão, PIX copia-e-cola instantâneo e webhooks bem documentados. | Disponibiliza checkout Pro (white-label) com tokens PCI, ideal para portal do paciente. |
| **Pagar.me (StoneCo)** | API focada em SaaS, split automático por profissional, antifraude integrado (Stone Code) e suporte dedicado. | Recomendado para clínicas maiores que precisam de liquidação e conciliação avançada. |
| **Iugu** | Especializada em billing recorrente e emissão de boletos/PIX cobrindo clínicas com planos mensais. | Webhooks simples e biblioteca oficial Python/Node, facilita conciliação com o módulo financeiro. |
| **Gerencianet/Sicoob** | Forte em PIX instantâneo e boletos registrados, ideal para repasses rápidos no interior e regiões com cooperativas. | Baixo custo por transação e API moderna; pode servir como fallback para clientes que já usam cooperativas. |
| **Stripe (localizado no Brasil)** | Excelente documentação, suporte multi-moeda e recursos de faturamento (Billing) para planos e add-ons. | Necessário habilitar conta BR e adequar documentação fiscal, mas garante escalabilidade global. |

> Sugestão: iniciar com PagSeguro + Mercado Pago para ganhar capilaridade rapidamente e depois oferecer Pagar.me/Iugu como opções avançadas para clientes enterprise. Todos suportam PIX + cartão, atendendo aos requisitos de pagamentos instantâneos e parcelados.

## Licença e contato

Uso proprietário. Para informações de licenciamento ou parcerias, entre em contato:

**Osmar Francisco Cavalcante**  
[osmar@osmardev.online](mailto:osmar@osmardev.online)
#   d e z p i l a _ c l o n e  
 