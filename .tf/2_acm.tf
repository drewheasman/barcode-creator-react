resource "aws_acm_certificate" "ssl_certificate" {
  provider                  = aws.acm_provider
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  tags = var.common_tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  depends_on      = [aws_acm_certificate.ssl_certificate]
  zone_id         = aws_route53_zone.main.id
  name            = sort(aws_acm_certificate.ssl_certificate.domain_validation_options[*].resource_record_name)[0]
  type            = "CNAME"
  ttl             = "300"
  records         = [sort(aws_acm_certificate.ssl_certificate.domain_validation_options[*].resource_record_value)[0]]
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "cert_validation" {
  provider                = aws.acm_provider
  certificate_arn         = aws_acm_certificate.ssl_certificate.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
  timeouts {
    create = "60m"
  }
}
