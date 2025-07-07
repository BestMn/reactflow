import {
    Handle,
    Position,
    useEdges,
    useStore,
    useStoreApi,
} from "@xyflow/react";
import { useCallback } from "react";

export const ConditionNode = (props) => {
    const store = useStoreApi();
    const connection = useStore((state) => {
        return state.connection;
    });
    const edges = useEdges();

    const onNodeClick = useCallback(
        () =>
            store.setState({
                selectedNodeId: props.id,
            }),
        []
    );

    const isSourceHandleHidden =
        connection.inProgress &&
        (connection.fromNode.type === "beginNode" ||
            connection.fromHandle.type === "source");

    return (
        <div className="text-updater-node condition-node" onClick={onNodeClick}>
            <div className="text-updater-node-header">
                {props.data.visible === "false" ? null : (
                    <Handle
                        type={"target"}
                        position={Position.Left}
                        style={{ top: "50%" }}
                        isConnectableStart={false}
                    />
                )}
                <div>{props.data.label}</div>
            </div>

            <div className="text-updater-node-body">
                {props.data.condition || "Добавьте условие"}
            </div>

            <div className="text-updater-node-footer">
                <div className="text-updater-node-condition">
                    <span>Выполняется условие</span>
                    <Handle
                        id={props.id + "testid1"}
                        type={"source"}
                        position={Position.Right}
                        isConnectableStart={
                            !edges.some(
                                (edge) =>
                                    edge.sourceHandle === props.id + "testid1"
                            )
                        }
                        style={{ opacity: isSourceHandleHidden ? "0.5" : 1 }}
                    />
                </div>
                <div className="text-updater-node-condition">
                    <span>Не выполняется условие</span>
                    <Handle
                        id={props.id + "testid2"}
                        type={"source"}
                        position={Position.Right}
                        isConnectableStart={
                            !edges.some(
                                (edge) =>
                                    edge.sourceHandle === props.id + "testid2"
                            )
                        }
                        style={{ opacity: isSourceHandleHidden ? "0.5" : 1 }}
                    />
                </div>
            </div>
        </div>
    );
};
