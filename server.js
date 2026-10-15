// 2) Ücretli API: GET /premium-resource  ->  0,001 USDC
import "dotenv/config";
import express from "express";
import { paymentMiddleware, x402ResourceServer } from "@x402/express";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { HTTPFacilitatorClient } from "@x402/core/server";

// Base Sepolia (testnet) MianNet de ->  eip155:8453
const NETWORK = "eip155:84532"; 

// x402.org/facilitator Sadece TestNet desteği var, MainNet için -> "T54 (XRPL)" , "CDP" , "Circle" kullanılmalı
const facilitator = new HTTPFacilitatorClient({ url: "https://x402.org/facilitator" }); 

const app = express();
app.use(
  paymentMiddleware(
    {
      "GET /premium-resource": {
        accepts: [{ scheme: "exact", price: "$0.001", network: NETWORK, payTo: process.env.PAY_TO }],
        description: "premium service (demo)",
        mimeType: "application/json",
      },
    },
    new x402ResourceServer(facilitator).register(NETWORK, new ExactEvmScheme()),
  ),
);

app.get("/premium-resource", (req, res) => {
  res.json({ parite: "USD/TRY", deger: "test-data", zaman: new Date().toISOString() });
});

app.listen(4021, () => console.log("API hazır: http://localhost:4021/premium-resource  (fiyat: 0,001 USDC)"));
