import Container from "@/components/ui/container";
import Banner from "./banner";
import Features from "./features";

export default function Home() {
  return (
    <>
      <Banner />
      <Container>
        <Features />
      </Container>
    </>
  );
}
