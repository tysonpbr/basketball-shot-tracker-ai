from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import numpy as np
import cv2
import base64

app = FastAPI()
model = YOLO("results/train/weights/best.pt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("connection open")
    try:
        while True:
            data = await websocket.receive_text()
            img_data = base64.b64decode(data)
            nparr = np.frombuffer(img_data, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            results = model(frame, verbose=False)[0]
            detections = []

            for box in results.boxes.data.tolist():
                x1, y1, x2, y2, conf, cls = box
                detections.append({
                    "x": int(x1),
                    "y": int(y1),
                    "width": int(x2 - x1),
                    "height": int(y2 - y1),
                    "label": model.names[int(cls)],
                    "confidence": round(conf * 100, 1)
                })

            await websocket.send_json({"detections": detections})

    except WebSocketDisconnect:
        print("Client disconnected cleanly.")
    except Exception as e:
        print("WebSocket error:", e)
    finally:
        print("connection closed")
