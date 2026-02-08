import console, { log } from "node:console";

enum Api {
  Wolf,
  Ross,
  Sirius,
  Sun,
}

type ChainConfiguration = {
  nodes: ChainNode[];
};

type ChainNode = {
  type: Api;
  dependencies: Api[];
};

function sortNodes(configuration: ChainConfiguration) {
  console.log("Before sort: ");
  printConfiguration(configuration.nodes);
  console.log("======================================");

  const nodeMap = new Map<Api, ChainNode>();
  configuration.nodes.forEach((node) => {
    nodeMap.set(node.type, node);
  });

  const dependenciesCountMap = new Map<Api, number>();
  configuration.nodes.forEach((node) => {
    dependenciesCountMap.set(node.type, node.dependencies.length);
  });

  const nodeConsumerMap = new Map<Api, Set<Api>>();
  configuration.nodes.forEach((node) => {
    node.dependencies.forEach((dep) => {
      const consumers = nodeConsumerMap.get(dep) ?? new Set();
      nodeConsumerMap.set(dep, consumers.add(node.type));
    });
  });

  const queue = new Array<ChainNode>();
  const sortedResult = new Array<ChainNode>();

  configuration.nodes.filter((n) => n.dependencies.length === 0).forEach((n) => queue.push(n));

  while (queue.length !== 0) {
    const currentNode = queue.shift()!;
    sortedResult.push(currentNode);

    nodeConsumerMap.get(currentNode.type)?.forEach((consumer) => {
      dependenciesCountMap.set(consumer, dependenciesCountMap.get(consumer)! - 1);
      if (dependenciesCountMap.get(consumer) === 0) {
        queue.push(nodeMap.get(consumer)!);
      }
    });
  }

  console.log("After sort: ");
  printConfiguration(sortedResult);
}

function printConfiguration(nodes: ChainNode[]) {
  const nodesNames = Array.from(nodes).map((n) => Api[n.type]);
  console.log(`Chain: ${nodesNames.join(" -> ")}`);
  nodes.forEach((node) => {
    const nodeName = Api[node.type];
    const dependencies = Array.from(node.dependencies).map((id) => Api[id]);
    console.log(`${nodeName}: [${dependencies.join(", ")}]`);
  });
}

sortNodes({
  nodes: [
    { type: Api.Ross, dependencies: [Api.Wolf, Api.Sirius] },
    { type: Api.Wolf, dependencies: [Api.Sirius] },
    { type: Api.Sirius, dependencies: [Api.Sun] },
    { type: Api.Sun, dependencies: [] },
  ],
});
