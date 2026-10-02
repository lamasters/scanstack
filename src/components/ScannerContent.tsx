import React from "react";

export const ScannerContent: React.FC = () => {
  return (
    <section
      className="content-section"
      style={{ marginTop: "48px", color: "var(--text-primary)" }}
    >
      {/* Value Proposition & How It Works */}
      <article
        className="glass-panel"
        style={{ marginBottom: "32px", padding: "32px" }}
      >
        <h1
          style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: "16px" }}
        >
          Free Online Document Scanner & Image-to-PDF Converter
        </h1>
        <p
          style={{
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            marginBottom: "24px",
          }}
        >
          Scan receipts, contracts, and notes directly in your web browser.
          Convert physical documents into high-quality, multi-page PDF files
          instantly, without installing third-party mobile applications or
          uploading sensitive files to external servers.
        </p>

        <h2
          style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "16px" }}
        >
          How to Scan and Convert Documents
        </h2>
        <ol
          style={{
            paddingLeft: "20px",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
          }}
        >
          <li style={{ marginBottom: "28px" }}>
            <strong
              style={{ color: "var(--text-primary)", fontSize: "1.05rem" }}
            >
              Capture or Upload:
            </strong>
            <p style={{ margin: "4px 0 12px 0" }}>
              Click "Take Photo" to use your device camera or select "Upload
              Image" to choose an existing file from your storage.
            </p>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                padding: "16px",
                maxWidth: "400px",
                margin: "auto",
                marginTop: "12px",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: "8px",
                  aspectRatio: "1/1",
                  background: "rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src="/assets/scan_example.png"
                  alt="Demonstration of capturing a document against a high-contrast background"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "12px",
                  padding: "10px 12px",
                  background: "rgba(59, 130, 246, 0.1)",
                  borderLeft: "3px solid var(--accent-primary, #3b82f6)",
                  borderRadius: "0 6px 6px 0",
                  fontSize: "0.85rem",
                  color: "var(--text-primary)",
                }}
              >
                💡 <strong>Scan Tip:</strong> Place your document on a
                high-contrast surface (e.g., a white paper on a dark desk).
                Ensure bright, even lighting to prevent harsh hand shadows and
                blurry text.
              </div>
            </div>
          </li>

          <li style={{ marginBottom: "28px" }}>
            <strong
              style={{ color: "var(--text-primary)", fontSize: "1.05rem" }}
            >
              Crop & Adjust:
            </strong>
            <p style={{ margin: "4px 0 12px 0" }}>
              Align the crop corner handles to isolate your document boundary
              and eliminate unwanted background clutter.
            </p>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                padding: "16px",
                maxWidth: "400px",
                margin: "auto",
                marginTop: "12px",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: "8px",
                  aspectRatio: "1/1",
                  background: "rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src="/assets/crop_example.png"
                  alt="Demonstration of adjusting crop handles around document edges"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "12px",
                  padding: "10px 12px",
                  background: "rgba(59, 130, 246, 0.1)",
                  borderLeft: "3px solid var(--accent-primary, #3b82f6)",
                  borderRadius: "0 6px 6px 0",
                  fontSize: "0.85rem",
                  color: "var(--text-primary)",
                }}
              >
                ✂️ <strong>Crop Tip:</strong> Drag the corner handles slightly
                outside the document border so no text is cut off. Straightening
                skew during this step improves final PDF readability.
              </div>
            </div>
          </li>
          <li>
            <strong
              style={{ color: "var(--text-primary)", fontSize: "1.05rem" }}
            >
              Organize & Rotate:
            </strong>{" "}
            Use the rotation tool to adjust page orientation or remove extra
            pages from your document stack.
          </li>
          <li>
            <strong
              style={{ color: "var(--text-primary)", fontSize: "1.05rem" }}
            >
              Export to PDF:
            </strong>{" "}
            Click "Save PDF" to generate and download your final compiled
            document directly in your browser.
          </li>
        </ol>
      </article>

      {/* Feature Highlights Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div className="glass-panel" style={{ padding: "24px" }}>
          <h3
            style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}
          >
            🔒 100% Client-Side Privacy
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            Your files stay on your device. All image processing, cropping, and
            PDF compilation take place locally within your browser.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: "24px" }}>
          <h3
            style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}
          >
            ⚡ No Installation Required
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            Avoid downloading native app store software for occasional scanning
            needs. Works seamlessly across desktop, tablet, and mobile browsers.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: "24px" }}>
          <h3
            style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}
          >
            📄 Multi-Page PDF Export
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            Combine multiple photo scans into a single, organized PDF file ready
            for email attachments or cloud storage uploads.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: "24px" }}>
          <h3
            style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}
          >
            🪄 Automatic Image Enhancement
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            Raw captures are automatically balanced for sharpness, contrast, and
            clarity, maximizing the legibility of your documents.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) */}
      <article className="glass-panel" style={{ padding: "32px" }}>
        <h2
          style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "20px" }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h3
              style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "6px" }}
            >
              Are my uploaded documents safe?
            </h3>
            <p
              style={{
                fontSize: "0.925rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              Yes. Unlike traditional online PDF tools, our application
              processes images entirely inside your browser. No image data or
              document contents are ever transmitted to or stored on an external
              server.
            </p>
          </div>

          <div>
            <h3
              style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "6px" }}
            >
              What image formats are supported?
            </h3>
            <p
              style={{
                fontSize: "0.925rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              You can upload standard image formats including JPEG, PNG, WebP,
              and standard camera photo formats from iOS and Android devices.
            </p>
          </div>

          <div>
            <h3
              style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "6px" }}
            >
              Is this service free to use?
            </h3>
            <p
              style={{
                fontSize: "0.925rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              Yes, this scanner tool is 100% free with no watermarks, account
              registrations, or page limits.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ScannerContent;
