import {FluencePeer} from '@fluencelabs/fluence'
import {krasnodar} from '@fluencelabs/fluence-network-environment'
import {registerHello} from "./aqua/hello"
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

        registerHello(peer, {
            greet() {
                return Promise.resolve('Hello world!')
            }
        })

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
