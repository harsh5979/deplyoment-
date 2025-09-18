// src/components/ProjectActions.jsx
import React, { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import deploymentAPI from "../services/api";
import { useNavigate } from "react-router-dom";
import ConfirmButton from "./ConfirmButton";
import { useDeployment } from "../hooks/useDeployment";

const ProjectActions = ({ project, open, setOpen }) => {
    const { deleteMutation,pauseMutation } = useDeployment()
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [confirm, setConfirm] = useState(null);



    const handleConfirmAction = () => {
        if (confirm?.action) {
            confirm.action();
            setConfirm(null);
            setOpen(null);
        }
    };

   




    // --- Show Logs ---
    const logsMutation = useMutation({
        onMutate: () => {
            navigate(`/projects/${project._id}`);
        },
    });
    const handleDelete = (projectId) => {
        deleteMutation.mutate(projectId);
    }


    return (
        <>
            {/* Confirmation modal for delete */}
            {confirm && (
                <ConfirmButton
                    label={confirm.label}
                    onConfirm={handleConfirmAction}
                    onCancel={() => setConfirm(null)}
                />
            )}

            <div className="relative" >
                {/* Toggle Button */}
                <button
                    onClick={() =>
                        setOpen(open === project._id ? null : project._id)
                    }
                    className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <FiMoreVertical size={18} className="text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {open === project._id && (
                    <div className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-30">
                        <button
                            onClick={() => {
                                setOpen(null);
                                logsMutation.mutate(project._id);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                        >
                            Show Logs
                        </button>

                        <button
                            onClick={() => {
                                setConfirm({
                                    label: "Pause this project",
                                    action: () => {
                                        pauseMutation.mutate(project._id);
                                    },
                                })
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                        >
                            Pause
                        </button>

                        <button
                            onClick={() =>
                                setConfirm({
                                    label: "Delete this project",
                                    action: () => {
                                        handleDelete(project._id);
                                    },
                                })
                            }
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProjectActions;
