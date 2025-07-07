import {
    useNodesData,
    useReactFlow,
    useStore,
    useStoreApi,
} from "@xyflow/react";
import React from "react";

export const Sidebar = () => {
    const reactFlow = useReactFlow();
    const store = useStoreApi();

    const selectedNodeId = useStore(
        (state) => state.selectedNodeId,
        (a, b) => a === b
    );

    if (!selectedNodeId) {
        return null;
    }

    const selectedNode = reactFlow
        .getNodes()
        .find((node) => node.id === selectedNodeId);

    console.log(selectedNode?.data);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                {selectedNode?.data.label}{" "}
                <button
                    onClick={() => {
                        store.setState({
                            selectedNodeId: null,
                        });
                    }}
                >
                    Закрыть
                </button>
            </div>

            <div>Введите значение</div>
            <div className="sidebar-body">
                <input
                    type="text"
                    onChange={(e) =>
                        reactFlow.updateNode(selectedNodeId, {
                            data: {
                                ...selectedNode?.data,
                                condition: e.target.value,
                            },
                        })
                    }
                />
            </div>
        </div>
    );
};
