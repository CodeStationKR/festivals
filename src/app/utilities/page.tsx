import Container from "@/components/ui/container";
import Link from "next/link";
import React from "react";

const UtilsPage: React.FC = () => {
  return (
    <Container className="py-20">
      <h1 className="text-center text-4xl font-bold">Utils Page</h1>
      <Link href="/utilities/use-loading">Go to Use Loading Page</Link>
    </Container>
  );
};

export default UtilsPage;
