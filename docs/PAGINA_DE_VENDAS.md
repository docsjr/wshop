# Página de vendas — revisão de 09/11/2026

## Entrega

Início e Método Regular usam o componente compartilhado `src/sales.mjs`, com fotografia, mensagem curta, situações da rotina, benefícios, livro completo, bônus, comparação Base × Completo, extras avulsos e chamadas para compra. As demais páginas e componentes funcionais foram preservados. A redação comercial desta atualização está sujeita à revisão final do responsável.

O custo de continuar no improviso é apresentado em tempo, energia para recomeçar e falta de clareza; não há promessas de emagrecimento ou resultados garantidos. Sono é conteúdo do curso, acompanhado pelo guia Cansaço; não foi inventado um guia extra de sono. Além da balança integra os materiais comuns. A representação tipográfica do livro não reproduz uma capa final.

## Imagens fornecidas

- `upload/e11.jpg` → `assets/img/sales/sandro-retrato.jpg`: retrato original, sem alteração do rosto.
- `upload/eeeee.png` → `assets/img/sales/metodo-apresentacao.png`: peça original do Método Regular. A peça inteira está vinculada à seção de versões e preços.

As duas imagens foram indicadas pelo usuário para este trabalho. Isso não encerra a revisão geral de ativos antigos prevista no checklist de publicação.

## Integrações mantidas

Base: R$ 279,90; Completo: R$ 359,90. Ambos conduzem a `https://pay.kiwify.com.br/t5IY204`; o visitante seleciona o adicional de R$ 80,00 no checkout. Não existe seleção automática nem segundo checkout independente ativo.

Os três guias avulsos preservam preços e URLs oficiais. Contatos da consultoria e WhatsApp continuam nos componentes compartilhados. Não foram criados formulários, pixels, analytics ou coleta de informações clínicas.

## Validação executada

`npm run build`: geração concluída. `npm test`: 16 aprovados, zero falhas. `node --check src/sales.mjs` e `git diff --check`: aprovados.

A suíte verifica rotas, idioma, metadados individuais, H1, regiões semânticas, existência de links locais e âncoras, destinos comerciais e de contato, calendário, FAQ nativa, ausência de rastreadores, contraste dos tokens de paleta, orçamento de arquivos, respostas HTTP, bloqueio de produção e tratamento de destinos ausentes. Esses controles não equivalem a uma auditoria visual completa de acessibilidade ou de performance real.

O ZIP da prévia é validado quanto à integridade e existência de destinos internos durante a exportação. A abertura em navegador pelo destinatário permanece necessária.

## Limites e pendências

A abertura da prévia no navegador foi recusada pela revisão automática por limite de uso do ambiente. Portanto, mobile/desktop, sobreposição de elementos, foco e interações no novo layout, contraste sobre imagens, métricas reais de carregamento e capturas de tela desta atualização NÃO foram validados. Resultados visuais anteriores não devem ser apresentados como resultados desta versão.

A inspeção anterior da Kiwify encontrou possibilidade de adicionar um guia já incluído ao escolher Completo. A página informa que não é necessário comprar novamente; a regra de exclusão precisa ser configurada na plataforma de pagamento. Nenhuma compra foi concluída ou simulada como aprovada.

Pendências de domínio, área do aluno, documentação e dados finais continuam em `docs/PENDENCIAS.md` e `docs/PRE_PUBLICACAO.md`. Não há publicação nem autorização presumida para deploy.

## Como revisar

Execute `npm run build` e `npm run dev`. Para revisão sem servidor, execute `python3 scripts/export-preview.py`, extraia o ZIP e abra `DocLiv-previa/index.html`. Destinos externos exigem internet.

Antes da publicação: revisar o novo layout em celular e desktop; conferir teclado, leitores de tela e performance real; validar textos e condições comerciais; ajustar a regra de extras na Kiwify; resolver bloqueios B01–B08; configurar domínio e SEO público; obter auditoria final e autorização explícita. A prévia mantém `noindex, nofollow` e as marcações de revisão.
