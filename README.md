# x402 Testnet Demo (Windows PowerShell)

Gerçek para YOK. Base Sepolia test ağı kullanılır.

## Kurulum (bir kez)

1. Node.js 20+ kurulu olmalı: `node -v`
2. Bu klasörde: `npm install`
3. Test cüzdanı üret: `node make-wallet.js`
4. Çıkan **Alıcı (ajan) adresi**ni https://faucet.circle.com adresine yapıştır,
   ağ olarak **Base Sepolia** seç, test USDC al.

## Çalıştırma (kayıt için)

- Terminal 1: `node server.js`
- Terminal 2: `node client.js`

## Ekranda göreceğin sıra:

1. `402 Payment Required` (ödemesiz istek)
2. `200 OK` + veri (ödemeli istek)
3. Makbuz + basescan linki (işlemi zincirde göster)

## Uyarılar

- `.env` dosyasını ASLA ekranda gösterme, kimseyle paylaşma.
- Bu anahtarlara gerçek para gönderme.
