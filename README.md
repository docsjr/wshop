# DocLiv — website multipáginas

Implementação de revisão, **sem publicação**, baseada no repositório `docsjr/wshop`, commit `f4fbad96c2cf8a5ecdb3786b9343e0dbd45e3e6a`. A branch principal e os sites existentes não são alterados por nenhum comando deste projeto.

## Executar

Requer Node.js 22 ou 24 (testado com 24.22.1). Não há dependências npm nem etapa de instalação.

```sh
npm run build
npm test
npm run dev
```

Abra `http://localhost:4173/`. O servidor entrega apenas `dist/`, com status 404 real, redirecionamento de diretórios e cabeçalhos de segurança. Não abra os arquivos por `file://`: as rotas usam a raiz do servidor. Para limitar o servidor ao próprio computador, execute `HOST=127.0.0.1 npm run dev`. O padrão `0.0.0.0` permite o proxy de prévia do Sites e testes na rede local; não é configuração de produção.

Para uma futura revisão sob o caminho do GitHub Pages:

```sh
BASE_PATH=/wshop npm run build
BASE_PATH=/wshop npm run dev
```

Então abra `http://localhost:4173/wshop/`. Use a mesma variável no build e no servidor. Não mescle esta branch em `main` antes da autorização: o repositório atual tem publicação independente no GitHub Pages.

## Estrutura

| Caminho | Responsabilidade |
|---|---|
| `src/content.json` | Textos consolidados, catálogo, preços, canais, FAQ, calendário, atividades e estados de liberação |
| `src/components.mjs` | Header, Footer, Button, Card, OfferCard, PriceBlock, Comparison, Guides, Timeline, FAQ, Demonstration, Layout e composição das páginas |
| `assets/css/tokens.css` | Paleta, tipografia, medidas, espaçamentos e fontes locais |
| `assets/css/styles.css` | Layout mobile-first e estados dos componentes |
| `assets/js/main.js` | Menu modal, atividades e compatibilidade com âncoras antigas |
| `assets/fonts/` | Manrope 400/600 e Bodoni Moda 500, WOFF2 com licenças OFL |
| `scripts/build.mjs` | Geração estática, sem acesso à rede e sem deploy |
| `scripts/serve.mjs` | Servidor de revisão e recuperação 404 |
| `scripts/qa-fixture.mjs` | Gera somente em `dist/` a bancada temporária de responsividade |
| `tests/site.test.mjs` | Testes nativos do Node |
| `docs/` | Pendências, decisões e evidências de validação |
| `dist/` | Resultado gerado, ignorado pelo Git |

## Páginas implementadas

`/`, `/metodo-regular/`, `/consultoria/`, `/acompanhamento/`, `/sobre/`, `/duvidas/`, `/contato/`, `/termos-de-uso/`, `/termos-de-compra/`, `/privacidade/`, `/cookies/`, `/cancelamentos/`, `/atendimento-online/` e `404.html`. A página adicional `/revisao/` relaciona os dados pendentes da versão de revisão.

## Conteúdo e decisões

As atualizações expressas do usuário têm precedência; a especificação mestre de 07/11/2026 orienta os demais pontos e prevalece sobre os dois documentos anteriores. Os textos públicos foram extraídos para o cadastro central. As instruções de montagem foram substituídas pelos respectivos componentes. Aulas, livros, inclusões, avisos e prazos seguem a consolidação. FAQ reutilizada vem de um único banco.

A regra comercial vigente é Base com upgrade opcional para Completo no mesmo checkout: https://pay.kiwify.com.br/t5IY204. O adicional observado na Kiwify é R$ 80,00 (total à vista de R$ 359,90). Os três guias mantêm compra avulsa. O checkout independente anteriormente fornecido não é utilizado. Não existe pré-seleção por parâmetro nem confirmação de compra pelo clique. Valores assistenciais históricos não foram recuperados: a especificação mestre exige tabela vigente. Contatos usam somente mensagens administrativas neutras. Equipe DocLiv, WhatsApp com DDI +55, e-mail, Instagram, identificação profissional e Cândido Godói — RS foram confirmados pelo usuário; atendimento online disponível. As confirmações estão registradas em `src/content.json`.

Os arquivos antigos de fotografia e capa foram preservados no repositório, mas ficam fora do build até a liberação dos ativos prevista em B08. A composição atual é tipográfica; não simula retrato, paciente ou material comercial. A biografia alterada no commit de origem permanece recuperável no histórico, mas não substitui a redação mais recente nem a comprovação de qualificações exigida pela especificação.

A antiga página única na raiz foi substituída pelo gerador. A versão anterior continua no histórico Git. Navegação, compras e conteúdo essencial funcionam sem JavaScript; a FAQ usa abertura nativa sem JavaScript e as quatro amostras permanecem disponíveis sem o aprimoramento. O menu usa `dialog.showModal()`, fundo inativo, circulação de foco por Tab/Shift+Tab, Escape e retorno de foco.

## SEO, privacidade e publicação

Cada página tem título e descrição próprios, idioma pt-BR, um H1 e metadados Open Graph. Fontes são locais, sem consultas ao Google durante a navegação. Nenhum formulário, cookie, armazenamento local, analytics ou pixel foi acrescentado ao código.

Toda esta entrega tem `noindex, nofollow`, aviso de revisão e `robots.txt` restritivo. Isso **não é controle de acesso**. A prévia foi usada apenas no ambiente interno; eventual homologação remota requer autenticação/restrição de acesso. O domínio canônico e a área do aluno não foram fornecidos: não há destinos inventados, canonical ou sitemap com domínio presumido. Os dados estruturados complexos ficam fora da V1 por decisão da especificação mestre.

`npm run check:release` deve falhar: B01–B08 continuam sem evidências de encerramento, há 46 campos a confirmar e o domínio final não foi definido. O comando não publica. Mesmo após preencher os dados, a rotina pública, o sitemap, os cabeçalhos da hospedagem e a remoção das marcações de revisão precisam de preparação e autorização explícitas. Nenhum workflow de deploy foi adicionado.

Detalhes em [Integrações e testes](docs/INTEGRACOES_E_TESTES.md), [Pendências](docs/PENDENCIAS.md) e [Configuração e checklist](docs/PRE_PUBLICACAO.md).
