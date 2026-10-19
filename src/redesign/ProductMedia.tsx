import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Maximize2,
  Play,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export function Screenshot({
  src,
  alt,
  loading,
}: {
  src: string;
  alt: string;
  loading?: "lazy";
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [fullSize, setFullSize] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);
  return (
    <>
      <button
        className="ns-screenshot-trigger"
        onClick={() => {
          setFullSize(false);
          setOpen(true);
        }}
        aria-label={`Enlarge screenshot: ${alt}`}
      >
        <img src={src} alt={alt} width={1440} height={830} loading={loading} />
        <span>
          <Maximize2 size={14} /> Enlarge screenshot
        </span>
      </button>
      <dialog
        ref={dialog}
        className="ns-image-dialog"
        aria-label="Product screenshot"
        onClose={() => setOpen(false)}
      >
        <div className="ns-media-toolbar">
          <span>Product screenshot · sample data</span>
          <div>
            <button
              onClick={() => setFullSize(!fullSize)}
              aria-pressed={fullSize}
            >
              {fullSize ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              {fullSize ? "Fit image" : "Actual size"}
            </button>
            <a href={src} target="_blank" rel="noopener noreferrer">
              Open original <ArrowUpRight size={16} />
            </a>
            <button
              autoFocus
              aria-label="Close screenshot"
              onClick={() => dialog.current?.close()}
            >
              <X size={22} />
            </button>
          </div>
        </div>
        <div className={`ns-image-scroll${fullSize ? " ns-image-full" : ""}`}>
          <img src={src} alt={alt} />
        </div>
      </dialog>
    </>
  );
}

export function ProductTour() {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  return (
    <>
      <button
        className="ns-text-link"
        onClick={() => dialog.current?.showModal()}
      >
        <Play size={16} /> Watch the product tour <ArrowUpRight size={16} />
      </button>
      <dialog
        className="ns-tour-dialog"
        aria-label="CUGA product tour"
        ref={dialog}
        onClose={() => video.current?.pause()}
      >
        <div className="ns-tour-header">
          <span>Inside CUGA / Product tour</span>
          <button
            aria-label="Close product tour"
            onClick={() => dialog.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <video
          ref={video}
          controls
          preload="none"
          playsInline
          src="/videos/product-tour.mp4"
        />
        <p>
          Current product UI with illustrative data. This tour does not show a
          live agent run.
        </p>
      </dialog>
    </>
  );
}
