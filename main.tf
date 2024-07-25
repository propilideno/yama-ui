#     _    __  __ ___ 
#    / \  |  \/  |_ _|
#   / _ \ | |\/| || | 
#  / ___ \| |  | || | 
# /_/   \_\_|  |_|___|
data "aws_ami" "selected" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "aws_ami" "deep_learning_nvidia" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["Deep Learning Base OSS Nvidia Driver GPU AMI (Ubuntu 22.04) 20240520"]
  }
}

#  ____  _____ ___  _   _ ___ ____  _____ ____  
# |  _ \| ____/ _ \| | | |_ _|  _ \| ____|  _ \ 
# | |_) |  _|| | | | | | || || |_) |  _| | | | |
# |  _ <| |__| |_| | |_| || ||  _ <| |___| |_| |
# |_| \_\_____\__\_\\___/|___|_| \_\_____|____/ 

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.37" # >= (5.37.0) and < (6.0.0)
    }
  }
}

locals {
  project  = "yama-ui"
  allowed_cidrs = [
    "${chomp(data.http.ipv4.response_body)}/32", # Your Public IP
    # "0.0.0.0/0", # DO NOT USE THIS IN PRODUCTION (see README.md Troubleshooting instructions)
  ]
  user_data = <<-EOF
  #cloud-config
  
  runcmd:
    - |
      #!/bin/bash
      git clone https://github.com/propilideno/yama-ui.git --depth 1
  EOF
}

#   ____ _   _ ____ _____ ___  __  __ ___ _____   _    ____  _     _____ 
#  / ___| | | / ___|_   _/ _ \|  \/  |_ _|__  /  / \  | __ )| |   | ____|
# | |   | | | \___ \ | || | | | |\/| || |  / /  / _ \ |  _ \| |   |  _|  
# | |___| |_| |___) || || |_| | |  | || | / /_ / ___ \| |_) | |___| |___ 
#  \____|\___/|____/ |_| \___/|_|  |_|___/____/_/   \_\____/|_____|_____|

locals {
  region               = "us-east-1"
  prefix               = "lab"
  instance_type        = "g4dn.xlarge"
  create_spot_instance = false
}

provider "aws" {
  region = local.region
  default_tags {
    tags = {
      Project = local.project
      Prefix  = local.prefix
    }
  }
}

resource "aws_security_group" "instance_sg" {
  name        = "${local.prefix}-${local.project}-${random_string.suffix.result}"
  description = "Security Group for EC2 Instance"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = local.allowed_cidrs
    #security_groups = [] # Add here more security groups
  }

  ingress {
    description = "Allow SSH"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = local.allowed_cidrs
    #security_groups = [] # Add here more security groups
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

module "machine" {
  source                      = "terraform-aws-modules/ec2-instance/aws"
  ami                         = data.aws_ami.deep_learning_nvidia.id
  instance_type               = local.instance_type
  key_name                    = local.key_name
  monitoring                  = true
  vpc_security_group_ids      = [aws_security_group.instance_sg.id]
  # subnet_id                   = data.aws_subnet.default-lab.id
  associate_public_ip_address = true
  create_spot_instance        = local.create_spot_instance
  user_data                   = local.user_data

  tags = {
    Name = "${local.prefix}-${local.project}-${random_string.suffix.result}"
  }

}

# Exec on ec2 machine
resource "null_resource" "machine_remote_exec" {
  depends_on = [module.machine]

  triggers = {
    instance_id = module.machine.id
  }

  connection {
    type = "ssh"
    user = "ubuntu"
    host = module.machine.public_ip
    #private_key = file("./your_private_key.pem")
  }

  # Wait for cloud-init to finish
  provisioner "remote-exec" {
    inline = [
      "cloud-init status --wait"
    ]
  }

  #provisioner "file" {
  #  source      = "../yama-ui"
  #  destination = "/home/ubuntu/yama-ui"
  #}

}

#  ____    _  _____  _    
# |  _ \  / \|_   _|/ \   
# | | | |/ _ \ | | / _ \  
# | |_| / ___ \| |/ ___ \ 
# |____/_/   \_\_/_/   \_\

data "aws_vpc" "default" {
  default = true
}

# data "aws_subnet" "default-lab" {
#   filter {
#     name   = "tag:Name"
#     values = ["subnet-lab"]
#   }
# }

data "http" "ipv4" {
  url = "https://ipv4.icanhazip.com"
}

# data "http" "ipv6" {
#   url = "https://ipv6.icanhazip.com"
# }

resource "random_string" "suffix" {
  length  = 5
  special = false
  lower   = false
}

#   ___  _   _ _____ ____  _   _ _____ 
#  / _ \| | | |_   _|  _ \| | | |_   _|
# | | | | | | | | | | |_) | | | | | |  
# | |_| | |_| | | | |  __/| |_| | | |  
#  \___/ \___/  |_| |_|    \___/  |_|  

output "public_ip" {
  value = module.machine.public_ip
}

output "private_ip" {
  value = module.machine.private_ip
}
#
# output "connection_instruction" {
#   value = "ssh ubuntu@${module.machine.public_ip} -i your_private_key.pem"
# }
