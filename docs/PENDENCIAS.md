# Pendências de integração e liberação

A interface está implementada para revisão. Não houve compra, matrícula, envio de mensagem, agendamento, alteração da Kiwify ou publicação. Os cinco preços à vista, os cinco links de compra (incluindo o exclusivo do Completo) e os contatos públicos foram confirmados pelo usuário em 08/11/2026. Essa confirmação não substitui testes de pagamento, entrega, parcelamento ou resposta dos canais.

| Bloqueio | Confirmação necessária |
|---|---|
| B01 — Checkout | Testar a correspondência dos cinco produtos/preços confirmados, pagamentos, parcelamento e adicionais eventualmente presentes nos checkouts próprios; não orientar upgrade de R$ 80 no site |
| B02 — Entrega | Arquivos finais, acessibilidade dos vídeos/PDFs, permissões Base/Completo/avulsos, marcos 0/3/6/7 dias, expiração em 365 dias e compras sucessivas |
| B03 — Consultoria | Preço vigente, profissionais, dias corridos/úteis, marco de entrega, retorno, suporte, agenda, regras contratuais e teleconsulta |
| B04 — Acompanhamento | Avaliação de entrada, investimento, início/fim, agenda, feriados e condições contratuais |
| B05 — Identidade | Identificação do fornecedor, documento, endereço completo, registros dos demais profissionais e credenciais divulgáveis. Dr. Sandro Pereira — CRM-RS 61741 e Cândido Godói — RS confirmados pelo usuário |
| B06 — Minutas | Revisão e aprovação dos termos, cancelamento, reembolso e condições assistenciais |
| B07 — Privacidade | Inventário real de dados e fornecedores, logs, retenção, controlador, canal e procedimentos de direitos |
| B08 — Infraestrutura | Domínio final, URL da área do aluno, horários administrativos, testes dos canais, ativos autorizados e QA de dispositivos reais |

Os dados não recebidos aparecem como “A confirmar” somente na versão identificada de revisão. Não transformar essas páginas em conteúdo público por simples remoção do aviso. Fonte única: `src/content.json`. Campos de liberação exigem evidência e aprovação; não preencher com valores presumidos.

A URL do login e o domínio estão representados por `null` no cadastro. A interface não oferece botão ativo para destino ausente. O CTA “Conversar com a DocLiv” removido anteriormente não foi recuperado.

## Limites técnicos de aceite

Antes de autorizar uma versão pública, concluir testes ponta a ponta da Kiwify, uso em aparelho móvel, leitores de tela desktop e mobile, zoom real a 400%, orientação de tela, redução de movimento e três medições de desempenho por página principal com rede/CPU controladas. A conferência de HTML/contraste e a bancada de larguras não equivalem a certificação WCAG nem medição de Core Web Vitals.

A resposta 404 e os cabeçalhos funcionam no servidor de revisão. Na futura hospedagem devem ser configurados e verificados novamente; GitHub Pages não interpreta automaticamente o arquivo `_headers`. Não há integração de backend a implementar nesta V1: pagamento, acesso ao curso e atendimento permanecem nos canais externos aprovados.

## Campos pendentes no conteúdo

- `CANAL_ASSISTENCIAL_VALIDADO`
- `CANAL_DE_ARREPENDIMENTO_NA_PLATAFORMA`
- `CANAL_PRIVACIDADE`
- `CONTROLADOR_NOME_DOCUMENTO_ENDERECO`
- `CONTROLES_COMPATIVEIS_COM_A_CONFIGURACAO`
- `DATA_CANCELAMENTOS`
- `DATA_COOKIES`
- `DATA_PRIVACIDADE`
- `DATA_TERMOS_COMPRA`
- `DATA_TERMOS_USO`
- `DESCRICAO_RESULTADO_INSPECAO_TECNICA`
- `DOCUMENTO_FORNECEDOR`
- `ENDERECO_FORNECEDOR`
- `HORARIOS_ADMINISTRATIVOS`
- `IDENTIFICACAO_ENCARREGADO_QUANDO_APLICAVEL`
- `IDENTIFICACAO_FORNECEDOR`
- `INFORMACAO_TRANSFERENCIAS_VALIDADA`
- `JANELA_SUPORTE_CONSULTORIA`
- `MARCO_ENTREGA_PLANOS`
- `MARCO_INICIAL_ACOMPANHAMENTO`
- `MEDIDAS_REAIS_PUBLICAVEIS`
- `NOME_EDUCACAO_FISICA`
- `NOME_NUTRICIONISTA`
- `ORIENTACAO_SOLICITACAO_DIREITOS`
- `PLATAFORMA_TELECONSULTA`
- `PRAZO_RESPOSTA_ADMINISTRATIVA`
- `PRAZO_RESPOSTA_CONSULTORIA`
- `PROCEDIMENTO_FALHA_TELECONSULTA`
- `PROCEDIMENTO_REEMBOLSO_VALIDADO`
- `REGISTRO_EDUCACAO_FISICA`
- `REGISTRO_NUTRICIONISTA`
- `REGRAS_ASSISTENCIAIS_APROVADAS`
- `REGRAS_DOWNLOAD_IMPRESSAO_USO`
- `REGRA_ELIMINACAO_OU_CONSERVACAO_VALIDADA`
- `REGRA_FIM_ACOMPANHAMENTO`
- `REQUISITOS_REAIS_AREA_ALUNO`
- `TABELA_INVENTARIO_PUBLICO_DE_DADOS_VALIDADA`
- `TABELA_REAL_COOKIES_E_ARMAZENAMENTO`
- `TIPO_DE_DIAS_ENTREGA`
- `TIPO_DE_DIAS_RETORNO`
- `TIPO_DE_DIAS_SUPORTE`
- `VERSAO_CANCELAMENTOS`
- `VERSAO_COOKIES`
- `VERSAO_PRIVACIDADE`
- `VERSAO_TERMOS_COMPRA`
- `VERSAO_TERMOS_USO`
