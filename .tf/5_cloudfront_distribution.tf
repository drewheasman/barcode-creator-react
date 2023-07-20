resource "aws_cloudfront_response_headers_policy" "cache-control" {
  name = "cache-control-policy"

  custom_headers_config {
    items {
      header   = "Cache-Control"
      value    = "max-age=2592000"
      override = false
    }
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  aliases             = [var.domain_name]
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.root.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.root_bucket.id
    origin_id                = var.bucket_name
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  ordered_cache_behavior {
    cache_policy_id          = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # No cache
    origin_request_policy_id = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf" # S3 CORS
    allowed_methods          = ["GET", "HEAD"]
    cached_methods           = ["GET", "HEAD"]
    viewer_protocol_policy   = "redirect-to-https"
    target_origin_id         = var.bucket_name
    path_pattern             = "/index.html"
    compress                 = true
  }

  default_cache_behavior {
    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6" # Caching optimised
    origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf" # S3 CORS
    response_headers_policy_id = aws_cloudfront_response_headers_policy.cache-control.id
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    target_origin_id           = var.bucket_name
    viewer_protocol_policy     = "redirect-to-https"
    compress                   = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

  tags = var.common_tags
}

resource "aws_cloudfront_function" "www_redirect" {
  name    = "create-barcodes-www-redirect"
  runtime = "cloudfront-js-1.0"
  code    = <<-EOT
    function handler(event) {
        var request = event.request;
        console.log(request.headers["host"]);
        if (request.headers["host"] && request.headers["host"].value.startsWith("www")) {
            var response = {
                statusCode: 301,
                statusDescription: 'Moved Permanently',
                headers: {
                    'location': { value: 'https://${var.domain_name}'+event.request.uri }
                }
            };
            return response;
        }
        return request;
    }
    EOT
}

resource "aws_cloudfront_distribution" "www_distribution" {
  enabled         = true
  is_ipv6_enabled = true
  aliases         = ["www.${var.domain_name}"]
  price_class     = "PriceClass_100"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.bucket_name
    viewer_protocol_policy = "allow-all"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.www_redirect.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

  # Not used but origin is required
  origin {
    domain_name              = aws_s3_bucket.root.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.root_bucket.id
    origin_id                = var.bucket_name
  }

  tags = var.common_tags
}

output "distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}
