"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ArrowRight } from "@/components/icons";

export type GalleryModalItem = {
  id?: string;
  image: string;
  title: string;
  category?: string;
  description?: string;
};

export type NewsModalItem = {
  id?: string;
  image: string;
  title: string;
  category?: string;
  date?: string;
  excerpt?: string;
  body?: string;
};

type Props =
  | {
      type: "gallery";
      item: GalleryModalItem;
      items: GalleryModalItem[];
      onClose: () => void;
      onNavigate: (index: number) => void;
    }
  | {
      type: "news";
      item: NewsModalItem;
      onClose: () => void;
    };

export default function ContentDetailModal(props: Props) {
  const { item, onClose } = props;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (props.type === "gallery") {
        const currentIndex = props.items.indexOf(props.item);
        if (event.key === "ArrowRight") props.onNavigate((currentIndex + 1) % props.items.length);
        if (event.key === "ArrowLeft") props.onNavigate((currentIndex - 1 + props.items.length) % props.items.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose, props]);

  const isGallery = props.type === "gallery";
  const body = isGallery ? item.description : item.body || item.excerpt;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03160b]/80 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-2xl sm:rounded-[2rem]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-xl font-bold text-white backdrop-blur transition hover:bg-black/80"
        >
          ×
        </button>

        <div className="grid min-h-0 overflow-y-auto lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[260px] bg-[#03160b] sm:min-h-[360px] lg:min-h-[560px]">
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>

          <div className="min-h-0 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-[#0c8f3e]">
              {item.category && <span>{item.category}</span>}
              {item.category && (item.date || isGallery) && <span className="h-1 w-1 rounded-full bg-[#ff1d2d]" />}
              {item.date && <span>{item.date}</span>}
              {isGallery && !item.date && <span>Ssemuyaba Foundation</span>}
            </div>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#07110a] sm:text-3xl lg:text-4xl">{item.title}</h2>
            {body && (
              <div className="mt-5 max-h-[34vh] overflow-y-auto pr-2 text-sm leading-7 text-black/65 sm:text-base">
                {body.split(/\n\s*\n|\n/).map((paragraph, index) => (
                  paragraph.trim() ? <p key={index} className="mb-4 last:mb-0">{paragraph.trim()}</p> : null
                ))}
              </div>
            )}

            {galleryProps && (
              <div className="mt-7 border-t border-black/5 pt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[.15em] text-black/40">Browse gallery</span>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => galleryProps.onNavigate((galleryProps.items.indexOf(galleryProps.item) - 1 + galleryProps.items.length) % galleryProps.items.length)} className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-[#087a35] transition hover:bg-[#f1fbf5]" aria-label="Previous gallery item">←</button>
                    <button type="button" onClick={() => galleryProps.onNavigate((galleryProps.items.indexOf(galleryProps.item) + 1) % galleryProps.items.length)} className="grid h-9 w-9 place-items-center rounded-full bg-[#0c8f3e] text-white transition hover:bg-[#087a35]" aria-label="Next gallery item"><ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {galleryProps.items.map((galleryItem, index) => (
                    <button
                      key={galleryItem.id || galleryItem.title + index}
                      type="button"
                      onClick={() => props.onNavigate(index)}
                      aria-label={"Open " + galleryItem.title}
                      className={"relative h-16 w-20 shrink-0 overflow-hidden rounded-xl ring-2 transition " + (galleryItem === props.item ? "ring-[#13d74c]" : "ring-transparent hover:ring-black/10")}
                    >
                      <Image src={galleryItem.image} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
