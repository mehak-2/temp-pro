export const useStore = create((set, get) => ({
    nodes: [
      { id: "op1", type: "operand", data: { value: 4 }, nodrag: true, position: { x: 50, y: 50 } },
      { id: "op2", type: "DefaultValue", data: { value: 4 }, nodrag: true, position: { x: 300, y: 50 } },
      { id: "op3", type: "operator", data: { operator: "+" }, position: { x: 200, y: 150 } },
    ],
    edges: [
      { id: 'edge-1', source: 'op1', target: 'op3', animated: true, label: '1' },
      { id: 'edge-2', source: 'op2', target: 'op3', animated: true, label: '2' },
      { id: 'edge-3', source: 'op3', target: 'edge-1', animated: true, label: '0' },
      { id: 'edge-4', source: 'op3', target: 'edge-2', animated: true, label: '0' },
    ],
  
    getValue,
  
    onNodesChange(changes) {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
  
    createNode(type, x, y) {
      const id = nanoid();
      const data = { value: 0 };
      const position = { x, y }; // Use the provided x and y values
      createNode(id, type, data);
      set({ nodes: [...get().nodes, { id, type, data, position }] });
    },
  
    updateNode(id, data) {
      updateNode(id, data);
      set({
        nodes: get().nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, ...data } } // Use spread operator for data
            : node
        ),
      });
    },
  
    onNodesDelete(deleted) {
      for (const { id } of deleted) {
        removeNode(id);
      }
    },
  
    onEdgesChange(changes) {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
  
    addEdge(data) {
      const id = nanoid(6);
      const edge = { id, ...data };
  
      connect(edge.source, edge.target);
      edge.style = { stroke: 'grey', strokeWidth: 3, animated: true };
      set({ edges: [edge, ...get().edges] });
    },
  
    onEdgesDelete(deleted) {
      for (const { source, target } of deleted) {
        disconnect(source, target);
      }
    },
  }));
  