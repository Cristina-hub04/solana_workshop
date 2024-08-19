import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  NftWithToken,
  toMetaplexFile,
  PublicKey,
} from "@metaplex-foundation/js";

import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";

import * as fs from "fs";

interface NftData {
  name: string;
  symbol: string;
  description: string;
  sellerFeeBasisPoints: number;
  imageFile: string;
}

// example data for a new NFT
const nftData = {
  name: "Solana Developer Program NFT",
  symbol: "SDP",
  description: "First Solana NFT for Devs in Romania",
  sellerFeeBasisPoints: 0,
  imageFile: "logo-comets.png",
};

// TODO: BONUS example data for updating an existing NFT
const updateNftData = {
  name: "Update",
  symbol: "UPDATE",
  description: "Update Description",
  sellerFeeBasisPoints: 100,
  imageFile: "success.png",
};

// helper function to upload image and metadata
async function uploadMetadata(
  metaplex: Metaplex,
  nftData: NftData,
): Promise<string> {
  console.log("🚀 Uploading metadata...");

  // TODO: load nftData.imageFile into buffer
  const buffer = fs.readFileSync("src/" + nftData.imageFile);

  // TODO: convert buffer to metaplex file
  const file = toMetaplexFile(buffer, nftData.imageFile);

  // TODO: upload image and get image uri
  const imageUri = await metaplex.storage().upload(file);
  console.log("image uri:", imageUri);

  // TODO: upload metadata and get metadata uri (off chain metadata)
  const { uri } = await metaplex.nfts().uploadMetadata({ 
    name: nftData.name,
    symbol: nftData.symbol,
    description: nftData.description,
    image: imageUri,
  });

  console.log("Done ✅! Metadata uri:", uri);

  return uri;
}

async function createNft(
  metaplex: Metaplex,
  uri: string,
  nftData: NftData,
): Promise<NftWithToken> {
  console.log("🚀 Creating NFT...");

  //TODO: Implement the createNft function
  const { nft } = await metaplex.nfts().create({
    name: nftData.name, 
    sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
    symbol: nftData.symbol, 
    uri,
  // }, {
  //   commitment: "confirmed"
  });

  const link = getExplorerLink("address", nft.address.toString(), "devnet");
  console.log(`✅ Token Mint: ${link}`);

  return nft;
}

// // [BONUS] TODO: Implement helper function update NFT
// async function updateNftUri(
//   metaplex: Metaplex,
//   uri: string,
//   mintAddress: PublicKey,
// ) {
//   console.log("🚀 Updating NFT URI...");
//   // TODO: fetch NFT data using mint address
//   const nft = ???;

//   // TODO: update the NFT metadata
//   const { respnose } = ???;

//   const link = getExplorerLink("address", nft.address.toString(), "devnet");
//   console.log(`✅ Token Mint: ${link}`);

//   console.log(
//     `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`,
//   );

//   const txLink = getExplorerLink("tx", response.signature, "devnet");
//   console.log(`✅ Transaction: ${txLink}`);
// }

async function main() {
  // create a new connection to the cluster's API
  const connection = new Connection(clusterApiUrl("devnet"));

  // initialize a keypair for the user
  const user = getKeypairFromEnvironment("SECRET_KEY");

  console.log(
    `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
  );

  // TODO: Setup metaplex
  // const metaplex = ???;
  const metaplex = new Metaplex(connection)
  .use(keypairIdentity(user))
  .use(
    bundlrStorage({
      address: "https://devnet.bundlr.network",
      providerUrl: "https://api.devnet.solana.com",
    })
  );


  // upload the NFT data and get the URI for the metadata
  const uri = await uploadMetadata(metaplex, nftData);

  // create an NFT using the helper function and the URI from the metadata
  const nft = await createNft(metaplex, uri, nftData);

  // BONUS: Update an existing NFT
  // 1. upload updated NFT data and get the new URI for the metadata
  const updatedUri = await uploadMetadata(metaplex, updateNftData);

  // 2. update the NFT using the helper function and the new URI from the metadata
//  await updateNftUri(metaplex, updatedUri, nft.address);
}

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
