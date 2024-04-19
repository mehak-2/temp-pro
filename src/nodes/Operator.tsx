import React, { useCallback } from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";
import { tw } from "twind";
import { shallow } from "zustand/shallow";

interface OperatorProps {
  id: string;
  data: { operator: string };
}

const Operator: React.FC<OperatorProps> = ({ id, data }) => {
  const { setOperator, getValue } = useStore(useCallback(selector(id), [id]));

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <Handle className={tw("w-2 h-2")} type="target" position="top" />

      <p
        className={tw("rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm")}
      >
        Operator
      </p>

      <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
        <p className={tw("text-xs font-bold mb-2")}>Select Operator</p>
        <select className="nodrag" value={data.operator} onChange={setOperator}>
          <option value="+">Addition</option>
          <option value="-">Subtraction</option>
          <option value="*">Multiplication</option>
          <option value="/">Division</option>
        </select>
      </label>
      <hr className={tw("border-gray-200 mx-2")} />
      <label className={tw("flex flex-col px-2 py-1")}>
        <p className={tw("text-xs font-bold mb-2")}>Output</p>

        <p className={tw("text-right text-xs")}>{getValue()}</p>
      </label>

      <hr className={tw("border-gray-200 mx-2")} />

      <Handle className={tw("w-2 h-2")} type="source" position="bottom" />
    </div>
  );
};

const selector = (id: string) => (store: any) => ({
  setOperator: (e: React.ChangeEvent<HTMLSelectElement>) =>
    store.updateNode(id, { operator: e.target.value }),
  getValue: () => store.getValue(id),
});

export default Operator;
