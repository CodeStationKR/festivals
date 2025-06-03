import {
  DocumentChartBarIcon,
  DocumentIcon,
  DocumentTextIcon,
  PaperClipIcon,
  PhotoIcon,
  PresentationChartBarIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";

type TFileCard = {
  file: File;
  onDelete?: () => void;
};
const FileCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TFileCard
>(({ file, onDelete }) => {
  function formatFileSize(size: number): string {
    if (size >= 1073741824) {
      return `${(size / 1073741824).toFixed(2)} GB`;
    }
    if (size >= 1048576) {
      return `${(size / 1048576).toFixed(2)} MB`;
    }
    if (size >= 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    }
    return `${size} bytes`;
  }
  return (
    <div className="flex w-full items-center justify-between rounded-md border p-4">
      <div className="flex items-center gap-4">
        <FileIcon type={file.type} />
        <div>{file.name}</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {formatFileSize(file.size)}
        </span>
        <button onClick={onDelete}>
          <XMarkIcon className="h-4 w-4 cursor-pointer text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
});

FileCard.displayName = "FileCard";

export default FileCard;

type TFileIcon = {
  type: string;
};

const FileIcon: React.FC<TFileIcon> = ({ type }) => {
  if (type.includes("image")) {
    return <PhotoIcon className="h-6 w-6 text-muted-foreground" />;
  }
  if (type.includes("pdf")) {
    return <DocumentIcon className="h-6 w-6 text-muted-foreground" />;
  }
  if (type.includes("word")) {
    return <DocumentTextIcon className="h-6 w-6 text-muted-foreground" />;
  }
  if (type.includes("excel")) {
    return <DocumentChartBarIcon className="h-6 w-6 text-muted-foreground" />;
  }
  if (type.includes("powerpoint")) {
    return (
      <PresentationChartBarIcon className="h-6 w-6 text-muted-foreground" />
    );
  }
  if (type.includes("video")) {
    return <VideoCameraIcon className="h-6 w-6 text-muted-foreground" />;
  }
  return <PaperClipIcon className="h-6 w-6 text-muted-foreground" />;
};
