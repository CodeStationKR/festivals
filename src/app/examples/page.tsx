"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useAlertDialog } from "@/components/ui/use-alert-dialog";
import { useLoading } from "@/components/ui/use-loading";
import Link from "next/link";
import React from "react";
import { useAction } from "@/hooks/use-action";
import { get } from "./actions";

const ExamplesPage: React.FC = () => {
  const { trigger, stop } = useLoading();
  const { open } = useAlertDialog({
    title: "title",
    description: "description",
    onCancel: () => {
      console.log("cancel");
    },
    onConfirm: () => {
      console.log("confirm");
    },
    confirm: "confirm",
    cancel: "cancel",
  });

  const getAction = useAction(get);
  return (
    <Container className="py-20">
      <h1>Examples</h1>
      <p>Examples page</p>
      <Link href="/examples/ai">AI 이미지 생성기</Link>
      <Button
        onClick={() => {
          trigger();
          setTimeout(() => {
            stop();
          }, 3000);
        }}
      >
        loading
      </Button>
      <Button
        onClick={() => {
          open();
        }}
      >
        alert dialog
      </Button>
      <Button onClick={getAction}>error</Button>
    </Container>
  );
};

export default ExamplesPage;
