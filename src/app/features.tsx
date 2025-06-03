import React from "react";
import FeatureCard from "./feature-card";

const FeatureList = [
  {
    title: "Colors",
    subtitle: "Color Token Generator",
    description: "Primary Color만 설정해주세요\n 그럼 끝입니다.",
    href: "/colors",
  },
  {
    title: "SEO",
    subtitle: "Search Engine Optimization",
    description: "Metadata, OG, jsonld 등\nSEO에 필요한 작업을 한번에",
    href: "/seo",
  },
  {
    title: "Favicon",
    subtitle: "Favicon Generator",
    description: "1024x1024 이미지를 업로드하면\nfavicon을 생성해드립니다.",
    href: "/favicon",
  },
  {
    title: "Utilities",
    subtitle: "Ready to Use Utilities",
    description: "바로 사용할 수 있는 유틸리티들을\n모아놓았습니다.",
    href: "/utilities",
  },
  {
    title: "Examples",
    subtitle: "Component Examples",
    description: "다양한 컴포넌트 예제들을\n확인해보세요.",
    href: "/examples",
  },
];

const Features: React.FC = () => {
  return (
    <section className="flex flex-col gap-6 py-6">
      <h2 className="text-2xl font-bold text-foreground">Features</h2>
      <div className="grid grid-cols-4 gap-4">
        {FeatureList.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            data-aos="fade-up"
            data-aos-easing="ease-out"
            data-aos-duration="500"
            data-aos-delay={`${(index + 1) * 200}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
