import React from "react";
import {
  BaseEdge,
} from 'reactflow';

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import { tw } from "twind";
import { shallow } from "zustand/shallow";
import  DefaultValue  from "./nodes/DefaultValue";
import Display from "./nodes/Display";
import Operand from "./nodes/Operand";
import { useStore } from "./store";

import "reactflow/dist/style.css";
import Operator from "./nodes/Operator";


const nodeTypes = {
  display: Display,
  operand: Operand,
  operator: Operator,
  DefaultValue: DefaultValue,
};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  addOperator: () => store.createNode("operator"),
  addOperand: () => store.createNode("operand"),
  addDisplay: () => store.createNode("display"),
  addDefaultValue: () => store.createNode("DefaultValue"),
});

export default function App() {
  const store = useStore(selector, shallow);
  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onNodesDelete={store.onNodesDelete}
          onEdgesChange={store.onEdgesChange}
          onEdgesDelete={store.onEdgesDelete}
          onConnect={store.addEdge}
          fitView
        >
          <Panel className={tw("space-x-4")} position="top-right">
            <button
              className={tw("px-2 py-1 rounded bg-white shadow")}
              onClick={store.addOperand}
            >
              Add Operand
            </button>
            <button
              className={tw("px-2 py-1 rounded bg-white shadow")}
              onClick={store.addOperator}
            >
              Add Operator
            </button>
            <button
              className={tw("px-2 py-1 rounded bg-white shadow")}
              onClick={store.addDisplay}
            >
              Add Input
            </button>
            <button
              className={tw("px-2 py-1 rounded bg-white shadow")}
              onClick={store.addDefaultValue}
            >
              Add Node
            </button>
          </Panel>
          <Background />
          <Controls />
          <MiniMap/>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
