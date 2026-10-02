import React from "react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div
      className="view-wrapper"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "24px 20px",
        color: "var(--text-primary)",
      }}
    >
      <article className="glass-panel" style={{ padding: "32px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "8px" }}>
          Privacy Policy
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            marginBottom: "32px",
          }}
        >
          Last Updated: October 2, 2026
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
          }}
        >
          <section>
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              1. Introduction
            </h2>
            <p>
              Welcome to ScanStack. We respect your privacy and are committed to
              protecting your personal data and uploaded content. This Privacy
              Policy explains how our web application operates, how we handle
              your files, and how advertising partners like Google AdSense
              process information when you use our website.
            </p>
          </section>

          <section>
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              2. Zero Server Storage & Client-Side File Processing
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Our document scanner operates{" "}
              <strong>entirely in your web browser</strong> (client-side
              processing). When you capture a photo, upload an image file, crop,
              or generate a PDF document:
            </p>
            <ul
              style={{
                paddingLeft: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>
                Your documents and images are{" "}
                <strong>never uploaded to our servers</strong> or any
                third-party remote server.
              </li>
              <li>
                All processing, including image manipulation, rotation,
                cropping, and PDF compilation takes place locally within your
                web browser’s memory using standard browser APIs.
              </li>
              <li>
                Once you close or refresh your browser tab, all temporarily
                loaded images and generated PDFs are completely cleared from
                browser memory.
              </li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              3. Camera and Storage Access
            </h2>
            <p>
              To capture photos of physical documents or upload existing images,
              our web app requests temporary permission to access your device’s
              camera or file picker. These permissions are controlled
              exclusively by your browser settings. We do not record video
              streams, take secret captures, or access files outside of the
              specific images you choose to upload.
            </p>
          </section>

          <section>
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              4. Cookies and Google AdSense Disclosures
            </h2>
            <p style={{ marginBottom: "12px" }}>
              We use Google AdSense to serve advertisements on our site. Google
              and third-party vendors use cookies to show ads based on a user’s
              prior visits to our website or other websites on the internet.
            </p>
            <ul
              style={{
                paddingLeft: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>
                <strong>Advertising Cookies:</strong> Google’s use of
                advertising cookies enables it and its partners to serve ads to
                users based on their visit to our site and/or other sites on the
                Internet.
              </li>
              <li>
                <strong>Personalized Advertising Opt-Out:</strong> Users may opt
                out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-primary, #3b82f6)" }}
                >
                  Google Ad Settings
                </a>
                . Alternatively, you can opt out of a third-party vendor’s use
                of cookies for personalized advertising by visiting{" "}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-primary, #3b82f6)" }}
                >
                  www.aboutads.info
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              5. Analytics and Logs
            </h2>
            <p>
              Like most standard web servers, we may collect non-personally
              identifiable technical information (such as browser type, general
              geography, referring page, and timestamp) for server health,
              performance monitoring, and security troubleshooting. No document
              or image contents are tied to log data.
            </p>
          </section>

          <section>
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              6. Children's Privacy
            </h2>
            <p>
              Our service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from
              children under 13.
            </p>
          </section>

          <section>
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              7. Updates to This Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              8. Contact Us
            </h2>
            <p>
              If you have questions or suggestions about our Privacy Policy,
              please reach out to us at <strong>support@scanstack.net</strong>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default PrivacyPolicy;
