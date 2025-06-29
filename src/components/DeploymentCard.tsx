import React from 'react';
import { Server, Globe, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface DeploymentCardProps {
  stage: string;
  instanceId?: string;
  publicIp?: string;
  appUrl?: string;
  status: 'launching' | 'running' | 'stopping' | 'stopped' | 'failed' | 'idle';
  deployedAt?: string;
  timeoutMinutes?: number;
  onDeploy: () => void;
  onStop: () => void;
}

const DeploymentCard: React.FC<DeploymentCardProps> = ({
  stage,
  instanceId,
  publicIp,
  appUrl,
  status,
  deployedAt,
  timeoutMinutes,
  onDeploy,
  onStop
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'launching': return 'bg-yellow-500 animate-pulse';
      case 'stopping': return 'bg-orange-500 animate-pulse';
      case 'failed': return 'bg-red-500';
      case 'stopped': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'running': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'launching': return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
      case 'stopping': return <Clock className="h-5 w-5 text-orange-500 animate-spin" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'stopped': return <AlertCircle className="h-5 w-5 text-gray-500" />;
      default: return <Server className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStageColor = () => {
    switch (stage.toLowerCase()) {
      case 'prod': return 'bg-red-100 text-red-800 border-red-200';
      case 'staging': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'dev': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStageColor()}`}>
            {stage.toUpperCase()}
          </span>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-gray-300 capitalize">{status}</span>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
      </div>

      {instanceId && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Server className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">Instance:</span>
            <code className="bg-gray-700 px-2 py-1 rounded text-blue-400">{instanceId}</code>
          </div>
          
          {publicIp && (
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">IP:</span>
              <code className="bg-gray-700 px-2 py-1 rounded text-green-400">{publicIp}</code>
            </div>
          )}

          {appUrl && (
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">URL:</span>
              <a 
                href={appUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {appUrl}
              </a>
            </div>
          )}

          {deployedAt && (
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">Deployed:</span>
              <span className="text-gray-400">{new Date(deployedAt).toLocaleString()}</span>
            </div>
          )}

          {timeoutMinutes && (
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">Auto-stop:</span>
              <span className="text-yellow-400">{timeoutMinutes} minutes</span>
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={onDeploy}
          disabled={status === 'launching' || status === 'stopping'}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          {status === 'launching' ? 'Deploying...' : 'Deploy'}
        </button>
        
        {status === 'running' && (
          <button
            onClick={onStop}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default DeploymentCard;