import {Fluence} from "@fluencelabs/fluence"
import {krasnodar} from "@fluencelabs/fluence-network-environment"
import {hello} from "./aqua/hello-request"
import {getKeyPair} from "./secret"


async function main() {
    await Fluence.start({
        connectTo: krasnodar[8]
    })
    let idx = parseInt(process.argv[2])
    let peer = (await getKeyPair(idx)).toB58String()
    console.log(peer)
    let greet = await hello(peer, krasnodar[8].peerId)
    console.log(greet)
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
