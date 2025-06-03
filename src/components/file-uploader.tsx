"use client";

import { cn } from "@/lib/utils";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import FileCard from "./file-card";

type TFileUploader = {
  onChange?: (files: File[]) => void;
  labelText?: string;
  multiple?: boolean;
  accept?: string;
};

const FileUploader: React.FC<TFileUploader> = ({
  labelText = "Upload Image",
  multiple = false,
  accept,
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const dragRef = React.useRef<HTMLLabelElement>(null);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: File[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      if (selectFiles.length === 0) return;

      if (!multiple && files.length + selectFiles.length > 1) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You can only upload one file",
        });
        return;
      }

      for (const file of selectFiles) {
        tempFiles = [...tempFiles, file];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  useEffect(() => {
    console.log(files);
    if (onChange) onChange(files);
  }, [files]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={onChangeFiles}
      />
      <label
        ref={dragRef}
        htmlFor="file-upload"
        className={cn(
          "flex w-full flex-col items-center justify-center gap-4 rounded-md bg-muted p-40 font-medium text-muted-foreground",
          isDragging ? "border-2 border-primary" : ""
        )}
      >
        <ArrowUpTrayIcon className="h-8 w-8 text-muted-foreground" />
        {labelText}
      </label>
      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((file, i) => (
            <FileCard
              key={i}
              file={file}
              onDelete={() => {
                setFiles((prev) => prev.filter((f) => f.name !== file.name));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
