import {Fluence} from "@fluencelabs/fluence"
import {krasnodar} from "@fluencelabs/fluence-network-environment"
import {get_balance, registerTools} from "./aqua/app"


async function main() {
    await Fluence.start({
        connectTo: krasnodar[8]
    })

    registerTools({
        select_best_result(balances: string[]) {
            if (balances.length < 2) return 'error: no consensus'
            let votes = new Map<string, number>()
            balances.forEach(b => {
                let count = votes.get(b) ?? 0
                count += 1
                votes.set(b, count)
            })
            let best = Array.from(votes).sort((a, b) => b[1] - a[1])
            if (best[0][1] == best[1][1]) return 'error: no consensus'
            return best[0][0]
        }
    })

    let balance = await get_balance("foo")
    console.log(balance)
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
