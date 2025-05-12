# Puppeteer com TypeScript

Este projeto demonstra como usar o [Puppeteer](https://pptr.dev/) com TypeScript para automação de navegação no navegador.

## 🛠️ Requisitos

- Node.js (>= 16)
- yarn

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
yarn install
````

## ▶️ Como executar

### 1. Rodar diretamente com ts-node (modo desenvolvimento)

```bash
npx ts-node src/index.ts
```

### 2. Ou compilar e executar

```bash
npx tsc
node dist/index.js
```

## 📁 Estrutura

```
.
├── src/
│   └── index.ts        # Código principal Puppeteer
├── dist/               # Código compilado (gerado após build)
├── tsconfig.json       # Configuração do TypeScript
├── package.json
└── README.md
```

## 📸 O que ele faz?

Este script acessa o site `https://example.com` e salva um screenshot como `screenshot.png` na raiz do projeto.

## 🧼 Limpar build

```bash
rm -rf dist
```