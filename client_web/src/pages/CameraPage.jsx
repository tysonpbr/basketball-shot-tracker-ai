import { useEffect, useRef, useState } from 'react';

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const wsRef = useRef(null);

  const [detections, setDetections] = useState([]);
  const [fps, setFps] = useState(0);
  const [videoSize, setVideoSize] = useState({ width: 640, height: 480 });

  const isSending = useRef(false);
  const lastFrameTime = useRef(Date.now());

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          setVideoSize({
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
          });
          videoRef.current.play();
          sendNextFrame(); 
        };
      }
    });

    wsRef.current = new WebSocket('ws://localhost:8000/ws');

    wsRef.current.onmessage = (event) => {
      isSending.current = false;

      const now = Date.now();
      const delta = now - lastFrameTime.current;
      lastFrameTime.current = now;
      setFps(Math.round(1000 / delta));

      const data = JSON.parse(event.data);
      if (data.detections) setDetections(data.detections);

      sendNextFrame();
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const sendNextFrame = () => {
    if (!videoRef.current || !canvasRef.current || isSending.current || wsRef.current?.readyState !== WebSocket.OPEN) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg');
    const base64 = imageData.split(',')[1];
    if (base64) {
      isSending.current = true;
      wsRef.current.send(base64);
    }
  };

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const aspectRatio = videoSize.width / videoSize.height;

  let displayW = screenW;
  let displayH = screenW / aspectRatio;

  if (displayH > screenH) {
    displayH = screenH;
    displayW = screenH * aspectRatio;
  }

  const scaleX = displayW / videoSize.width;
  const scaleY = displayH / videoSize.height;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        style={{
          width: displayW,
          height: displayH,
          objectFit: 'contain',
          position: 'absolute',
        }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div
        style={{
          position: 'absolute',
          width: displayW,
          height: displayH,
          pointerEvents: 'none',
        }}
      >
        {detections.map((det, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: det.x * scaleX,
              top: det.y * scaleY,
              width: det.width * scaleX,
              height: det.height * scaleY,
              border: '2px solid',
              borderColor:
                det.label === 'rim'
                  ? 'red'
                  : det.label === 'ball'
                    ? 'orange'
                    : det.label === 'human'
                      ? 'lime'
                      : 'white',
              color: 'white',
              fontSize: 12,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          >
            {`${det.label}${det.confidence ? ` (${det.confidence}%)` : ''}`}
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'lime',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: 14,
          fontFamily: 'monospace',
        }}
      >
        {`FPS: ${fps}`}
      </div>
    </div>
  );
};

export default CameraPage;
