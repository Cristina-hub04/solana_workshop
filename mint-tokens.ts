import {
    getExplorerLink,
    getExplorerlink,
    getKeypairFromEnvironment,
  } from "@solana-developers/helpers";
  import {getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
  import {Connection, PublicKey } from "@solana/web3.js";
  import "dotenv/config";
  const connection = new Connection("https://api.devnet.solana.com", "confirmed"); 
  const user getKeypairFromEnvironment ("SECRET_KEY");
  console.log(
  );
  ' Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey}'
  const RECIPIENT_ADDRESS = "AjSSsj FAWhxEHgJRQom65Rnf55YoKRZmVixGVk5F44Ee";
   const TOKEN_MINT_ADDRESS = "Do8mt faMjpUExZZw5Y2wK4Dkb35Vnd8XrMJ r9Uo6ddwb"; 
   const recipient = new PublicKey (RECIPIENT_ADDRESS);
  const tokenMintAccount = new PublicKey (TOKEN_MINT_ADDRESS);
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount, recipient,
  );
  console.log(' Created token Account: ${tokenAccount.address.toBase58()}');
