import "dotenv/config";
import { createPublicClient, http, erc20Abi, formatUnits } from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const USDC = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // Base Sepolia USDC
const me = privateKeyToAccount(process.env.EVM_PRIVATE_KEY).address;
const pc = createPublicClient({ chain: baseSepolia, transport: http() });
const bal = await pc.readContract({ address: USDC, abi: erc20Abi, functionName: "balanceOf", args: [me] });
console.log("Ajan adresi :", me);
console.log("USDC bakiye :", formatUnits(bal, 6));