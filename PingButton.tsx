import { FC } from "react";
import styles from "../styles/PingButton.module.css";
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";


export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = async () => {
    if (!connection || !publicKey) {
      console.log("Not connected!");
      return;
    }

    const programId = new PublicKey(
      "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
    );
    const programDataAccount = new PublicKey(
      "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
    );

    const tx = new Transaction().add(
      new TransactionInstruction({
        keys: [{pubkey: programDataAccount, isSigner: false, isWritable: true}],
        programId: programId,
      })
    )

    const sig = await sendTransaction(tx, connection);

    console.log("Signature: ", sig);
  };

  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      <button className={styles.button}>Ping!</button>
    </div>
  );
};