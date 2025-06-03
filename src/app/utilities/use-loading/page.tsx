"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLoading } from "@/components/ui/use-loading";
import React from "react";

const UseLoadingPage: React.FC = () => {
  const { trigger, stop } = useLoading();

  function onClick() {
    trigger();
    setTimeout(() => {
      stop();
    }, 3000);
  }
  return (
    <Container className="flex flex-col gap-6 py-20">
      <h1 className="text-center text-4xl font-bold">Loading Page</h1>
      <pre className="rounded-md bg-foreground p-4 text-background">
        <code>
          {`"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLoading } from "@/components/ui/use-loading";
import React from "react";

type TUseLoadingPage = {};

const UseLoadingPage: React.FC<TUseLoadingPage> = ({}) => {
  const { trigger, stop } = useLoading();

  function onClick() {
    trigger();
    setTimeout(() => {
      stop();
    }, 3000);
  }
  return (
    <Container className="py-20 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center">Loading Page</h1>
      <pre className="p-4 bg-foreground text-background rounded-md">
        <code>
          ...
        </code>
      </pre>
      <Button onClick={onClick}>
        Trigger Loading (3초뒤 로딩이 종료됩니다.)
      </Button>
    </Container>
  );
};

export default UseLoadingPage;
`}
        </code>
      </pre>
      <Button onClick={onClick}>
        Trigger Loading (3초뒤 로딩이 종료됩니다.)
      </Button>
    </Container>
  );
};

export default UseLoadingPage;
