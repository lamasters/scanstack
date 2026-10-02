import { Camera, Download, FilePlus, RotateCw, Trash2, X } from "lucide-react";
import React, { useState } from "react";

import CameraFeed from "./CameraFeed";
import CropReview from "./CropReview";
import ScannerContent from "./ScannerContent";
import { ScannerSchema } from "../schemas/ScannerSchema";
import { createPortal } from "react-dom";
import { generatePDF } from "../utils/pdfGenerator";

const rotateImage = (dataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.height;
      canvas.height = img.width;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      } else {
        reject("No context");
      }
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
};

const ScannerApp: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"home" | "camera" | "crop">(
    "home",
  );
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const handleCapture = (dataUrl: string) => {
    setTempImage(dataUrl);
    setCurrentView("crop");
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    setImages((prev) => [...prev, croppedDataUrl]);
    setTempImage(null);
    setCurrentView("home");
  };

  const handleCancelCrop = () => {
    setTempImage(null);
    setCurrentView("home");
  };

  const handleDownloadPdf = () => {
    generatePDF(images);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRotate = async (index: number) => {
    try {
      const rotated = await rotateImage(images[index]);
      setImages((prev) => {
        const next = [...prev];
        next[index] = rotated;
        return next;
      });
    } catch (e) {
      console.error("Rotation failed", e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target?.result as string);
        setCurrentView("crop");
      };
      reader.readAsDataURL(file);
    }
  };

  if (currentView === "camera") {
    return (
      <CameraFeed
        onCapture={handleCapture}
        onCancel={() => setCurrentView("home")}
      />
    );
  }

  if (currentView === "crop" && tempImage) {
    return (
      <CropReview
        imageUrl={tempImage}
        onConfirm={handleCropComplete}
        onCancel={handleCancelCrop}
      />
    );
  }

  return (
    <div className="view-wrapper">
      {images.length === 0 ? (
        <div
          className="glass-panel text-center"
          style={{ padding: "60px 20px" }}
        >
          <h2 style={{ marginBottom: "16px", fontWeight: 500 }}>
            No Documents Scanned
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
            Take a picture or upload an image to start scanning documents into a
            PDF.
          </p>
          <div
            style={{ display: "flex", gap: "16px", justifyContent: "center" }}
          >
            <button
              id="btn-take-photo-empty"
              className="btn btn-primary"
              onClick={() => setCurrentView("camera")}
            >
              <Camera size={20} />
              Take Photo
            </button>
            <label id="btn-upload-image-empty" className="btn btn-secondary">
              <FilePlus size={20} />
              Upload Image
              <input
                id="input-file-upload-empty"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="glass-panel">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ fontWeight: 500 }}>
              {images.length} Page{images.length > 1 ? "s" : ""} Scanned
            </h2>
            <button
              id="btn-save-pdf"
              className="btn btn-primary"
              onClick={handleDownloadPdf}
            >
              <Download size={20} />
              Save PDF
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "16px",
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <img
                  src={img}
                  alt={`Page ${i + 1}`}
                  style={{
                    width: "100%",
                    display: "block",
                    aspectRatio: "1/1.414",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setPreviewIndex(i)}
                />
                <button
                  className="icon-btn"
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "48px",
                    background: "rgba(55, 65, 81, 0.8)",
                    borderColor: "transparent",
                    width: "32px",
                    height: "32px",
                  }}
                  onClick={() => handleRotate(i)}
                >
                  <RotateCw size={16} />
                </button>
                <button
                  className="icon-btn"
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "rgba(239, 68, 68, 0.8)",
                    borderColor: "transparent",
                    width: "32px",
                    height: "32px",
                  }}
                  onClick={() => removeImage(i)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <div
              id="btn-take-photo-grid"
              style={{
                border: "2px dashed var(--glass-border)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1/1.414",
                padding: "20px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onClick={() => setCurrentView("camera")}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                className="icon-btn"
                style={{
                  background: "var(--accent-primary)",
                  borderColor: "transparent",
                }}
              >
                <Camera size={20} />
              </div>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  textAlign: "center",
                }}
              >
                Take Photo
              </span>
            </div>

            <label
              id="btn-upload-image-grid"
              style={{
                border: "2px dashed var(--glass-border)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1/1.414",
                padding: "20px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                className="icon-btn"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderColor: "var(--glass-border)",
                }}
              >
                <FilePlus size={20} />
              </div>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  textAlign: "center",
                }}
              >
                Upload File
              </span>
              <input
                id="input-file-upload-grid"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {previewIndex !== null &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
            onClick={() => setPreviewIndex(null)}
          >
            <button
              className="icon-btn"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.1)",
              }}
              onClick={() => setPreviewIndex(null)}
            >
              <X size={24} />
            </button>
            <img
              src={images[previewIndex]}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
      <ScannerContent />
      <ScannerSchema />
    </div>
  );
};

export default ScannerApp;
