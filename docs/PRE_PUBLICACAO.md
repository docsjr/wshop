# Configuração e preparação para publicação

Estado em 09/11/2026: **aguardando auditoria final; publicação não autorizada**. Este checklist não substitui a autorização expressa do responsável.

## Configuração do projeto

1. Usar Node.js 22 ou 24; executar `npm run build`, `npm test` e `npm run dev`. Não há pacotes de aplicação a instalar.
2. Editar preços, URLs, mensagens e textos somente em `src/content.json`. Manter `links.base` e `links.completo` iguais a `https://pay.kiwify.com.br/t5IY204`. O valor do adicional fica em `commerce.upgradeAmount` (80); o total do Completo em `products` (359.90).
3. Os extras usam suas três URLs próprias, já cadastradas. Não adicionar parâmetros de compra nem criar checkout independente sem nova decisão comercial.
4. WhatsApp: `links.whatsapp`; mensagens administrativas: `messages`. E-mail e Instagram permanecem nos campos oficiais. Não inserir conteúdo clínico nas mensagens pré-preenchidas.
5. Área do aluno e canonical: preencher somente após receber URLs oficiais. Os placeholders `[[CAMPO]]` não são dados aprovados. Consultar a lista completa em `PENDENCIAS.md`.
6. Para uma revisão em subdiretório, usar `BASE_PATH=/wshop` tanto no build quanto no servidor. O prefixo afeta rotas e recursos internos, não os endereços externos. A futura hospedagem deve corresponder ao mesmo caminho.
7. Sem formulário ou mensuração autorizados nesta V1. Uma mudança exige escopo, destino dos dados, configuração e revisão de privacidade; não basta inserir um identificador arbitrário.
8. Instrumentação QA: rodar scripts de QA somente depois do build, dentro da revisão. Rodar novo build antes de empacotar. Os arquivos `qa-*` não pertencem à versão entregue.

## Ações na Kiwify para o responsável pela plataforma

- Conferir o checkout principal com Brasil selecionado: Base R$ 279,90; adicional Completo R$ 80,00; total à vista R$ 359,90.
- Resolver a duplicidade observada: o Completo já inclui os três extras e o checkout ainda permite selecionar Hormônios à parte. Verificar os controles reais disponíveis no painel, aplicar uma regra compatível ou revisar a apresentação comercial e testar novamente. Não foi presumida a existência de uma função de exclusão mútua na plataforma.
- Verificar vínculo de cada oferta ao grupo correto de acesso. A compra avulsa de Hormônios deve entregar somente esse guia e suas orientações de acesso.
- Conferir a liberação progressiva do curso, guias conforme versão, validade de 365 dias e comportamento em compras sucessivas.
- Usar modo de teste oficial se disponível; caso contrário, definir procedimento expressamente autorizado para pagamento, recusa, reembolso e entrega. Não concluir compra real apenas para marcar um teste como aprovado.

## Checklist de aceite

- [x] Base e Completo integrados ao mesmo checkout.
- [x] Extras avulsos e preços oficiais configurados e páginas externas verificadas.
- [x] Todos os CTAs de compra/atendimento validados contra o cadastro central.
- [x] Navegação, 404, recuperação e respostas do servidor verificadas.
- [x] 16 testes automatizados sem falhas.
- [x] 156 verificações responsivas sem overflow horizontal.
- [x] Foco do menu e FAQ por teclado corrigidos e conferidos.
- [x] Três medições internas por página principal registradas, com limites explícitos.
- [x] `noindex`, robots restritivo e bloqueio de geração pública mantidos.
- [ ] Resolver seleção redundante de guias no checkout e repetir a conferência do total.
- [ ] Validar compra, recusa, cancelamento/reembolso e entrega real ou em teste oficial.
- [ ] Confirmar grupos, materiais, acessibilidade dos arquivos/vídeos e calendário na área do aluno.
- [ ] Testar WhatsApp no celular, resposta da equipe, recebimento de e-mail e perfil social.
- [ ] Testar dispositivos físicos, leitores de tela, orientação, zoom 400% e rede/CPU controladas.
- [ ] Aprovar identificação, equipe, serviços, preços assistenciais vigentes e minutas B01–B08.
- [ ] Fornecer domínio, URL da área do aluno e ativos autorizados; resolver os 46 placeholders.
- [ ] Definir hospedagem, redirects, 404 e cabeçalhos. GitHub Pages não aplica `_headers` automaticamente.
- [ ] Preparar canonical, sitemap e política de indexação da versão pública após as aprovações.
- [ ] Auditar privacidade da hospedagem e qualquer futura ferramenta de mensuração.
- [ ] Registrar aceite final e autorização explícita para publicar.
- [ ] Somente então preparar a versão pública e autorizar merge/deploy. Não executar automaticamente.

Os campos `release.B01` a `release.B08` exigem aprovação e evidências reais. Não marcá-los como aprovados para contornar a barreira. A rotina `check:release` continua recusando publicação; a versão pública exige trabalho separado e autorizado. Não mesclar a branch de revisão em `main`, pois o repositório mantém uma publicação independente no GitHub Pages.

## Divergência observada no repositório

Em 09/11, `main` apontava para `9d86c6e2f7f03cc810907385ed4b25ae50022b1f`, três commits além da base original. As alterações em `index.html` usam o checkout independente do Completo e separam os três guias em linhas da comparação. A versão multipáginas já compara cada guia separadamente e segue a instrução comercial atual de checkout único. A branch principal não foi modificada nesta fase. Conferir essa divergência na auditoria antes de qualquer integração autorizada; não restaurar inadvertidamente o checkout independente.
