export type TAosProps = {
  "data-aos"?: string;
  "data-aos-easing"?: string;
  "data-aos-duration"?: string;
  "data-aos-once"?: string;
  "data-aos-delay"?: string;
};

const defaultOptions: TAosProps = {
  "data-aos": "fade-up",
  "data-aos-easing": "ease-out",
  "data-aos-duration": "500",
  "data-aos-once": "true",
  "data-aos-delay": "0",
};

export function getAosProps(options?: TAosProps): TAosProps {
  return {
    ...defaultOptions,
    ...options,
  };
}
