import { Handle, Position } from "@xyflow/react";
import React from "react";

export const BeginNode = (props) => {
    return (
        <div className="text-updater-node">
            <div className="text-updater-node-header">Начальное условие</div>

            <div className="text-updater-node-body">
                <span>Изменение корзины</span>
            </div>

            <div className="text-updater-node-footer">
                <div className="text-updater-node-condition">
                    <span>Переход на следующий шаг</span>
                    <Handle type={"source"} position={Position.Right} />
                </div>
            </div>
        </div>
    );
};
