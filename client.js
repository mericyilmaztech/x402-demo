// 3) Ajan: önce ödemesiz dener (402), sonra öder (200)
import "dotenv/config";
import { x402Client } from "@x402/core/client";
import { wrapFetchWithPayment, decodePaymentResponseHeader } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";

const URL = "http://localhost:4021/premium-resource";
const signer = privateKeyToAccount(process.env.EVM_PRIVATE_KEY);
const client = new x402Client();
registerExactEvmScheme(client, { signer });
const fetchWithPayment = wrapFetchWithPayment(fetch, client);

console.log("\n🤖 Ajan:", signer.address);

const r1 = await fetch(URL);
console.log(`\n1) Ödemesiz istek  →  ${r1.status} ${r1.statusText}`);

const r2 = await fetchWithPayment(URL);
console.log(`\n2) Ödemeli istek   →  ${r2.status} ${r2.statusText}`);
console.log("   Veri:", await r2.json());

const header = r2.headers.get("PAYMENT-RESPONSE");
if (header) {
  try {
    const receipt = decodePaymentResponseHeader(header);
    console.log("\n🧾 Makbuz:", receipt);
    if (receipt.transaction) console.log(`\n🔗 https://sepolia.basescan.org/tx/${receipt.transaction}\n`);
  } catch {
    console.log("\n🧾 Makbuz (ham):", header);
  }
}
