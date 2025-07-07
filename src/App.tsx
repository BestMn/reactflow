import { useCallback, useRef, useState } from "react";
import "./App.css";
import {
    addEdge,
    ConnectionLineType,
    getBezierPath,
    Handle,
    Position,
    ReactFlow,
    reconnectEdge,
    useEdgesState,
    useNodesState,
    useStoreApi,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { BeginNode } from "./BeginNode";
import { ConditionNode } from "./ConditionNode";
import { Sidebar } from "./Sidebar";
import { ActionNode } from "./ActionNode";

const initialNodes = [
    {
        id: `begin-node-${Date.now()}`, // Уникальный ID
        type: "beginNode", // Тип узла (должен быть зарегистрирован)
        position: { x: 200, y: 200 }, // Позиция на холсте
        data: {
            label: "Новый блок",
            custom: "test",
            maxSourceConnections: 1,
        }, // Данные узла
    },
];
const initialEdges = [];
const nodeTypes = {
    beginNode: BeginNode,
    conditionNode: ConditionNode,
    actionNode: ActionNode,
};

function App() {
    const edgeReconnectSuccessful = useRef(true);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Функция добавления нового узла
    const addConditionNode = () => {
        const newNode = {
            id: `node-${Date.now()}`, // Уникальный ID
            type: "conditionNode", // Тип узла (должен быть зарегистрирован)
            position: { x: 250, y: 250 }, // Позиция на холсте
            data: {
                label: `Шаг ${nodes.length}`,
                custom: "test",
                maxTargetConnections: 1,
                maxSourceConnections: 1,
            }, // Данные узла
        };

        setNodes([...nodes, newNode]);
    };

    const addActionNode = () => {
        const newNode = {
            id: `node-${Date.now()}`, // Уникальный ID
            type: "actionNode", // Тип узла (должен быть зарегистрирован)
            position: { x: 250, y: 250 }, // Позиция на холсте
            data: {
                label: `Шаг ${nodes.length}`,
                custom: "test",
                maxTargetConnections: 1,
                maxSourceConnections: 1,
            }, // Данные узла
        };

        setNodes([...nodes, newNode]);
    };

    const isValidConnection = useCallback(
        (connection) => {
            const targetNode = nodes.find(
                (node) => node.id === connection.target
            );
            const maxTargetConnections =
                targetNode?.data?.maxTargetConnections || 1; // Берем из data узла
            const maxSourceConnections =
                targetNode?.data?.maxSourceConnections || 1; // Берем из data узла

            const targetConnections = edges.filter(
                (edge) => edge.target === connection.target
            ).length;
            const sourceConnections = edges.filter(
                (edge) => edge.source === connection.source
            ).length;

            return targetConnections < maxTargetConnections;
        },
        [nodes]
    );

    const onConnect = useCallback(
        (params) => setEdges((els) => addEdge(params, els)),
        []
    );

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnect = useCallback((oldEdge, newConnection) => {
        edgeReconnectSuccessful.current = true;
        setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    }, []);

    const onReconnectEnd = useCallback((_, edge) => {
        if (!edgeReconnectSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }

        edgeReconnectSuccessful.current = true;
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <div className="toolbar">
                <button type="button" onClick={addConditionNode}>
                    Добавить условие
                </button>
                <button type="button" onClick={addActionNode}>
                    Добавить действие
                </button>
            </div>
            <ReactFlow
                style={{
                    background: "#f2f4f7",
                }}
                isValidConnection={isValidConnection}
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                connectionLineType={ConnectionLineType.SmoothStep}
                defaultEdgeOptions={{
                    type: ConnectionLineType.SmoothStep,
                }}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}
                onConnect={onConnect}
                proOptions={{ hideAttribution: true }}
            >
                <Sidebar />
            </ReactFlow>
        </div>
    );
}

export default App;
