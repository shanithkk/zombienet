import { Port } from "kurtosis-sdk/build/core/kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { LaunchConfig } from "../../configTypes";

export function getKurtosisConfig(config: LaunchConfig) {
  let chain_type = "";
  let relay_chain_name = "";
  if (config.relaychain.chain.includes("local")) {
    chain_type = "local";
    relay_chain_name = "rococo";
  } else if (config.relaychain.chain.includes("testnet")) {
    chain_type = "testnet";
    relay_chain_name = "rococo";
  } else if (config.relaychain.chain.includes("mainnet")) {
    chain_type = "mainnet";
    relay_chain_name = "polkadot";
  }

  let nodes: any[] = [];
  let counter = 0;
  config.relaychain.nodes?.forEach(function (node) {
    let node_type;
    if (node.validator == true) {
      node_type = "validator";
    } else {
      node_type = "full";
    }

    let port = node.ws_port || 9944 + counter;

    const data = {
      name: node.name,
      "node-type": node_type,
      port: port,
      prometheus: true,
    };
    counter++;
    nodes.push(data);
  });

  let parachain;
  let parachains :any [] =[];
  for (let para of config.parachains) {
    let node: any[] = [];
    if (para.collator != undefined) {
      const data = {
        name: para.collator.name,
        "node-type": "collator",
        prometheus: true,
      };
      node.push(data);
    }

    if (para.collators != undefined) {
      for (let collators of para.collators) {
        const data = {
          name: collators.name,
          "node-type": "collator",
          prometheus: true,
        };
        node.push(data);
      }
    }
    parachain = {
      name: para.chain,
      nodes: node,
    };
    parachains.push(parachain)
  }

  let kurtosisConfig = {
    "chain-type": chain_type,
    relaychain: {
      name: relay_chain_name,
      nodes: nodes,
    },
    para: parachains,
  };

  return JSON.stringify(kurtosisConfig);
}
