# Página de vendas — revisão autorizada em 09/11/2026

## Resultado

Início e Método Regular compartilham `src/sales.mjs`. Fundo verde profundo #082F25, superfícies esmeralda e champagne, monograma no cabeçalho/rodapé/fechamento, retrato real novo na apresentação médica, quatro pilares ilustrados, comparação Base × Completo e convites destacados para consultoria e acompanhamento.

A tabela apresenta dez conteúdos com apenas Incluído/Não incluído. Foram removidos os dois parágrafos indicados dos cartões e a linha de consulta/plano individualizado do comparativo. Calendário e orientação sobre a escolha do Completo seguem disponíveis nas dúvidas, sem mudar a entrega. A animação dos pilares respeita movimento reduzido; o conteúdo funciona sem JavaScript.

## Ativos e autorização

- `assets/img/sales/docliv-logo-original.png`: logo enviado como e(1).png; o enquadramento CSS exibe o monograma.
- `assets/img/sales/sandro-cuidado.png`: foto enviada como eee(1).png; enquadramento CSS preserva o arquivo e os traços faciais.
- `assets/img/sales/sandro-retrato.jpg`: foto real mantida na abertura.
- `assets/img/sales/quatro-pilares.webp`: ilustração gerada para o site, codificada em WebP nas mesmas dimensões.

Brief da ilustração: composição fotorealista 2×2 com preparo de refeição brasileira simples, caminhada no parque, sono e planejamento em agenda; luz natural, champagne e esmeralda, sem texto, logos, pacientes, depoimentos ou antes/depois. Gerada com a ferramenta integrada de imagens e identificada como ilustrativa na página.

O usuário autorizou explicitamente o envio das novas imagens ao repositório público `docsjr/wshop`, ciente de que ficarão acessíveis a terceiros, mantendo o site sem publicação. Essa autorização resolve o bloqueio anterior de upload; não autoriza deploy.

## Recuperação e testes

Nesta retomada, o ambiente local continha uma cópia anterior. Foi aberta uma cópia isolada a partir do commit remoto d2790da; as alterações aprovadas foram recuperadas a partir do registro da implementação e dos mesmos arquivos de imagem persistidos. A cópia anterior foi preservada.

`npm run build`: 14 rotas e página de revisão. `npm test`: 17 aprovados, zero falhas após a recuperação. `git diff --check`: aprovado. Sintaxe JavaScript validada. A suíte cobre rotas, SEO básico, âncoras/assets, links comerciais, contatos, calendário, FAQ, ausência de rastreadores, contraste dos tokens, orçamento de arquivos, respostas HTTP, estados de erro e comparativo simplificado.

Na sessão anterior, foram inspecionados no navegador logo, cores, fotos, pilares, comparativo e bloco final. CTAs de consultoria e acompanhamento chegaram às páginas corretas. Início e Método Regular foram verificados em frames de 320, 360, 390, 599, 600, 767, 768, 1023, 1024, 1279, 1280 e 1440 px, 24 combinações sem transbordamento horizontal do documento. Menu mobile abriu e fechou com Escape; comparativo abriu com Enter. Esses são registros da sessão anterior, não uma nova rodada visual nesta retomada. Testes em dispositivos físicos, leitores de tela e métricas reais de performance continuam pendentes de auditoria final.

## Integrações e publicação

Base R$ 279,90 e Completo R$ 359,90 conduzem ao checkout oficial `https://pay.kiwify.com.br/t5IY204`, com escolha opcional do Completo. Três guias avulsos preservam preços e URLs. Não houve compra, mensagem ou agendamento; nenhum formulário, analytics ou pixel foi acrescentado.

A configuração da Kiwify que pode permitir somar guia já incluído no Completo continua pendente de validação externa. Demais pendências em `docs/PENDENCIAS.md` e `docs/PRE_PUBLICACAO.md` permanecem válidas. Noindex/nofollow e bloqueios B01–B08 mantidos. Nenhuma publicação ou alteração em main.

## Execução

`npm run build`, `npm run dev`. Para prévia sem servidor: `python3 scripts/export-preview.py`; extrair a pasta inteira e abrir `index.html`. Destinos externos exigem internet.
