import Container from "@/components/ui/container";
import React from "react";

function Banner() {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-center gap-6 py-40">
        <span
          className="text-4xl font-bold"
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="500"
          data-aos-once="true"
          data-aos-delay="300"
        >
          코드스테이션의, 코드스테이션에 의한, 코드스테이션을 위한
        </span>
        <h1
          className="text-6xl font-black"
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="500"
          data-aos-once="true"
          data-aos-delay="600"
        >
          NEXTJS Boilerplate
        </h1>
      </Container>
    </section>
  );
}

export default Banner;
