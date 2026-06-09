"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, Camera, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploaderProps {
  /** Max number of photos (default 5) */
  maxPhotos?: number;
  /** Initial photo URLs */
  photos?: string[];
  /** Called with array of data URLs whenever photos change */
  onChange?: (photos: string[]) => void;
  /** Layout: compact square grid or horizontal strip */
  variant?: "grid" | "strip";
  /** Size of each photo slot in pixels */
  size?: number;
  className?: string;
}

export function PhotoUploader({
  maxPhotos = 5,
  photos: initialPhotos = [],
  onChange,
  variant = "grid",
  size = 120,
  className,
}: PhotoUploaderProps) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updatePhotos = useCallback(
    (next: string[]) => {
      setPhotos(next);
      onChange?.(next);
    },
    [onChange]
  );

  const addPhotos = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const remaining = maxPhotos - photos.length;
      if (remaining <= 0) return;

      const toProcess = Array.from(files).slice(0, remaining);
      const readers = toProcess.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            if (!file.type.startsWith("image/")) {
              reject(new Error("Not an image"));
              return;
            }
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      Promise.allSettled(readers).then((results) => {
        const newPhotos = results
          .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
          .map((r) => r.value);
        updatePhotos([...photos, ...newPhotos]);
      });
    },
    [photos, maxPhotos, updatePhotos]
  );

  const removePhoto = useCallback(
    (index: number) => {
      updatePhotos(photos.filter((_, i) => i !== index));
    },
    [photos, updatePhotos]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      addPhotos(e.dataTransfer.files);
    },
    [addPhotos]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const canAdd = photos.length < maxPhotos;

  if (variant === "strip") {
    return (
      <div className={cn("flex gap-3 overflow-x-auto pb-2 -mx-1 px-1", className)}>
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative shrink-0 rounded-2xl overflow-hidden border border-slate-200 group"
            style={{ width: size, height: size }}
          >
            <img
              src={photo}
              alt={`Фото ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removePhoto(i)}
              className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {canAdd && (
          <button
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "shrink-0 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-sky-500 hover:border-sky-400 transition-colors",
              dragOver && "border-sky-400 text-sky-500 bg-sky-50"
            )}
            style={{ width: size, height: size }}
          >
            <ImagePlus className="w-6 h-6" />
            <span className="text-[10px] font-medium">Добавить</span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addPhotos(e.target.files)}
        />
      </div>
    );
  }

  return (
    <div className={cn("grid gap-3", className)} style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))` }}>
      {photos.map((photo, i) => (
        <div
          key={i}
          className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group"
        >
          <img
            src={photo}
            alt={`Фото ${i + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <button
              onClick={() => removePhoto(i)}
              className="w-8 h-8 bg-white/90 hover:bg-red-500 hover:text-white text-slate-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Number badge */}
          <div className="absolute top-2 left-2 w-5 h-5 bg-black/50 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {i + 1}
          </div>
        </div>
      ))}

      {canAdd && (
        <button
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all",
            dragOver
              ? "border-sky-400 text-sky-500 bg-sky-50 scale-[1.02]"
              : "border-slate-300 text-slate-400 hover:text-sky-500 hover:border-sky-400 hover:bg-sky-50/50"
          )}
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium">
            {photos.length === 0 ? "Загрузить фото" : `Ещё (${maxPhotos - photos.length})`}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addPhotos(e.target.files)}
      />
    </div>
  );
}

/** Simpler avatar uploader for profile pictures */
export function AvatarUploader({
  currentAvatar,
  onChange,
  size = 120,
  className,
}: {
  currentAvatar?: string;
  onChange?: (dataUrl: string) => void;
  size?: number;
  className?: string;
}) {
  const [avatar, setAvatar] = useState<string | undefined>(currentAvatar);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (files: FileList | null) => {
      if (!files?.[0]) return;
      const file = files[0];
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatar(result);
        onChange?.(result);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-full overflow-hidden border-4 border-white shadow-lg group"
        style={{ width: size, height: size }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Аватар"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
            <Camera className="w-8 h-8 text-sky-400" />
          </div>
        )}

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 transition-opacity",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Camera className="w-5 h-5 text-white" />
          <span className="text-[10px] font-semibold text-white">
            {avatar ? "Изменить" : "Добавить"}
          </span>
        </div>
      </button>

      {avatar && (
        <button
          type="button"
          onClick={() => {
            setAvatar(undefined);
            onChange?.("");
          }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />
    </div>
  );
}
