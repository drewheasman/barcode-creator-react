resource "aws_s3_bucket" "root" {
  bucket        = var.bucket_name
  force_destroy = true

  tags = var.common_tags
}

resource "aws_s3_bucket_ownership_controls" "root" {
  bucket = aws_s3_bucket.root.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "root" {
  depends_on = [aws_s3_bucket_ownership_controls.root]

  bucket = aws_s3_bucket.root.id
  acl    = "private"
}
