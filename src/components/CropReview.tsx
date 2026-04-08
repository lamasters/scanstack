import React, { useState, useEffect, useRef } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';

interface Point { x: number; y: number; }
interface Props {
    imageUrl: string;
    onConfirm: (dataUrl: string) => void;
    onCancel: () => void;
}

const CropReview: React.FC<Props> = ({ imageUrl, onConfirm, onCancel }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const [corners, setCorners] = useState<Point[]>([]);
    const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [cvLoaded, setCvLoaded] = useState(false);

    useEffect(() => {
        const checkCv = setInterval(() => {
            if (typeof window !== 'undefined' && (window as any).cv && (window as any).cv.matFromArray) {
                setCvLoaded(true);
                clearInterval(checkCv);
            }
        }, 200);
        return () => clearInterval(checkCv);
    }, []);

    useEffect(() => {
        if (!cvLoaded || !imgRef.current) return;

        const detect = async () => {
            if (!imgRef.current) return;
            const cv = (window as any).cv;
            setIsProcessing(true);

            try {
                const src = cv.imread(imgRef.current);
                const gray = new cv.Mat();
                cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

                const blur = new cv.Mat();
                cv.GaussianBlur(gray, blur, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);

                const edges = new cv.Mat();
                cv.Canny(blur, edges, 75, 200);

                const contours = new cv.MatVector();
                const hierarchy = new cv.Mat();
                cv.findContours(edges, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

                let maxArea = 0;
                let maxContour = null;

                for (let i = 0; i < contours.size(); i++) {
                    const cnt = contours.get(i);
                    const area = cv.contourArea(cnt);
                    if (area > 1000) {
                        const peri = cv.arcLength(cnt, true);
                        const approx = new cv.Mat();
                        cv.approxPolyDP(cnt, approx, 0.02 * peri, true);

                        if (approx.rows === 4 && area > maxArea) {
                            maxArea = area;
                            if (maxContour) maxContour.delete();
                            maxContour = approx.clone();
                        }
                        approx.delete();
                    }
                    cnt.delete();
                }

                let pts: Point[] = [];
                const w = src.cols;
                const h = src.rows;

                if (maxContour) {
                    for (let i = 0; i < 4; i++) {
                        pts.push({ x: maxContour.data32S[i * 2], y: maxContour.data32S[i * 2 + 1] });
                    }
                    pts.sort((a, b) => a.y - b.y);
                    const top = pts.slice(0, 2).sort((a, b) => a.x - b.x);
                    const bottom = pts.slice(2, 4).sort((a, b) => b.x - a.x);
                    pts = [...top, ...bottom];
                } else {
                    const padding = Math.min(w, h) * 0.1;
                    pts = [
                        { x: padding, y: padding },
                        { x: w - padding, y: padding },
                        { x: w - padding, y: h - padding },
                        { x: padding, y: h - padding }
                    ];
                }

                setCorners(pts);

                src.delete(); gray.delete(); blur.delete(); edges.delete(); contours.delete(); hierarchy.delete();
                if (maxContour) maxContour.delete();

            } catch (e) {
                console.error("OpenCV processing error", e);
                const w = imgRef.current.width || 300;
                const h = imgRef.current.height || 400;
                setCorners([{ x: 50, y: 50 }, { x: w - 50, y: 50 }, { x: w - 50, y: h - 50 }, { x: 50, y: h - 50 }]);
            }
            setIsProcessing(false);
        };

        if (imgRef.current.complete) {
            detect();
        } else {
            imgRef.current.onload = detect;
        }
    }, [cvLoaded, imageUrl]);

    useEffect(() => {
        if (!canvasRef.current || !imgRef.current || corners.length !== 4) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imgRef.current;

        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < 4; i++) {
            ctx.lineTo(corners[i].x, corners[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
        ctx.fill();
        ctx.lineWidth = Math.max(4, canvas.width * 0.005);
        ctx.strokeStyle = '#8b5cf6';
        ctx.stroke();

        const radius = Math.max(20, canvas.width * 0.03);
        corners.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.strokeStyle = '#8b5cf6';
            ctx.lineWidth = radius * 0.2;
            ctx.stroke();
        });
    }, [corners]);

    const getPointerCoord = (e: React.PointerEvent) => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        const pt = getPointerCoord(e);
        const canvasPointRadius = canvasRef.current ? Math.max(20, canvasRef.current.width * 0.03) : 20;
        const threshold = canvasPointRadius * 2.5;

        let closestIdx = -1;
        let minDist = Infinity;

        corners.forEach((c, i) => {
            const d = Math.hypot(c.x - pt.x, c.y - pt.y);
            if (d < minDist && d < threshold) {
                minDist = d;
                closestIdx = i;
            }
        });

        if (closestIdx !== -1) {
            setDraggingIdx(closestIdx);
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (draggingIdx === null) return;
        const pt = getPointerCoord(e);
        setCorners(prev => {
            const newCorners = [...prev];
            newCorners[draggingIdx] = pt;
            return newCorners;
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setDraggingIdx(null);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    const cropAndConfirm = () => {
        const cv = (window as any).cv;
        if (!cv || corners.length !== 4 || !imgRef.current) return;

        try {
            const src = cv.imread(imgRef.current);

            const wTop = Math.hypot(corners[1].x - corners[0].x, corners[1].y - corners[0].y);
            const wBot = Math.hypot(corners[2].x - corners[3].x, corners[2].y - corners[3].y);
            const width = Math.max(wTop, wBot);

            const hLeft = Math.hypot(corners[3].x - corners[0].x, corners[3].y - corners[0].y);
            const hRight = Math.hypot(corners[2].x - corners[1].x, corners[2].y - corners[1].y);
            const height = Math.max(hLeft, hRight);

            const dst = new cv.Mat();
            const dsize = new cv.Size(width, height);

            const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
                corners[0].x, corners[0].y,
                corners[1].x, corners[1].y,
                corners[2].x, corners[2].y,
                corners[3].x, corners[3].y
            ]);
            const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
                0, 0,
                width, 0,
                width, height,
                0, height
            ]);

            const M = cv.getPerspectiveTransform(srcTri, dstTri);
            cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

            // Apply a milder grayscale contrast/brightness boost
            // Instead of harsh binary thresholding, we apply alpha=1.3 (contrast), beta=20 (brightness)
            const gray = new cv.Mat();
            cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);

            const scanned = new cv.Mat();
            gray.convertTo(scanned, -1, 1.3, 20);

            const outCanvas = document.createElement('canvas');
            cv.imshow(outCanvas, scanned);
            const dataUrl = outCanvas.toDataURL('image/jpeg', 0.9);

            src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();
            gray.delete(); scanned.delete();

            onConfirm(dataUrl);
        } catch (e) {
            console.error(e);
            onConfirm(imageUrl);
        }
    };

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
                {isProcessing || !cvLoaded ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RefreshCw size={16} className="animate-spin" /> Detecting document borders...
                    </div>
                ) : 'Adjust the corners properly, then confirm.'}
            </p>

            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img ref={imgRef} src={imageUrl} alt="temp" style={{ display: 'none' }} crossOrigin="anonymous" />

                <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '65vh',
                        objectFit: 'contain',
                        touchAction: 'none',
                        cursor: draggingIdx !== null ? 'grabbing' : 'crosshair',
                        borderRadius: '8px'
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <button className="icon-btn" onClick={onCancel} style={{ width: '48px', height: '48px' }}>
                    <X size={24} />
                </button>
                <button
                    className="icon-btn"
                    onClick={cropAndConfirm}
                    disabled={isProcessing || !cvLoaded}
                    style={{
                        width: '64px', height: '64px',
                        background: (isProcessing || !cvLoaded) ? 'rgba(255,255,255,0.1)' : 'var(--accent-primary)',
                        border: '4px solid rgba(255,255,255,0.2)'
                    }}
                >
                    {isProcessing ? <RefreshCw size={28} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={28} />}
                </button>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                <div style={{ width: '48px' }} />
            </div>
        </div>
    );
};

export default CropReview;
