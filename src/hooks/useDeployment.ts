import { useState, useCallback } from 'react';
import { DeploymentStatus, LogEntry } from '../types/deployment';

export const useDeployment = () => {
  const [deployments, setDeployments] = useState<Record<string, DeploymentStatus>>({});
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = useCallback((level: LogEntry['level'], message: string) => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  const simulateDeployment = useCallback(async (stage: string) => {
    setIsLoading(true);
    
    // Simulate deployment process
    const instanceId = `i-${Math.random().toString(36).substr(2, 9)}`;
    const publicIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    // Initial deployment status
    setDeployments(prev => ({
      ...prev,
      [stage]: {
        instance_id: instanceId,
        public_ip: '',
        stage,
        app_url: '',
        deployed_at: new Date().toISOString(),
        timeout_minutes: 30,
        log_file: `./logs/deploy_${Date.now()}.log`,
        status: 'launching'
      }
    }));

    addLog('info', `Starting deployment for ${stage} environment`);
    addLog('info', `Instance ID: ${instanceId}`);
    
    // Simulate deployment steps
    await new Promise(resolve => setTimeout(resolve, 2000));
    addLog('info', 'Launching EC2 instance...');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    addLog('success', 'Instance launched successfully');
    addLog('info', `Public IP: ${publicIp}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    addLog('info', 'Waiting for SSH to be available...');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    addLog('success', 'SSH connection established');
    addLog('info', 'Deploying application...');
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    addLog('success', 'Application deployed successfully');
    
    const appUrl = `http://${publicIp}:3000`;
    addLog('success', `Application URL: ${appUrl}`);
    
    // Update deployment status to running
    setDeployments(prev => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        public_ip: publicIp,
        app_url: appUrl,
        status: 'running'
      }
    }));
    
    setIsLoading(false);
  }, [addLog]);

  const stopDeployment = useCallback(async (stage: string) => {
    const deployment = deployments[stage];
    if (!deployment) return;

    setDeployments(prev => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        status: 'stopping'
      }
    }));

    addLog('info', `Stopping instance ${deployment.instance_id}`);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDeployments(prev => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        status: 'stopped'
      }
    }));

    addLog('success', `Instance ${deployment.instance_id} stopped successfully`);
  }, [deployments, addLog]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    deployments,
    logs,
    isLoading,
    simulateDeployment,
    stopDeployment,
    clearLogs
  };
};