# JP Fábrica de Salgados

Site institucional estático da JP Fábrica de Salgados. O projeto inclui as páginas principais (home, linha de esfihas e salgadinhos), estilos e assets utilizados no site.

## Como visualizar

1. Clone este repositório.
2. Abra o arquivo `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor HTTP estático.

## Estrutura

```
.
├── index.html          # Página inicial com destaques e formulário de contato
├── esfiha.html         # Vitrine dedicada às opções de esfihas
├── salgadinhos.html    # Vitrine dedicada aos salgadinhos
├── style/
│   └── style.css       # Folha de estilos principal
├── scripts/
│   └── main.js         # Lógica para abrir modal e enviar mensagens via WhatsApp
└── img/                # Biblioteca de imagens utilizadas nas páginas
```

Todos os botões de pedido direcionam para o WhatsApp configurado no arquivo `scripts/main.js`.

## Controle de cache

Para evitar que celulares e navegadores de desktop exibam versões antigas do site, cada página inclui cabeçalhos `meta` com diretivas de não armazenamento e referencia os arquivos `style/style.css` e `scripts/main.js` com o sufixo de versão `?v=20240520`. Ao atualizar os assets, incremente esse valor (por exemplo, `?v=20240521`) em todas as páginas HTML para forçar um novo download dos arquivos.

## Dimensões do carrossel principal

O carrossel de destaque da home utiliza altura controlada pela variável CSS `--hero-slide-height`, definida como `clamp(320px, 45vw, 480px)`. Em telas largas isso resulta em slides com aproximadamente 480 px de altura e cerca de 1 200 px de largura útil, pois o componente se estende um pouco além do contêiner de 1 140 px.

Para produzir imagens que preencham totalmente o espaço sem cortes perceptíveis (o carrossel aplica `object-fit: cover`), recomenda-se exportar as artes na proporção 5:2. Um tamanho seguro é **2 400 × 960 px**, garantindo margem para variações de viewport enquanto mantém o conteúdo central visível.
