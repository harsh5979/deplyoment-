import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiX, FiPlus, FiTrash2, FiGithub } from "react-icons/fi";
import { SiNodedotjs, SiReact } from "react-icons/si";
import { deploymentAPI } from "../services/api";
import { useDeployment } from "../hooks/useDeployment";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
const DeploymentForm = ({ onClose }) => {
  const navigate = useNavigate();

  const { deployMutation, isDeploying } = useDeployment();
  const [formData, setFormData] = useState({
    appNames: "",
    repoUrl: "",
    type: "frontend",
    port: "",
    customDomain: "",
    env: {},
  });

  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);
  const [appNameValidation, setAppNameValidation] = useState({
    valid: true,
    message: "",
  });

  const queryClient = useQueryClient();

  // ✅ Local validation
  const validateAppNameLocally = (name) => {
    const regex = /^[a-z-]+$/; // only lowercase letters and dash
    if (!name.trim()) {
      return { valid: false, message: "App Name is required" };
    }
    if (!regex.test(name)) {
      return {
        valid: false,
        message: "Only lowercase letters and '-' are allowed",
      };
    }
    return { valid: true, message: "" };
  };

  // ✅ Input handler
  const handleAppNameChange = (e) => {
    let value = e.target.value.toLowerCase();
    value = value.replace(/[^a-z-]/g, ""); // allow only a-z and dash
    setFormData((prev) => ({ ...prev, appNames: value }));
    setAppNameValidation(validateAppNameLocally(value));
  };

  // ✅ React Query for server-side check
  const checkAppNameMutation = useMutation({
    mutationFn: async (appName) => {
      const res = await deploymentAPI.checkNameAvailability({ appName });
      return res.data;
    },
    onSuccess: (data) => {
      setAppNameValidation({ valid: data.valid, message: data.message });
    },
    onError: () => {
      setAppNameValidation({
        valid: false,
        message: "Error checking app name",
      });
    },
  });

  // ✅ Trigger server check only when user finishes typing (onBlur)
  const handleAppNameBlur = () => {
    if (formData.appNames.trim() === "") return;
    const localCheck = validateAppNameLocally(formData.appNames.trim());
    if (localCheck.valid) {
      checkAppNameMutation.mutate(formData.appNames.trim());
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appNameValidation.valid) return;

    const envObject = {};
    envVars.forEach(({ key, value }) => {
      if (key.trim() && value.trim()) envObject[key.trim()] = value.trim();
    });

    const submitData = {
      ...formData,
      env: envObject,
      port:
        formData.type === "backend" && formData.port
          ? parseInt(formData.port)
          : undefined,
    };

    try {
      const res = await deployMutation.mutateAsync(submitData);
      onClose();
      if (res?.data?.projectId) {
      navigate(`/projects/${res.data.projectId}`);
    }

      
    } catch (error) {
      queryClient.invalidateQueries(["deployment"]);
      console.error("Deployment failed:", error);
      onClose();
    }
  };

  const addEnvVar = () => setEnvVars([...envVars, { key: "", value: "" }]);
  const removeEnvVar = (index) =>
    setEnvVars(envVars.filter((_, i) => i !== index));
  const updateEnvVar = (index, field, value) => {
    const updated = [...envVars];
    updated[index][field] = value;
    setEnvVars(updated);
  };
  if (deployMutation.isPending) {
    return <Loader />
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Deploy New Project</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1"
        >
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* App Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            App Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.appNames}
            onChange={handleAppNameChange}
            onBlur={handleAppNameBlur} // ✅ check only on blur
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
              appNameValidation.valid
                ? "border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                : "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
            }`}
            placeholder="my-awesome-app"
          />
          {appNameValidation?.message &&  (
            <p className={`text-${appNameValidation?.valid ? 'green' : 'red'}-400 text-sm mt-1`} >
              {appNameValidation?.message}
            </p>
          )}
        </div>

        {/* Repo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <FiGithub className="inline mr-1" />
            GitHub Repository URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            required
            value={formData.repoUrl}
            onChange={(e) =>
              setFormData({ ...formData, repoUrl: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
            placeholder="https://github.com/username/repository"
          />
        </div>

        {/* Type & Port */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, type: "frontend", port: "" })
            }
            className={`flex items-center justify-center p-4 rounded-lg border transition-colors ${
              formData.type === "frontend"
                ? "bg-blue-500 border-blue-400 text-white"
                : "bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500"
            }`}
          >
            <SiReact size={20} className="mr-2" />
            Frontend
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "backend" })}
            className={`flex items-center justify-center p-4 rounded-lg border transition-colors ${
              formData.type === "backend"
                ? "bg-blue-500 border-blue-400 text-white"
                : "bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500"
            }`}
          >
            <SiNodedotjs size={20} className="mr-2" />
            Backend
          </button>
        </div>

        {formData.type === "backend" && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Port <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              required
              min="1"
              max="65535"
              value={formData.port}
              onChange={(e) =>
                setFormData({ ...formData, port: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
              placeholder="3000"
            />
          </div>
        )}

        {/* Environment Variables */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-300">
              Environment Variables
            </label>
            <button
              type="button"
              onClick={addEnvVar}
              className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
            >
              <FiPlus size={16} className="mr-1" />
              Add
            </button>
          </div>
          <div className="space-y-3">
            {envVars.map((envVar, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={envVar.key}
                  onChange={(e) =>
                    updateEnvVar(index, "key", e.target.value)
                  }
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 outline-none transition-colors"
                  placeholder="KEY"
                />
                <input
                  type="text"
                  value={envVar.value}
                  onChange={(e) =>
                    updateEnvVar(index, "value", e.target.value)
                  }
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 outline-none transition-colors"
                  placeholder="VALUE"
                />
                <button
                  type="button"
                  onClick={() => removeEnvVar(index)}
                  className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={deployMutation.isPending || !appNameValidation.valid}
            className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {deployMutation.isPending ? "Deploying..." : "Deploy Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeploymentForm;
