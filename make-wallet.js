// 1) Test cüzdanı üretir. SADECE TESTNET İÇİN. Gerçek para koyma.
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { writeFileSync, existsSync } from "node:fs";

if (existsSync(".env")) {
  console.log(".env zaten var, üzerine yazmıyorum.");
  process.exit(0);
}
const buyerKey = generatePrivateKey();
const buyer = privateKeyToAccount(buyerKey);
const seller = privateKeyToAccount(generatePrivateKey());

writeFileSync(".env", `EVM_PRIVATE_KEY=${buyerKey}\nPAY_TO=${seller.address}\n`);
console.log("Alıcı (ajan) adresi  :", buyer.address, " <-- faucet'e bunu yapıştır");
console.log("Satıcı (API) adresi  :", seller.address);
console.log(".env dosyası oluşturuldu. Ekranda GÖSTERME.");
