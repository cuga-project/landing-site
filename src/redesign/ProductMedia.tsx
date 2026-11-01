import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
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
  const launcher = useRef<HTMLButtonElement>(null);
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
        ref={launcher}
        className="ns-screenshot-trigger"
        onClick={() => {
          setFullSize(false);
          setOpen(true);
        }}
        aria-label={`Enlarge screenshot: ${alt}`}
      >
        <img src={src} alt={alt} width={2880} height={src.endsWith("/events.jpg") ? 2560 : 2000} loading={loading} />
        <span>
          <Maximize2 size={14} /> Enlarge screenshot
        </span>
      </button>
      <dialog
        ref={dialog}
        className="ns-image-dialog"
        aria-label="Product screenshot"
        onClose={() => {
          setOpen(false);
          launcher.current?.focus();
        }}
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

export function ProductTourVideo({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) {
  return (
    <>
      <video
        ref={videoRef}
        aria-label="CUGA interface walkthrough"
        controls
        preload="none"
        playsInline
        poster="/images/manager.jpg"
        src="/videos/product-tour.mp4"
      >
        <track kind="captions" src="/videos/product-tour.vtt" srcLang="en" label="English" default />
        Your browser does not support video. <a href="/videos/product-tour.mp4">Download the walkthrough</a>.
      </video>
      <p>
        A direct recording of the CUGA interface with illustrative data. No live agent
        task was executed. <a href="/videos/product-tour.txt">Read the walkthrough steps</a>.
      </p>
    </>
  );
}

export function ProductTour() {
  const launcher = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  return (
    <>
      <button
        ref={launcher}
        className="ns-text-link"
        data-analytics-event="product_tour_open"
        onClick={() => dialog.current?.showModal()}
      >
        <Play size={16} /> Watch the product walkthrough <ArrowUpRight size={16} />
      </button>
      <dialog
        className="ns-tour-dialog"
        aria-label="CUGA interface walkthrough"
        ref={dialog}
        onClose={() => {
          video.current?.pause();
          launcher.current?.focus();
        }}
      >
        <div className="ns-tour-header">
          <span>Inside CUGA / Product walkthrough</span>
          <button
            autoFocus
            aria-label="Close product tour"
            onClick={() => dialog.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <ProductTourVideo videoRef={video} />
      </dialog>
    </>
  );
}
