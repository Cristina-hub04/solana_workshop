import "dotenv/config"
import {
    Connection, 
    LAMPORTS_PER_SOL, 
    PublicKey,
    clusterApiUrl
} from "@solana/web3.js";
import {
    airdropIfRequired,
    getKeypairFromEnvironment
} from "@solana-developers/helpers"
import bs58 from "bs58";
 //const connection = new Connection(clusterApiUrl(cluster: "devnet"), commitmentOrConfig: "confirmed");
 const connection = new Connection(clusterApiUrl("devnet"));
 console.log("Connected to devnet");
 console.log("devnet URL: ", connection.rpcEndpoint);
 const keyFromEnv = getKeypairFromEnvironment("SECRET_KEY");
 const newKey = bs58.encode(keyFromEnv.secretKey);
 console.log(`newKey: ${newKey}`);
 const keyToCheck = keyFromEnv.publicKey.toBase58();
 const publicKey = new PublicKey(keyToCheck);
//  const andreiWolf = "E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS";
//  const publicKey = new PublicKey(andreiWolf);
//  await airdropIfRequired(
//     connection,
//     publicKey,
//     2 * LAMPORTS_PER_SOL,
//     0.5 * LAMPORTS_PER_SOL,
//  );a
 const balanceInLamport = await connection.getBalance(publicKey);
 const balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;
 console.log(`balance for wallet ${publicKey} is ${balanceInSol} SOL`);
