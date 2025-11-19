# JP Fábrica de Salgados

Site institucional estático da JP Fábrica de Salgados. O projeto inclui a home e catálogos dedicados a esfihas, salgadinhos, pizzas, pratos árabes, pães e molhos, além dos estilos e scripts compartilhados.

## Como visualizar

1. Clone este repositório.
2. Abra o arquivo `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor HTTP estático.

## Estrutura

```
.
├── index.html          # Página inicial com destaques e formulário de contato
├── esfiha.html         # Vitrine dedicada às opções de esfihas
├── salgadinhos.html    # Vitrine dedicada aos salgadinhos
├── pizza.html          # Catálogo dedicado às mini pizzas artesanais
├── pratos-arabes.html  # Linha completa de kibes, esfihas e clássicos árabes
├── paes.html           # Catálogo dos pães artesanais doces e salgados
├── molhos.html         # Seleção de molhos e acompanhamentos
├── style/
│   └── style.css       # Folha de estilos principal
├── scripts/
│   └── main.js         # Lógica para abrir modal e enviar mensagens via WhatsApp
└── img/                # Biblioteca de imagens utilizadas nas páginas
```

Todos os botões de pedido direcionam para o WhatsApp configurado no arquivo `scripts/main.js`.

## Controle de cache

Para evitar que celulares e navegadores de desktop exibam versões antigas do site, cada página inclui cabeçalhos `meta` com diretivas de não armazenamento, define `data-asset-version` no elemento `<html>` e referencia `style/style.css` e `scripts/main.js` com o sufixo `?v=20240524bc`. Sempre que alterar os assets, incremente esse valor (por exemplo, `?v=20240525`) em **todas** as páginas HTML e no atributo `data-asset-version`. O script principal também elimina caches navegacionais ao abrir a página novamente, garantindo que o conteúdo atualizado apareça imediatamente.

## Compatibilidade

O layout utiliza breakpoints extras para telas ultralargas e celulares menores que 420 px, além de respeitar a preferência de “reduzir animações” do sistema. Assim, o carrossel, os cards de produtos e os blocos de contato permanecem legíveis em qualquer dispositivo, enquanto usuários sensíveis a movimento deixam de receber animações automáticas.

## Dimensões do carrossel principal

O carrossel de destaque da home utiliza altura controlada pela variável CSS `--hero-slide-height`, definida como `clamp(320px, 45vw, 480px)`. Em telas largas isso resulta em slides com aproximadamente 480 px de altura e cerca de 1 200 px de largura útil, pois o componente se estende um pouco além do contêiner de 1 140 px.

Para produzir imagens que preencham totalmente o espaço sem cortes perceptíveis (o carrossel aplica `object-fit: cover`), recomenda-se exportar as artes na proporção 5:2. Um tamanho seguro é **2 400 × 960 px**, garantindo margem para variações de viewport enquanto mantém o conteúdo central visível.
