import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import {createMemoInstruction} from "@solana/spl-memo";
const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(sender.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const receiver = new PublicKey("GrLFLYpS96pfGTdyEn6HbPLupsJTZgD4cqs4sGGKVQg");

const balance = await connection.getBalance(receiver);

console.log(`Andrei balance ${balance / LAMPORTS_PER_SOL} SOL`);

const transaction = new Transaction();

const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: 0.1 * LAMPORTS_PER_SOL,
});

transaction.add(transferInstruction);
const memo = "Hai  Romania!";
const memoInstruction = createMemoInstruction(memo);
transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    sender,
]);

console.log(`Transaction confirmed. Signature: ${signature}`);
