export interface DeploymentConfig {
  instance_type: string;
  ami_id: string;
  key_name: string;
  region: string;
  repo_url: string;
  instance_name: string;
  security_group: string;
  app_port: string;
}

export interface DeploymentStatus {
  instance_id: string;
  public_ip: string;
  stage: string;
  app_url: string;
  deployed_at: string;
  timeout_minutes: number;
  log_file: string;
  status: 'launching' | 'running' | 'stopping' | 'stopped' | 'failed';
}

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}