# 🍿 CinePlay OTT Engine

[![React Native](https://img.shields.io/badge/React_Native-0.73-blue.svg?logo=react)](https://reactnative.dev/)
[![Cross-Platform](https://img.shields.io/badge/Target-Android%20%7C%20iOS%20%7C%20Web%20%7C%20SmartTV-green.svg)](#)
[![Smart TVs](https://img.shields.io/badge/TV-Tizen%20%7C%20webOS%20%7C%20Roku%20%7C%20AppleTV-red.svg)](#)
[![Monetization](https://img.shields.io/badge/License-R%24%2050%2Fano-gold.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)

Motor multiplataforma de streaming OTT/IPTV de alto desempenho com interface cinematográfica inspirada na **Netflix**, suporte a controle remoto (D-Pad), pré-visualização automática de trailers e persistência de licença universal.

---

## 📺 Matriz de Compatibilidade de Dispositivos

| Ecossistema | Dispositivos Suportados | Tecnologia de Execução |
|---|---|---|
| **Mobile & Tablets** | Android (Smartphones & Tablets) / Apple iPhone & iPad | React Native (Expo Core) |
| **TVs Android** | Android TV, Google TV, Amazon Fire TV Stick | React Native TV (`react-native-tvos`) |
| **Apple TV** | Apple TV 4K / tvOS | React Native TV (`react-native-tvos`) |
| **Samsung Smart TV** | TVs Samsung 2018–2026 (Tizen OS) | Web SPA empacotada em `.wgt` |
| **LG Smart TV** | TVs LG OLED/NanoCell (webOS) | Web SPA empacotada em `.ipk` |
| **Roku TV** | Roku Express, Roku Premiere, AOC/TCL Roku TV | Canal SceneGraph / BrightScript |
| **Computadores** | Navegadores PC / Mac (Chrome, Edge, Safari, Firefox) | Progressive Web App (PWA) |

---

## 🛠️ Principais Recursos de Engenharia

* **Mecanismo Híbrido de Ingestão de Mídia:**
  * Conexão nativa com provedores **Xtream Codes API** (DNS/Host + Usuário + Senha).
  * Parser eficiente para listas **M3U / M3U8** com extração de categorias e logotipos.
* **Experiência do Usuário (Netflix-like):**
  * Vinheta de abertura animada com o acorde de áudio característico.
  * **Billboard Trailer:** Reprodução automática de vídeo e áudio em segundo plano com transição suave em degradê.
  * **Foco D-Pad para Smart TVs:** Efeito de zoom com borda vermelha ao navegar pelos pôsteres com o controle remoto.
* **Controle de Contas e Validade:**
  * Leitura e exibição em tempo real da data de expiração do plano fornecido pelo servidor IPTV.
* **Monetização Integrada:**
  * Módulo de verificação de licença do aplicativo com cobrança anual de **R$ 50,00/ano**.

---

## 📂 Arquitetura do Repositório

```text
├── src/
│   ├── components/         # NetflixBillboard, TVFocusableCard, Vinheta de Abertura
│   ├── services/           # IptvEngine (Xtream/M3U), SubscriptionService (R$ 50/ano)
│   └── types/              # Definições TypeScript
├── platforms/
│   ├── smart-tv/tizen/     # Manifesto e assets para Samsung Tizen
│   └── roku/               # Manifesto e canal para Roku OS
├── package.json            # Dependências e scripts multiplataforma
└── README.md               # Especificação e arquitetura técnica
```
## 🚀 Como Executar Localmente

1. Instalar dependências:
```text
npm install
```
2. Iniciar no navegador, celular ou emulador:
```text
npx expo start
```
3.Gerar build de produção para Smart TV / Mobile:
```text
# Android TV e Mobile (APK)
eas build -p android --profile preview

# Web / Smart TV
npm run build:web
```
