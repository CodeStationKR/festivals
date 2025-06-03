import Container from "./ui/container";

const Footer = () => {
  return (
    <footer className="bg-muted">
      <Container className="flex items-start justify-between py-10">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 3.0719C0 1.37534 1.37534 0 3.0719 0H20.9281C22.6247 0 24 1.37534 24 3.0719V20.9281C24 22.6247 22.6247 24 20.9281 24H3.0719C1.37534 24 0 22.6247 0 20.9281V3.0719ZM3.34899 4.57774C3.82885 4.09788 4.60686 4.09788 5.08672 4.57774L11.6401 11.1311C12.12 11.611 12.12 12.389 11.6401 12.8689L5.08672 19.4222C4.60686 19.9021 3.82885 19.9021 3.34899 19.4222C2.86913 18.9424 2.86913 18.1644 3.34899 17.6845L9.03351 12L3.34899 6.31547C2.86913 5.83561 2.86913 5.0576 3.34899 4.57774ZM13.2288 17.3246C12.5501 17.3246 12 17.8747 12 18.5534C12 19.232 12.5501 19.7821 13.2288 19.7821H19.7821C20.4608 19.7821 21.0109 19.232 21.0109 18.5534C21.0109 17.8747 20.4608 17.3246 19.7821 17.3246H13.2288Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xl font-bold text-foreground">CODESTATION</span>
        </div>
        <div className="flex flex-col items-end gap-2 text-sm font-medium">
          <div className="flex gap-2">
            <span className="text-muted-foreground">상호명</span>
            <span className="text-foreground">코드스테이션</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">대표자</span>
            <span className="text-foreground">김민수</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">사업자등록번호</span>
            <span className="text-foreground">760-20-01657</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">문의</span>
            <span className="text-foreground">contact@codestation.kr</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
