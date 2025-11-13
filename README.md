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
