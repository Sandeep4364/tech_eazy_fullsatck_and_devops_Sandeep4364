# Tech-Eazy DevOps EC2 Automation Platform

A comprehensive DevOps automation platform for managing EC2 deployments with a beautiful web interface.

## 🚀 Features

- **Multi-Stage Deployments**: Deploy to dev, staging, and production environments
- **Real-time Monitoring**: Live deployment status and logs
- **Automated Instance Management**: Automatic shutdown with configurable timeouts
- **Beautiful Dashboard**: Modern React interface with dark theme
- **Configuration Management**: Stage-based configuration with easy editing
- **Deployment Logs**: Comprehensive logging with different log levels
- **AWS Integration**: Full AWS EC2 integration with proper security

## 📋 Prerequisites

Before using this platform, ensure you have:

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **EC2 Key Pairs** created for SSH access
4. **Security Groups** configured with appropriate ports
5. **GitHub Repository** with your application code

## 🛠️ Setup Instructions

### 1. AWS Configuration

```bash
# Configure AWS CLI
aws configure

# Verify configuration
aws ec2 describe-regions
```

### 2. Create EC2 Key Pairs

```bash
# Create key pair for each environment
aws ec2 create-key-pair --key-name tech-eazy-dev-key --query 'KeyMaterial' --output text > ~/.ssh/tech-eazy-dev-key.pem
aws ec2 create-key-pair --key-name tech-eazy-staging-key --query 'KeyMaterial' --output text > ~/.ssh/tech-eazy-staging-key.pem
aws ec2 create-key-pair --key-name tech-eazy-prod-key --query 'KeyMaterial' --output text > ~/.ssh/tech-eazy-prod-key.pem

# Set proper permissions
chmod 400 ~/.ssh/tech-eazy-*.pem
```

### 3. Create Security Groups

```bash
# Create security group for web applications
aws ec2 create-security-group --group-name tech-eazy-web --description "Tech-Eazy Web Application Security Group"

# Add rules for HTTP, HTTPS, and SSH
aws ec2 authorize-security-group-ingress --group-name tech-eazy-web --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name tech-eazy-web --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name tech-eazy-web --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name tech-eazy-web --protocol tcp --port 3000 --cidr 0.0.0.0/0
```

## 🚦 Usage

### Web Interface

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```

2. **Access the Dashboard**: Open http://localhost:5173

3. **Deploy Applications**:
   - Click "Deploy" on any environment card
   - Monitor real-time logs
   - Access deployed applications via provided URLs

4. **Manage Configurations**:
   - Click "Manage Config" to edit environment settings
   - Update instance types, AMI IDs, security groups, etc.
   - Save configurations per environment

### Command Line Interface

You can also use the deployment scripts directly:

```bash
# Deploy to development
./scripts/deploy.sh dev 30

# Deploy to staging with 60-minute timeout
./scripts/deploy.sh staging 60

# Deploy to production
./scripts/deploy.sh prod 120

# Stop specific instance
./scripts/stop_instance.sh i-1234567890abcdef0

# Stop latest deployed instance
./scripts/stop_instance.sh latest
```

## 📁 Project Structure

```
tech-eazy-devops/
├── configs/                 # Environment configurations
│   ├── dev_config.json
│   ├── staging_config.json
│   └── prod_config.json
├── scripts/                 # Deployment scripts
│   ├── deploy.sh           # Main deployment script
│   ├── stop_instance.sh    # Instance management
│   └── user-data.sh        # EC2 bootstrap script
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript definitions
│   └── App.tsx            # Main application
├── logs/                   # Deployment logs (created automatically)
└── README.md
```

## ⚙️ Configuration

### Environment Configuration

Each environment has its own configuration file in the `configs/` directory:

```json
{
  "instance_type": "t2.micro",
  "ami_id": "ami-0c02fb55956c7d316",
  "key_name": "tech-eazy-dev-key",
  "region": "us-east-1",
  "repo_url": "https://github.com/your-username/your-app.git",
  "instance_name": "tech-eazy-devops-dev",
  "security_group": "sg-0123456789abcdef0",
  "app_port": "3000"
}
```

### Supported Application Types

The platform automatically detects and deploys:

- **Java Spring Boot**: Applications with `pom.xml`
- **Node.js**: Applications with `package.json`
- **Docker**: Applications with `Dockerfile`

## 🔧 Customization

### Adding New Environments

1. Create a new configuration file: `configs/new_env_config.json`
2. Add the environment to the `stages` array in `src/App.tsx`
3. Deploy using: `./scripts/deploy.sh new_env`

### Modifying User Data Script

Edit `scripts/user-data.sh` to customize:
- Software installations
- Environment setup
- Application dependencies
- Startup scripts

## 📊 Monitoring & Logging

- **Real-time Logs**: View deployment progress in the web interface
- **Log Files**: Stored in `logs/` directory
- **Instance Tracking**: Automatic tracking of instance IDs and status
- **Deployment History**: JSON files with deployment information

## 🔒 Security Best Practices

- **No Hardcoded Secrets**: Use environment variables and AWS credentials
- **IAM Roles**: Use IAM roles instead of access keys when possible
- **Security Groups**: Restrict access to necessary ports only
- **Key Management**: Store SSH keys securely
- **Auto-Shutdown**: Prevents runaway costs with automatic instance termination

## 🐛 Troubleshooting

### Common Issues

1. **AWS CLI Not Configured**:
   ```bash
   aws configure
   ```

2. **SSH Connection Failed**:
   - Check security group rules
   - Verify key pair permissions (chmod 400)
   - Ensure correct key name in configuration

3. **Instance Launch Failed**:
   - Verify AMI ID exists in your region
   - Check EC2 service limits
   - Ensure security group exists

4. **Application Not Accessible**:
   - Check application logs in the instance
   - Verify security group allows traffic on app port
   - Ensure application is binding to 0.0.0.0, not localhost

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the troubleshooting section

---

**Tech-Eazy DevOps Platform** - Simplifying cloud deployments with beautiful automation.