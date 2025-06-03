import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import React from "react";
import { copyToClipboard } from "./utils";

type TCodeArea = {
  code: string;
};

const CodeArea: React.FC<TCodeArea> = ({ code }) => {
  return (
    <div className="w-full rounded-md bg-foreground">
      <pre className="relative w-full p-6">
        <div className="absolute right-0 top-0 p-6">
          <button
            className="text-xs text-muted-foreground"
            onClick={() => copyToClipboard(code)}
          >
            <ClipboardDocumentIcon className="h-6 w-6" />
            <span className="sr-only">Copy</span>
          </button>
        </div>
        <code className="w-full cursor-text text-sm text-background">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeArea;
