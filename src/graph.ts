interface NodeInfo {
  type: string;
  value: number;
}

class Graph {
  nodes: {
    [id: string]: {
      type: string;
      value: number;
      sources: string[];
      targets: string[];
    };
  } = {};

  constructor() {
    this.nodes = {};
  }

  addNode(id: string, nodeInfo: NodeInfo) {
    if (!this.nodes[id]) {
      this.nodes[id] = {
        type: nodeInfo.type,
        value: nodeInfo.value,
        sources: [],
        targets: [],
      };
    } else {
      console.log("Node with ID " + id + " already exists.");
    }
  }

  updateNode(id: string, nodeInfo: NodeInfo) {
    if (this.nodes[id]) {
      let oldValue = this.nodes[id].value;
      this.nodes[id].type = nodeInfo.type;
      this.nodes[id].value = nodeInfo.value;
      console.log(
        "Updated node " +
          id +
          " with type: " +
          nodeInfo.type +
          " and value: " +
          nodeInfo.value +
          "."
      );
      if (oldValue !== nodeInfo.value) {
        for (let targetId of this.nodes[id].targets) {
          this.recalculateNodeValue(targetId);
        }
      }
    } else {
      console.log("Node with ID " + id + " does not exist.");
    }
  }

  connect(sourceId: string, targetId: string) {
    if (this.nodes[sourceId] && this.nodes[targetId]) {
      this.nodes[targetId].sources.push(sourceId);
      this.nodes[sourceId].targets.push(targetId);
      console.log("Connected node " + sourceId + " to node " + targetId + ".");
      this.recalculateNodeValue(targetId);
    } else {
      console.log("One or both of the nodes do not exist.");
    }
  }

  disconnect(sourceId: string, targetId: string) {
    if (this.nodes[sourceId] && this.nodes[targetId]) {
      let index = this.nodes[targetId].sources.indexOf(sourceId);
      if (index !== -1) {
        this.nodes[targetId].sources.splice(index, 1);
      }
      index = this.nodes[sourceId].targets.indexOf(targetId);
      if (index !== -1) {
        this.nodes[sourceId].targets.splice(index, 1);
      }
      console.log(
        "Disconnected node " + sourceId + " from node " + targetId + "."
      );
      this.recalculateNodeValue(targetId);
    } else {
      console.log("One or both of the nodes do not exist.");
    }
  }

  removeNode(nodeId: string) {
    if (this.nodes[nodeId]) {
      for (let sourceId of this.nodes[nodeId].sources) {
        let index = this.nodes[sourceId].targets.indexOf(nodeId);
        if (index !== -1) {
          this.nodes[sourceId].targets.splice(index, 1);
        }
      }
      for (let targetId of this.nodes[nodeId].targets) {
        let index = this.nodes[targetId].sources.indexOf(nodeId);
        if (index !== -1) {
          this.nodes[targetId].sources.splice(index, 1);
        }
      }
      delete this.nodes[nodeId];
      console.log("Removed node " + nodeId + ".");
    } else {
      console.log("Node with ID " + nodeId + " does not exist.");
    }
  }

  getValue(nodeId: string) {
    if (this.nodes[nodeId]) {
      return this.nodes[nodeId].value;
    } else {
      console.log("Node with ID " + nodeId + " does not exist.");
      return null;
    }
  }

  recalculateNodeValue(nodeId: string) {
    let node = this.nodes[nodeId];
    if (node.type === "operator") {
      let newValue = 0;
      for (let sourceId of node.sources) {
        newValue += this.nodes[sourceId].value;
      }
      if (newValue !== node.value) {
        node.value = newValue;
        console.log(
          "Node " + nodeId + " value recalculated to " + "."
        );
        for (let targetId of node.targets) {
          this.recalculateNodeValue(targetId);
        }
      }
    }
  }
}

const graph = new Graph();

const nodes = new Map<string, any>();

export function getValue(id: string) {
  return graph.getValue(id);
}

export function createNode(id: string, type: string, data: { value: number }) {
  switch (type) {
    case "operand": {
      const dataInfo: NodeInfo = { type, value: data.value };
      graph.addNode(id, dataInfo);
      break;
    }
    case "operator": {
      const dataInfo: NodeInfo = { type, value: data.value };
      graph.addNode(id, dataInfo);
      break;
    }
    case "display": {
      const dataInfo: NodeInfo = { type, value: data.value };
      graph.addNode(id, dataInfo);
      break;
    }
    case "Default": {
      const dataInfo: NodeInfo = { type, value: 2}; 
      graph.addNode(id, dataInfo);
      break;
    }
    default:
      console.log("Unsupported node type:", type);
  }
}

export function updateNode(id: string, data: { value: number }) {
  const oldData: NodeInfo = graph.getValue(id);
  const dataInfo: NodeInfo = { ...oldData, value: data.value };
  graph.updateNode(id, dataInfo);
  console.log("graph", graph);
}

export function removeNode(id: string) {
  graph.removeNode(id);
  console.log("graph", graph);
}

export function connect(sourceId: string, targetId: string) {
  graph.connect(sourceId, targetId);
  console.log("graph", graph);
}

export function disconnect(sourceId: string, targetId: string) {
  graph.disconnect(sourceId, targetId);
  console.log("graph", graph);
}
