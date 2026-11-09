# DocLiv — integrações e testes funcionais

Relatório consolidado em 09/11/2026. Projeto `docsjr/wshop`, branch `docliv/multipaginas-revisao-20261108`. Versão de revisão; publicação não autorizada. Os testes de checkout desta fase foram iniciados em 08/11 e a revisão funcional foi concluída em 09/11.

## Resultado executivo

Integração do site concluída dentro do escopo autorizado. **16 testes automatizados passaram; zero falhas.** Verificação responsiva de **13 páginas × 12 larguras = 156 combinações**, sem transbordamento horizontal. Foram examinados os 658 links do HTML gerado e os 50 CTAs visuais. O inventário destes últimos está em `ctas-verificados.json`.

**Não está liberado para publicação.** Há uma pendência comercial observada na Kiwify: selecionar o Completo e o guia Hormônios simultaneamente soma R$ 409,80, embora esse guia já faça parte do Completo. O site informa que os três extras estão incluídos; a regra do carrinho precisa ser resolvida na plataforma. Nenhuma compra, cobrança, matrícula, mensagem, agendamento ou alteração administrativa na Kiwify foi executada.

## Integrações conferidas

| Oferta / ação | Destino real | Resultado observado |
|---|---|---|
| Base — R$ 279,90 | https://pay.kiwify.com.br/t5IY204 | Página carregou; com Brasil selecionado, valor à vista de R$ 279,90 disponível |
| Completo — total R$ 359,90 | Mesmo checkout do Base | Seleção manual opcional de R$ 80,00 elevou o total a R$ 359,90; ambos os CTAs do site chegaram a esse checkout |
| Emagrecimento com medicação — R$ 29,90 | https://pay.kiwify.com.br/TUtsETF | Página e opção de pagamento à vista conferidas; guia avulso |
| Hormônios e emagrecimento — R$ 49,90 | https://pay.kiwify.com.br/8PFFNL2 | Página e opção de pagamento à vista conferidas; guia avulso |
| Depois de emagrecer — R$ 29,90 | https://pay.kiwify.com.br/gFyI08R | Página e opção de pagamento à vista conferidas; guia avulso |
| Consultoria / acompanhamento / ajuda do curso | https://wa.me/5555999070106 com mensagem administrativa específica | Número e texto decodificado validados em todos os links; abertura do aplicativo bloqueada pelo navegador de testes |
| Contato direto | https://wa.me/5555999070106 | Endereço configurado corretamente; recepção e resposta não testadas |
| E-mail | mailto:arsandrodoc@gmail.com | Destino validado no HTML; não houve envio nem teste de recebimento |
| Instagram | https://www.instagram.com/dr.sandropj/ | Endereço fornecido preservado; disponibilidade externa não testada |
| Área do aluno / domínio | Ainda não fornecidos | Sem URL presumida nem botão fictício |

A última instrução comercial substitui a indicação anterior de um checkout independente do Completo. O endereço `pE5lrFM` permanece somente no registro de decisão, inativo; não aparece nos links renderizados. Não existe parâmetro de pré-seleção inventado, confirmação de compra por clique, callback de pagamento ou webhook.

O navegador da Kiwify iniciou com país Estados Unidos e valores em dólar. As conferências de preço desta fase usaram o seletor Brasil e a opção à vista do formulário; as parcelas são decididas pela plataforma. Não foi preenchido nenhum dado pessoal ou cartão, gerado Pix ou acionado “Pagar agora”. As opções foram desmarcadas após a conferência. A validação pública não comprova entrega ou permissões na área do aluno.

## Problemas corrigidos

1. Destino do Completo, comparador, FAQ e termos voltaram à estratégia Base + adicional opcional. Os cinco preços oficiais permanecem no cadastro central.
2. Orientação junto ao CTA esclarece a seleção manual e evita recomendar a recompra de extras incluídos.
3. O menu móvel passou a circular o foco explicitamente entre primeiro e último controle por Tab/Shift+Tab. Escape fecha e devolve foco ao acionador.
4. A FAQ passou a usar `details`/`summary` nativos. Antes, as respostas eram recolhidas após carregar JavaScript, causando um salto de layout observado de CLS 0,2743 na página de dúvidas. Depois da correção, o maior CLS observado nessa página nas três novas medições foi 0,0494. A FAQ abre por teclado e não depende de JavaScript.
5. Testes de regressão impedem checkout independente inadvertido, CTA associado ao produto errado, telefone ou mensagem divergentes e links ativos sem destino confirmado.

## Matriz de testes

| Requisito | Execução / evidência | Resultado / limite |
|---|---|---|
| Mobile e desktop | Chrome, iframes de 320, 360, 390, 599, 600, 767, 768, 1023, 1024, 1279, 1280 e 1440 px | 156 combinações sem overflow; `responsividade.json`; não equivale a aparelhos físicos |
| Navegação | Menu móvel → Consultoria, navegação desktop → preços, recuperação 404 → início | Destinos e conteúdo correspondentes |
| Links | HTML das 14 rotas + revisão; recursos locais e fragmentos | 658 ocorrências conferidas estruturalmente; nenhum destino interno ausente |
| CTAs | 50 CTAs inventariados; validação de produto/URL/mensagem e clique nos CTAs Base e Completo | Ambos os cursos chegam ao checkout principal; três avulsos preservados |
| FAQ | Enter abre a pergunta “Como escolho o Completo?” | Resposta correta; interação nativa também disponível sem JS |
| Atividades | Enter seleciona Movimento | Apenas a amostra correspondente fica visível; não coleta respostas |
| Menu / teclado | Abrir, Tab no último controle, Shift+Tab no primeiro, Escape | Foco circula; menu fecha; retorna ao botão Menu |
| Texto ampliado | Página do curso com tamanho raiz a 200% | Sem overflow; não é teste de zoom nativo a 400% |
| Estados de erro | Handler: 404 real, URL inválida, 405, HEAD; navegador: página inexistente e recuperação | Aprovados; indisponibilidade de terceiros permanece sob responsabilidade dos serviços |
| Formulários | Busca no HTML e bloqueio de submissões via CSP | Não aplicável ao site: nenhum formulário aprovado/adicionado; pagamento pertence à Kiwify |
| Mensuração | Busca de scripts, armazenamento e requisições nas páginas principais | Sem analytics/pixels autorizados, portanto não adicionados; não há evento “compra” simulado |
| Acessibilidade | Estrutura semântica, idioma, H1, nomes de controles, contraste calculado, foco e teclado | Verificações passaram; não constitui auditoria completa WCAG; leitores de tela e dispositivos reais pendentes |
| SEO | Título/descrição únicos, H1, idioma e Open Graph; IDs únicos | Estrutura presente; `noindex, nofollow` e robots restritivo mantidos; canonical e sitemap dependem do domínio final |
| Textos | Cadastro único, preços, contatos, validade e calendário testados; diff de conteúdo limitado à regra comercial | Sem novos serviços, preços assistenciais, formação ou promessas; 46 placeholders explicitamente pendentes |
| Segurança / publicação | CSP, HEAD, escape de conteúdo, links ausentes e bloqueio de produção | Aprovados no servidor de revisão; cabeçalhos precisam ser configurados na futura hospedagem |

A inspeção do console encontrou mensagens originadas da extensão do ambiente de testes; não são evidência de erro da aplicação. Não se declara ausência absoluta de erros de console em todas as sessões.

## Performance observada

Node.js 24.22.1, Chrome remoto, prévia interna. Três carregamentos por página principal, sem limitação artificial de CPU/rede e sem limpeza de cache entre execuções. Cópias temporárias instrumentadas com PerformanceObserver; leitura 1,2 segundo após `load`, sem rolagem nem interação. Não são Lighthouse, INP, dados de campo ou certificação de Core Web Vitals. A ferramenta não oferece um perfil de celular físico ou rede controlada.

| Página | Mediana LCP (ms) | Mediana CLS | Maior CLS nas 3 execuções |
|---|---:|---:|---:|
| Início | 72 | 0,0566 | 0,0566 |
| Método Regular | 64 | 0,0012 | 0,0492 |
| Consultoria | 64 | 0,0017 | 0,0017 |
| Acompanhamento | 60 | 0,0497 | 0,0497 |
| Sobre | 56 | 0,0491 | 0,0491 |
| Dúvidas | 68 | 0,0013 | 0,0494 |
| Contato | 68 | 0,0012 | 0,0492 |

Dados brutos: `performance-antes.json` e `performance-depois.json`. Nas medições posteriores, nenhuma requisição de recurso externo foi registrada. O código de QA existe apenas em cópias temporárias removidas pelo build; não mede visitantes, não transmite dados e não integra analytics.

Volume do build final: 71.814 bytes de recursos compartilhados; inicial + todos os recursos, 82.740 bytes; curso + todos os recursos, 93.241 bytes; JavaScript gzip, 1.102 bytes. Somatório conservador dos arquivos, sem cabeçalhos HTTP; não representa tráfego real medido.

## Pendências que impedem aceite final

- **K01, alta:** impedir ou resolver a seleção de Completo + extras incluídos na Kiwify. A combinação comprovada foi Completo + Hormônios: R$ 409,80. Os outros dois extras estão visíveis no mesmo checkout; suas combinações duplicadas não foram testadas. Não há correção administrativa aplicada.
- **K02:** compra aprovada, falha/recusa, Pix, cancelamento/reembolso, emissão de recibo, matrícula e entrega dos materiais. Exigem ambiente de teste oficial ou procedimento de compra autorizado, ainda não executado.
- **K03:** validar que Hormônios avulso entrega somente o guia correto; grupos/permissões, calendário, 365 dias e compra posterior de upgrade não podem ser inferidos da página pública.
- **C01:** abertura do WhatsApp no celular, recebimento/resposta dos canais e e-mail. O navegador bloqueou a transição para protocolo de aplicativo; nenhuma tentativa de contornar o bloqueio foi feita.
- **A01:** VoiceOver/TalkBack/NVDA, zoom nativo 400%, orientação e aparelho real; performance em rede/CPU controladas e na hospedagem final.
- **P01:** domínio, área do aluno, ativos autorizados, identificação e minutas, condições operacionais e demais bloqueios B01–B08 em `PENDENCIAS.md`.

## Reproduzir

```sh
npm run build
npm test
npm run dev
```

Sem dependências npm. Para a bancada temporária, após o build: `node scripts/qa-fixture.mjs` e abrir `/qa.html` ou `/qa-zoom.html`. Para métricas: `node scripts/qa-metrics.mjs`, abrir `/qa-perf/inicio/` e as seis outras rotas listadas no script; ler o output JSON no fim da página. O próximo `npm run build` remove toda a instrumentação.

Antes da entrega: executar `npm run build` e `npm test`. A opção `npm run check:release` deve recusar a liberação enquanto faltam dados e aprovação. Não há comando de deploy nesta fase. Configuração e aceite final: `PRE_PUBLICACAO.md`.
