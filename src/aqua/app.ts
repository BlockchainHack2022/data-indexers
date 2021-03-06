/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.0-263
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface IndexerDef {
    get_balance: (account: string, callParams: CallParams<'account'>) => string | Promise<string>;
}
export function registerIndexer(service: IndexerDef): void;
export function registerIndexer(serviceId: string, service: IndexerDef): void;
export function registerIndexer(peer: FluencePeer, service: IndexerDef): void;
export function registerIndexer(peer: FluencePeer, serviceId: string, service: IndexerDef): void;
       

export function registerIndexer(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "indexer",
    "functions" : [
        {
            "functionName" : "get_balance",
            "argDefs" : [
                {
                    "name" : "account",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      


export interface ToolsDef {
    select_best_result: (balances: string[], callParams: CallParams<'balances'>) => string | Promise<string>;
}
export function registerTools(service: ToolsDef): void;
export function registerTools(serviceId: string, service: ToolsDef): void;
export function registerTools(peer: FluencePeer, service: ToolsDef): void;
export function registerTools(peer: FluencePeer, serviceId: string, service: ToolsDef): void;
       

export function registerTools(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "tools",
    "functions" : [
        {
            "functionName" : "select_best_result",
            "argDefs" : [
                {
                    "name" : "balances",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      
// Functions
 

export function advertiseMyselfAsIndexer(
    config?: {ttl?: number}
): Promise<void>;

export function advertiseMyselfAsIndexer(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<void>;

export function advertiseMyselfAsIndexer(...args: any) {

    let script = `
                    (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (new $relay_id
                       (seq
                        (ap -relay- $relay_id)
                        (xor
                         (seq
                          (seq
                           (call -relay- ("op" "string_to_b58") ["-indexer-"] k)
                           (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                          )
                          (par
                           (fold nodes n
                            (par
                             (xor
                              (xor
                               (seq
                                (seq
                                 (call n ("peer" "timestamp_sec") [] t)
                                 (call n ("aqua-dht" "put_value") ["-indexer-" "foo" t $relay_id [] 0])
                                )
                                (call -relay- ("op" "noop") [])
                               )
                               (null)
                              )
                              (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                             )
                             (next n)
                            )
                           )
                           (null)
                          )
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                        )
                       )
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "advertiseMyselfAsIndexer",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function initIndexerTopic(
    config?: {ttl?: number}
): Promise<string>;

export function initIndexerTopic(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string>;

export function initIndexerTopic(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (new $status
                        (seq
                         (xor
                          (seq
                           (seq
                            (call -relay- ("op" "string_to_b58") ["-indexer-"] k)
                            (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                           )
                           (par
                            (fold nodes n
                             (par
                              (seq
                               (xor
                                (xor
                                 (seq
                                  (seq
                                   (seq
                                    (call n ("peer" "timestamp_sec") [] t)
                                    (call n ("aqua-dht" "register_key") ["-indexer-" t false 0])
                                   )
                                   (ap "ok" $status)
                                  )
                                  (call -relay- ("op" "noop") [])
                                 )
                                 (null)
                                )
                                (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                               )
                               (call %init_peer_id% ("op" "noop") [])
                              )
                              (next n)
                             )
                            )
                            (null)
                           )
                          )
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                         )
                         (call %init_peer_id% ("op" "identity") [$status.$.[0]!] status-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [status-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "initIndexerTopic",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function get_indexers(
    config?: {ttl?: number}
): Promise<{ peer_id: string; relay_id: string[]; service_id: string[]; set_by: string; timestamp_created: number; value: string; weight: number; }[]>;

export function get_indexers(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<{ peer_id: string; relay_id: string[]; service_id: string[]; set_by: string; timestamp_created: number; value: string; weight: number; }[]>;

export function get_indexers(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (new $res
                        (xor
                         (seq
                          (seq
                           (seq
                            (call -relay- ("op" "string_to_b58") ["-indexer-"] k)
                            (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                           )
                           (par
                            (fold nodes n
                             (par
                              (seq
                               (xor
                                (xor
                                 (seq
                                  (call n ("peer" "timestamp_sec") [] t)
                                  (call n ("aqua-dht" "get_values") ["-indexer-" t] $res)
                                 )
                                 (null)
                                )
                                (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                               )
                               (call -relay- ("op" "noop") [])
                              )
                              (next n)
                             )
                            )
                            (null)
                           )
                          )
                          (call -relay- ("aqua-dht" "merge_two") [$res.$.[0].result! $res.$.[1].result!] v)
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [v.$.result!])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_indexers",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function get_balance_from_peer(
    account: string,
    peer_: string,
    relay: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_balance_from_peer(
    peer: FluencePeer,
    account: string,
    peer_: string,
    relay: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_balance_from_peer(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                            (call %init_peer_id% ("getDataSrv" "account") [] account)
                           )
                           (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                          )
                          (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (call relay ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (seq
                          (call peer ("indexer" "get_balance") [account] res)
                          (call relay ("op" "noop") [])
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (seq
                          (call relay ("op" "noop") [])
                          (call -relay- ("op" "noop") [])
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_balance_from_peer",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "account",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "peer",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relay",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function get_balance(
    account: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_balance(
    peer: FluencePeer,
    account: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_balance(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "account") [] account)
                       )
                       (new $res
                        (seq
                         (new $results
                          (par
                           (par
                            (par
                             (seq
                              (seq
                               (call -relay- ("op" "noop") [])
                               (xor
                                (seq
                                 (new $res-0
                                  (xor
                                   (seq
                                    (seq
                                     (seq
                                      (call -relay- ("op" "string_to_b58") ["-indexer-"] k)
                                      (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                                     )
                                     (par
                                      (fold nodes n
                                       (par
                                        (seq
                                         (xor
                                          (xor
                                           (seq
                                            (call n ("peer" "timestamp_sec") [] t)
                                            (call n ("aqua-dht" "get_values") ["-indexer-" t] $res-0)
                                           )
                                           (null)
                                          )
                                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                                         )
                                         (call -relay- ("op" "noop") [])
                                        )
                                        (next n)
                                       )
                                      )
                                      (null)
                                     )
                                    )
                                    (call -relay- ("aqua-dht" "merge_two") [$res-0.$.[0].result! $res-0.$.[1].result!] v)
                                   )
                                   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                                  )
                                 )
                                 (par
                                  (fold v.$.result! sub
                                   (par
                                    (seq
                                     (seq
                                      (fold sub.$.relay_id! -via-peer-
                                       (seq
                                        (call -via-peer- ("op" "noop") [])
                                        (next -via-peer-)
                                       )
                                      )
                                      (xor
                                       (xor
                                        (seq
                                         (seq
                                          (call sub.$.peer_id! ("indexer" "get_balance") [account] $results)
                                          (fold sub.$.relay_id! -via-peer-
                                           (seq
                                            (next -via-peer-)
                                            (call -via-peer- ("op" "noop") [])
                                           )
                                          )
                                         )
                                         (call -relay- ("op" "noop") [])
                                        )
                                        (null)
                                       )
                                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                                      )
                                     )
                                     (call %init_peer_id% ("op" "noop") [])
                                    )
                                    (next sub)
                                   )
                                  )
                                  (null)
                                 )
                                )
                                (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                               )
                              )
                              (call %init_peer_id% ("op" "noop") [])
                             )
                             (call %init_peer_id% ("op" "noop") [$results.$.[3]!])
                            )
                            (call %init_peer_id% ("tools" "select_best_result") [$results] $res)
                           )
                           (call %init_peer_id% ("peer" "timeout") [5000 "error: timeout"] $res)
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$res.$.[0]!] res-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 6])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_balance",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "account",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}
