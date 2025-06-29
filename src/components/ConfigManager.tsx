import React, { useState } from 'react';
import { Settings, Save, FileText } from 'lucide-react';
import { DeploymentConfig } from '../types/deployment';

interface ConfigManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stage: string, config: DeploymentConfig) => void;
}

const ConfigManager: React.FC<ConfigManagerProps> = ({ isOpen, onClose, onSave }) => {
  const [selectedStage, setSelectedStage] = useState('dev');
  const [config, setConfig] = useState<DeploymentConfig>({
    instance_type: 't2.micro',
    ami_id: 'ami-0c02fb55956c7d316',
    key_name: 'tech-eazy-dev-key',
    region: 'us-east-1',
    repo_url: 'https://github.com/your-username/tech-eazy-app.git',
    instance_name: 'tech-eazy-devops-dev',
    security_group: 'sg-0123456789abcdef0',
    app_port: '3000'
  });

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedStage, config);
    onClose();
  };

  const handleConfigChange = (key: keyof DeploymentConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-700 w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Configuration Manager</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="dev">Development</option>
              <option value="staging">Staging</option>
              <option value="prod">Production</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Instance Type
              </label>
              <input
                type="text"
                value={config.instance_type}
                onChange={(e) => handleConfigChange('instance_type', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                AMI ID
              </label>
              <input
                type="text"
                value={config.ami_id}
                onChange={(e) => handleConfigChange('ami_id', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={config.key_name}
                onChange={(e) => handleConfigChange('key_name', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Region
              </label>
              <input
                type="text"
                value={config.region}
                onChange={(e) => handleConfigChange('region', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Security Group
              </label>
              <input
                type="text"
                value={config.security_group}
                onChange={(e) => handleConfigChange('security_group', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                App Port
              </label>
              <input
                type="text"
                value={config.app_port}
                onChange={(e) => handleConfigChange('app_port', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Repository URL
            </label>
            <input
              type="url"
              value={config.repo_url}
              onChange={(e) => handleConfigChange('repo_url', e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Instance Name
            </label>
            <input
              type="text"
              value={config.instance_name}
              onChange={(e) => handleConfigChange('instance_name', e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigManager;