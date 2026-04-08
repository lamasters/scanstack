import { jsPDF } from "jspdf";

export const generatePDF = async (imageUrls: string[]) => {
    if (imageUrls.length === 0) return;

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const a4Width = 210;
    const a4Height = 297;

    for (let i = 0; i < imageUrls.length; i++) {
        if (i > 0) {
            pdf.addPage();
        }

        const imgUrl = imageUrls[i];

        const img = new Image();
        img.src = imgUrl;
        await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if one fails
        });

        const imgRatio = img.width / img.height;
        const a4Ratio = a4Width / a4Height;

        let drawWidth = a4Width;
        let drawHeight = a4Height;

        if (imgRatio > a4Ratio) {
            drawHeight = a4Width / imgRatio;
        } else {
            drawWidth = a4Height * imgRatio;
        }

        const x = (a4Width - drawWidth) / 2;
        const y = (a4Height - drawHeight) / 2;

        pdf.addImage(imgUrl, 'JPEG', x, y, drawWidth, drawHeight);
    }

    pdf.save("scanned_document.pdf");
};
