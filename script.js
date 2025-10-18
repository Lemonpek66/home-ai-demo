// HomeHero AI – Chrome Built-in Prompt API (Vision Overlay Version)

let videoStream = null;
let aiSession = null;

// Initialize Chrome Built-in AI
async function initModel() {
  const resultDiv = document.getElementById("result");
  if (!("ai" in self && "LanguageModel" in self.ai)) {
    resultDiv.innerText = "❌ Built-in AI not available in this version of Chrome.";
    return null;
  }

  const availability = await ai.LanguageModel.availability();
  if (availability === "unavailable") {
    resultDiv.innerText =
      "⚠️ AI model unavailable. Enable Built-in AI in Chrome flags.";
    return null;
  }

  resultDiv.innerText = "✅ AI model ready.";
  return await ai.LanguageModel.create({
    expectedInputs: [{ type: "image" }],
    expectedOutputs: [{ type: "text", languages: ["en"] }],
  });
}

// Start the camera
async function startCamera() {
  const video = document.getElementById("camera");
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = videoStream;
  } catch (err) {
    document.getElementById("result").innerText = "Camera access denied.";
    console.error(err);
  }
}

// Stop the camera
function stopCamera() {
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
    document.getElementById("result").innerText = "Camera stopped.";
  }
}

// Capture current frame
function captureImage() {
  const video = document.getElementById("camera");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg").split(",")[1];
}

// Draw fake bounding boxes for visualization
function drawBoundingBoxes(objects) {
  const overlay = document.getElementById("overlay");
  const video = document.getElementById("camera");
  const ctx = overlay.getContext("2d");

  overlay.width = video.videoWidth;
  overlay.height = video.videoHeight;
  ctx.clearRect(0, 0, overlay.width, overlay.height);

  // Randomly scatter labels to simulate object locations
  objects.forEach(obj => {
    const x = Math.random() * (overlay.width - 120);
    const y = Math.random() * (overlay.height - 80);
    const w = 100 + Math.random() * 50;
    const h = 60 + Math.random() * 40;

    ctx.strokeStyle = "rgba(106, 77, 253, 0.8)";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = "rgba(106, 77, 253, 0.9)";
    ctx.font = "16px Segoe UI";
    ctx.fillText(obj, x + 6, y + 20);
  });
}

// Analyze room using built-in AI
async function analyzeRoom() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerText = "🧠 Analyzing your room...";

  const base64 = captureImage();
  const session = aiSession || (aiSession = await initModel());
  if (!session) return;

  const promptInput = [
    { type: "image", value: base64 },
    {
      type: "text",
      value:
        "Analyze this room photo. List up to 4 visible household chores (e.g., unwashed dishes, clothes on floor, trash bin full, cluttered table). Reply with only the names, separated by commas.",
    },
  ];

  try {
    const response = await session.prompt(promptInput);
    const chores = response
      .split(",")
      .map(c => c.trim())
      .filter(c => c.length);

    if (chores.length === 0) {
      resultDiv.innerText = "✨ Looks clean! No chores detected.";
    } else {
      resultDiv.innerHTML = `<strong>Detected chores:</strong> ${chores.join(", ")}`;
      drawBoundingBoxes(chores);
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerText = "⚠️ Error analyzing image: " + err.message;
  }
}

// Event listeners
document.getElementById("captureBtn").addEventListener("click", analyzeRoom);
document.getElementById("stopBtn").addEventListener("click", stopCamera);
window.addEventListener("load", startCamera);
