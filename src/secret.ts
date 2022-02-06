import {KeyPair} from "@fluencelabs/fluence"
import assert from "assert"


export const SECRETS = [
    'RqCKd9EWsaSuv+wSghEZTUVJu7Hi+VQuTVN0Y/LF9wo=',
    'rmOOQC1arHDPBGB0I/lWg4xoYXY0Lrzpnyg81YpJgAA=',
    'SqHJjxb+QA2+WJh8dDaYBfLuwSv2TsiYMcqfbCSnKwc=',
    'h2XIgPF/dWnWiECo6KJUOGPD+wltrXrsFWc/BAIwAQA='
]


export function getKeyPair(i: number): Promise<KeyPair> {
    assert(i >= 0 && SECRETS.length > i)
    let buf = Buffer.from(SECRETS[i], 'base64')
    return KeyPair.fromEd25519SK(buf)
}
