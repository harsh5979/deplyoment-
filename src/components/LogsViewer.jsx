import React, { useEffect, useState } from 'react';
import { FiRefreshCw, FiDownload } from 'react-icons/fi';
import { useDeployment } from "../hooks/useDeployment";


const LogsViewer = ({ projectId ,status}) => {
    const { useProjectLogs } = useDeployment();
  const { data, isLoading, error,isPending } = useProjectLogs(projectId,status);

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

 
  useEffect(() => {
    // Simulate loading logs
      if (data?.data?.logs) {
    setLogs(data.data.logs);
  }

  }, [data,projectId]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const downloadLogs = () => {
    const logContent = logs
      .map(log => `[${formatTime(log.timestamp)}] ${log.level.toUpperCase()}: ${log.message}`)
      .join('\n');
    
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deployment-logs-${projectId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
   if (isLoading || isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiRefreshCw size={32} className="text-blue-400 animate-spin mr-3" />
        <span className="text-gray-400">Loading logs...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        <div className="flex items-center gap-3">
          <label className="flex items-center text-sm text-gray-300">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="mr-2 accent-blue-500"
            />
            Auto-refresh
          </label>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadLogs}
            className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded transition-colors"
          >
            <FiDownload size={14} className="mr-1" />
            Export
          </button>
          <button
            onClick={() => setLogs(data?.data.logs)}
            disabled={loading}
            className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded transition-colors"
          >
            <FiRefreshCw size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Logs Content */}
      <div className="p-4 max-h-96 overflow-y-auto font-mono text-sm">
        {logs?.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No logs available
          </div>
        ) : (
          <div className="space-y-1">
            {logs?.map((log, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-gray-500 text-xs whitespace-nowrap">
                  {formatTime(log.timestamp)}
                </span>
                <span className={`text-xs font-medium uppercase ${getLevelColor(log.level)}`}>
                  [{log.level}]
                </span>
                <span className="text-gray-300 flex-1">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsViewer;