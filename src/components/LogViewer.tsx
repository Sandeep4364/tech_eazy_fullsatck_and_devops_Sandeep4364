import React from 'react';
import { Terminal, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { LogEntry } from '../types/deployment';

interface LogViewerProps {
  logs: LogEntry[];
  isOpen: boolean;
  onClose: () => void;
}

const LogViewer: React.FC<LogViewerProps> = ({ logs, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-700 w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-white">Deployment Logs</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2 font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No logs available
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded hover:bg-gray-800">
                  {getLogIcon(log.level)}
                  <span className="text-gray-500 text-xs w-20 flex-shrink-0">
                    {log.timestamp}
                  </span>
                  <span className={getLogColor(log.level)}>
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;