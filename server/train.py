from ultralytics import YOLO
import torch

def main():
    if torch.cuda.is_available():
        device = 0
        print("Using GPU for training.")
    else:
        device = 'cpu'
        print("Using CPU for training.")

    dataset_yaml = 'data.yaml'

    model = YOLO('yolov8n.pt')

    model.train(
        data=dataset_yaml,
        epochs=50,
        imgsz=640,
        batch=16,
        workers=4,
        device=device,
        project='results'
    )

    model.val()

if __name__ == "__main__":
    main()
