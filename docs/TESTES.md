# Resultado das verificações — 08/11/2026

## Ambiente

Node.js 24.22.1; HTML/CSS/JavaScript estáticos; nenhuma dependência de aplicação. Navegador Chrome do ambiente de revisão do Sites. A prévia não é uma publicação. Testes sem dados de pacientes, sem compra e sem envio de mensagens.

## Testes automatizados

`npm run build` seguido de `npm test`: **12 testes aprovados, zero falhas**.

Cobertura: 14 rotas e página de revisão; idioma, títulos/descrições, H1 e regiões; IDs únicos; destinos internos, âncoras e recursos locais; cinco produtos nos checkouts fornecidos; aviso do adicional do Completo; FAQ acessível; conteúdo sem JavaScript; calendário 0/3/6/7 dias e validade; ausência de preços assistenciais históricos, formulários clínicos e rastreadores; contraste calculado das combinações de texto; orçamento de transferência; bloqueio da geração pública; servidor com 200/308/404/405, HEAD e CSP.

`node --check` passou para scripts de interação e geração. A recusa de `npm run check:release` é o comportamento esperado enquanto faltam dados e aprovações. Ela não apaga o build de revisão.

## Conferência no navegador

Nove páginas verificadas na bancada de iframes: Início, Método Regular, Consultoria, Acompanhamento, Sobre, Perguntas frequentes, Contato, Termos de uso e Privacidade. Cada página teve seu H1 confirmado antes da medição em cada largura.

Larguras: **320, 360, 390, 599, 600, 767, 768, 1023, 1024, 1279, 1280 e 1440 px**. Em todas as 108 combinações, a largura de conteúdo não excedeu a largura útil do documento. As barras de rolagem verticais ocupam 15 px neste ambiente. Isso testa layouts por largura; não representa 108 dispositivos reais.

Verificados: apresentação desktop e mobile; menu abre, Escape fecha e devolve foco ao acionador; FAQ abre com resposta correta; atividade muda de Alimentação para Sono por clique e para Movimento por Enter; rota inexistente apresenta recuperação; texto a 200% não causa overflow horizontal. O scroll suave foi removido após interferir na seleção durante a conferência de interações.

O menu usa o comportamento modal nativo do navegador. A navegação completa por leitor de tela e o percurso integral de Tab/Shift+Tab continuam pendentes de avaliação assistiva; a inspeção da árvore de acessibilidade não substitui esse aceite.

A composição desktop está registrada em `previa-desktop.jpg`. A bancada temporária pode ser reproduzida com `node scripts/qa-fixture.mjs` após o build, visitando `/qa.html`; o próximo build remove esses arquivos.

## Volume estático

Na medição anterior à normalização de espaços monetários (variação final inferior a 1 KB): recursos compartilhados de aproximadamente **63 KB**, inicial completa aproximadamente **74 KB**, página do curso aproximadamente **85 KB**, JavaScript em gzip aproximadamente **1,1 KB**. Os valores somam HTML, CSS, JS, três fontes locais e favicon, sem cabeçalhos HTTP. Não são uma medida de LCP, CLS ou velocidade real de rede.

## Não executado

Compras, cestas e entregas da Kiwify; expiração e liberações na área do aluno; atendimento dos canais; leitores de tela desktop/mobile; dispositivo físico; orientação de tela; zoom nativo a 400%; mediana de três testes de desempenho com CPU/rede controladas; comportamento da futura hospedagem e inventário dos seus logs/cookies. As minutas e qualificações não receberam validação jurídica/profissional nesta implementação.

Não foi executado deploy, não houve merge e nenhum dado de produção foi alterado.

## Atualização de checkouts e contatos — 08/11/2026

Após os novos dados fornecidos pelo usuário: build e 13 testes aprovados. Acrescentada validação do vínculo exato entre os cinco produtos, preços e URLs; conferida ausência das antigas instruções de upgrade no HTML de todas as páginas; verificados contatos públicos e localidade. FAQ, comparador, termos de compra e documentação passaram a refletir o checkout próprio do Completo. Nenhum pagamento ou atendimento externo foi testado. A revisão visual documentada acima corresponde à implementação anterior; esta atualização alterou conteúdo e destinos, sem mudar o layout.
