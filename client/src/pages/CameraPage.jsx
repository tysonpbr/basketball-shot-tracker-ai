import { useEffect, useRef, useState } from 'react';

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [videoSize, setVideoSize] = useState({ width: 640, height: 480 });
  const wsRef = useRef(null);

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
        };
      }
    });

    wsRef.current = new WebSocket('ws://localhost:8000/ws');

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.detections) setDetections(data.detections);
    };

    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);

      const imageData = canvas.toDataURL('image/jpeg');
      const base64 = imageData.split(',')[1];
      if (base64 && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(base64);
      }
    }, 50);

    return () => {
      clearInterval(interval);
      wsRef.current?.close();
    };
  }, []);

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
    </div>
  );
};

export default CameraPage;
