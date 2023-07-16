variable "domain_name" {
  type        = string
  description = "Website domain name"
}

variable "bucket_name" {
  type        = string
  description = "Website bucket name"
}

variable "common_tags" {
  description = "Tags applied to resources"
}
