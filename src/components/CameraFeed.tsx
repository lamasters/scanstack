import React, { useRef, useEffect } from 'react';
import { X, Camera as CameraIcon } from 'lucide-react';

interface Props {
    onCapture: (dataUrl: string) => void;
    onCancel: () => void;
}

const CameraFeed: React.FC<Props> = ({ onCapture, onCancel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let activeStream: MediaStream | null = null;
        const initCamera = async () => {
            try {
                activeStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = activeStream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        };
        initCamera();

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                onCapture(dataUrl);
            }
        }
    };

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: 'auto', maxHeight: '60vh', objectFit: 'contain', display: 'block' }}
                />

                {/* Viewfinder overlay */}
                <div style={{ position: 'absolute', inset: '24px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '12px', pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '20px', height: '20px', borderTop: '4px solid #8b5cf6', borderLeft: '4px solid #8b5cf6', borderRadius: '4px 0 0 0' }} />
                    <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '20px', height: '20px', borderTop: '4px solid #8b5cf6', borderRight: '4px solid #8b5cf6', borderRadius: '0 4px 0 0' }} />
                    <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '20px', height: '20px', borderBottom: '4px solid #8b5cf6', borderLeft: '4px solid #8b5cf6', borderRadius: '0 0 0 4px' }} />
                    <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderBottom: '4px solid #8b5cf6', borderRight: '4px solid #8b5cf6', borderRadius: '0 0 4px 0' }} />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <button className="icon-btn" onClick={onCancel} style={{ width: '48px', height: '48px' }}>
                    <X size={24} />
                </button>
                <button
                    className="icon-btn"
                    onClick={handleCapture}
                    style={{
                        width: '64px', height: '64px',
                        background: 'var(--accent-primary)',
                        border: '4px solid rgba(255,255,255,0.2)'
                    }}
                >
                    <CameraIcon size={28} />
                </button>
                <div style={{ width: '48px' }} /> {/* Spacer */}
            </div>
        </div>
    );
};

export default CameraFeed;
