# Following variables as github secrets:
# AWS_REGION
# TF_AWS_BUCKET
# TF_AWS_BUCKET_KEY
# TF_AWS_ROLE

# Initialise locally with:
# terraform init -backend-config="bucket=TFSTATE_BUCKET" -backend-config="key=TFSTATE_KEY" -backend-config="region=REGION" -backend-config="profile=PROFILE"

terraform {
  required_version = "~> 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.7"
    }
  }

  backend "s3" {}
}

provider "aws" {}

provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
}
