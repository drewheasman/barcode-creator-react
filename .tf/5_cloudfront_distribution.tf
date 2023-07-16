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

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.bucket_name

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
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
