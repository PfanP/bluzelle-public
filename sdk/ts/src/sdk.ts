import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {queryClient, txClient} from "./generated/bluzelle/curium/bluzelle.curium.storage/module";

export interface BluzelleConfig {
    url: string
    mnemonic: string
}

export interface BluzelleWallet {
    hdWallet: DirectSecp256k1HdWallet;
    address: string;
    config: BluzelleConfig;
}

export const bluzelleWallet = (config: BluzelleConfig): Promise<BluzelleWallet> =>
    DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, {prefix: 'bluzelle'})
        .then(hdWallet =>
            hdWallet.getAccounts()
                .then(accounts => ({
                    hdWallet,
                    address: accounts[0].address,
                    config
                }))
        )

export const storageClient = (wallet: BluzelleWallet) =>
    Promise.all([
        txClient(wallet.hdWallet, {addr: wallet.config.url}),
        queryClient({addr: wallet.config.url})
    ])
        .then(([tx, q]) =>
            ({
                wallet,
                tx,
                q
            })
        );


