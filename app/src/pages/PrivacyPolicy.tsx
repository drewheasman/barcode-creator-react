import { Container } from "react-bootstrap";

export function PrivacyPolicy() {
  return (
    <Container className="privacy-policy my-3">
      <h2>Privacy Policy</h2>
      <p>Effective Date: 19th October 2024</p>
      <p>
        Welcome to Create Barcodes ("we," "us," or "our"). We value your privacy
        and are committed to transparently explaining how we handle information
        on our website, including the use of Google Analytics.
      </p>
      <h3>1. Information Collection</h3>
      <p>
        We do not collect any personal information from our users directly.
        However, please be aware that third-party services, such as Google
        Analytics, may gather non-personal information through
        scripts and similar technologies to provide specific functionalities and
        services.
      </p>
      <h3>2. Google Analytics</h3>
      <p>
        We utilize Google Analytics to gather non-personal data about your
        interaction with our website. This information includes but is not
        limited to your IP address, browser type, device type, and pages
        visited. We use this information to analyze user behavior and improve
        our website's performance. For more details on how Google Analytics
        collects and processes data, please refer to the{" "}
        <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
      </p>
      <h3>3. Third-Party Scripts</h3>
      <p>
        Please note that third-party scripts and services, including Google
        Analytics, may have their own data collection and
        usage policies. We recommend reviewing their respective privacy policies
        for a comprehensive understanding of their practices.
      </p>
      <h3>4. Your Choices</h3>
      <p>
        You have the option to manage your privacy preferences related to Google
        Analytics by adjusting your browser settings or
        utilizing available browser extensions.
      </p>
      <h3>5. Changes to this Privacy Policy</h3>
      <p>
        We retain the right to modify or update this Privacy Policy as needed.
        Any revisions will be posted on this page with a revised effective date.
      </p>
      <h3>6. Contact Us</h3>
      <p>
        For inquiries about this Privacy Policy or your privacy while using our
        website, please reach out to us at{" "}
        <a href="mailto:createbarcodes@gmail.com">createbarcodes@gmail.com</a>
      </p>
    </Container>
  );
}
