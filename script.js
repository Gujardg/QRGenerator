let qrObj = null;
let uploadedImgData = "";
const defaultImg =
    "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=60";

window.onload = () => {
    setType("upi");
    setTimeout(generateQRCode, 100);
};

function setType(type) {
    document.getElementById("contentType").value = type;
    const dataInput = document.getElementById("qrData");
    const helper = document.getElementById("helperText");

    document.querySelectorAll(".type-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById("btn-" + type).classList.add("active");

    if (type === "upi") {
        dataInput.placeholder = "recipient@upi";
        helper.textContent = "Enter UPI ID (VPA).";
    } else {
        dataInput.placeholder = "https://example.com";
        helper.textContent = "Enter any URL or text.";
    }

    generateQRCode();
}

function updateOpacityDisplay() {
    const val = document.getElementById("bgOpacity").value;
    document.getElementById("opacityValue").textContent = Math.round(val * 100) + "%";
}

function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        uploadedImgData = e.target.result;
        document.getElementById("fileName").textContent = file.name;
        generateQRCode();
    };
    reader.readAsDataURL(file);
}

function clearLogoUpload() {
    uploadedImgData = "";
    document.getElementById("logoImageFile").value = "";
    document.getElementById("fileName").textContent = "Default Placeholder";
    generateQRCode();
}

function generateQRCode() {
    const type = document.getElementById("contentType").value;
    let data = document.getElementById("qrData").value.trim();
    const size = parseInt(document.getElementById("size").value);
    const dotColor = document.getElementById("dotColor").value;
    const useBg = document.getElementById("logoToggle").checked;
    const opacity = parseFloat(document.getElementById("bgOpacity").value);

    const previewArea = document.getElementById("qrPreviewArea");
    const bgLayer = document.getElementById("qrBackgroundLayer");
    const overlayLayer = document.getElementById("qrOverlayLayer");
    const qrContainer = document.getElementById("qrcode");

    if (!data) data = "https://example.com";
    if (type === "upi" && !data.startsWith("upi://")) {
        data = `upi://pay?pa=${data}&pn=Payee&cu=INR`;
    }

    previewArea.style.width = size + "px";
    previewArea.style.height = size + "px";

    const bgSrc = uploadedImgData || defaultImg;

    if (useBg) {
        bgLayer.style.backgroundImage = `url(${bgSrc})`;
        overlayLayer.style.backgroundColor = `rgba(255,255,255,${opacity})`;
    } else {
        bgLayer.style.backgroundImage = "";
        overlayLayer.style.backgroundColor = "transparent";
    }

    qrContainer.innerHTML = "";

    qrObj = new QRCode(qrContainer, {
        text: data,
        width: size,
        height: size,
        colorDark: dotColor,
        colorLight: useBg ? "rgba(0,0,0,0)" : "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}

function downloadQRCode() {
    const qrCanvas = document.querySelector("#qrcode canvas");
    if (!qrCanvas) return;

    const size = qrCanvas.width;
    const useBg = document.getElementById("logoToggle").checked;
    const opacity = parseFloat(document.getElementById("bgOpacity").value);
    const bgSrc = uploadedImgData || defaultImg;

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = size;
    finalCanvas.height = size;
    const ctx = finalCanvas.getContext("2d");

    if (useBg) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = bgSrc;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, size, size);
            ctx.fillStyle = `rgba(255,255,255,${opacity})`;
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(qrCanvas, 0, 0);

            save();
        };
        img.onerror = save;
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(qrCanvas, 0, 0);
        save();
    }

    function save() {
        const link = document.createElement("a");
        link.download = `QR-Code-${Date.now()}.png`;
        link.href = finalCanvas.toDataURL("image/png");
        link.click();
    }
}
