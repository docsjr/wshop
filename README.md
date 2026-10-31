# DocLiv — Método Regular

Site estático responsivo em português. Abra `index.html` ou execute `node scripts/build.mjs` para gerar `dist/`.

## Conteúdo

Curso Base e Completo, comparação de materiais, três guias avulsos, perfil médico, Consultoria Completa, acompanhamento opcional de quatro meses e perguntas frequentes.

## Compras e contato

Os links específicos de checkout ainda precisam ser confirmados. Os cinco botões de produto usam **Solicitar compra** e abrem o WhatsApp da DocLiv com o produto identificado. Nunca reutilizar o checkout legado do e-book como se fosse checkout de outra oferta.

Preencher as cinco chaves de `assets/js/config.js` com os URLs HTTPS confirmados. O script troca o rótulo para compra direta apenas quando há um URL configurado. O conteúdo e os links de contato funcionam mesmo sem JavaScript.

Contato usado: (55) 99907-0106, com código de país +55; e-mail arsandrodoc@gmail.com.

Valores à vista: Base R$ 279,90; Completo R$ 359,90; Medicação R$ 29,90; Hormônios R$ 49,90; Depois de emagrecer R$ 29,90. Parcelamento conforme o checkout. Consultoria R$ 1.090,99 no Pix. Acompanhamento sob consulta, preservando a orientação de não divulgar o preço desse serviço.

Foto do Dr. Sandro reutilizada do repositório `docsjr/mrpage` (`img1.jpeg`) e otimizada em WebP. As representações dos materiais são ilustrações editoriais em CSS, identificadas na página.

## Verificações

`node --check assets/js/main.js`

`node --check assets/js/config.js`

`node scripts/build.mjs`

Os arquivos de origem na raiz continuam compatíveis com a hospedagem estática existente. `dist/` é gerado e não deve ser versionado. A publicação privada no Sites é independente da hospedagem original do GitHub.
