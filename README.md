# 🏠 HomeHero AI – Vision Assistant (Chrome Built-in AI Challenge 2025)

**See the mess. Be the hero.**

HomeHero AI helps husbands (and anyone, really!) visually identify housework tasks using the **Chrome Built-in Prompt API**.  
By scanning a room through the camera, the app detects chores — like dishes, trash, laundry — and suggests what to do next.

---

## ✨ Inspiration

It started from a simple idea:  
> “Many men want to help at home but simply *don’t notice* what needs to be done.”  

That inspired us to build an app that *literally sees the mess* using AI.

---

## 🧠 What We Built

- Chrome Web App using **Prompt API** (Built-in AI)
- Uses **camera feed** via `getUserMedia()`
- Captures an image and sends it to AI for analysis
- AI suggests visible chores in friendly, human terms
- Visual “bounding boxes” appear over the video to mark detected areas

---

## 🧰 Technologies Used

| Category | Tool |
|-----------|------|
| Language | JavaScript (ES Modules) |
| Framework | None (pure HTML/CSS/JS) |
| Browser API | Chrome Built-in AI – `ai.LanguageModel` |
| Camera | `navigator.mediaDevices.getUserMedia()` |
| Hosting | Local HTTP server / GitHub Pages |
| Visualization | Canvas overlay for bounding boxes |

---

## 🧩 How to Run Locally

1. Use Chrome Canary or Dev (v127+)
2. Enable: chrome://flags/#prompt-api
3. Run:
```bash
python3 -m http.server 8080
4.Visit http://localhost:8080
5.Allow camera and click 📸 Capture & Analyze




