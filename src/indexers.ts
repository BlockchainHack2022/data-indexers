import {FluencePeer} from '@fluencelabs/fluence'
import {krasnodar} from '@fluencelabs/fluence-network-environment'
import assert from "assert"
import {advertiseMyselfAsIndexer, initIndexerTopic, registerIndexer} from "./aqua/app"
import {getKeyPair, SECRETS} from "./secret"
const relay = krasnodar[8]


async function main() {
    for (let i = 0; i < SECRETS.length; i++) {
        let peer = new FluencePeer()
        let keys = await getKeyPair(i)

        await peer.start({
            KeyPair: keys,
            connectTo: relay
        })

        if (i == 0) {
            let initStatus = await initIndexerTopic(peer)
            assert(initStatus == 'ok')
        }

        registerIndexer(peer, {
            get_balance(account: string) {
                return '10'
            }
        })

        await advertiseMyselfAsIndexer(peer)

        console.log('started: ' + peer.getStatus().peerId)
    }

    await new Promise(() => {})
}


main().then(
    () => {
        process.exit(0)
    },
    (err: any) => {
        console.error(err)
        process.exit(1)
    }
)
