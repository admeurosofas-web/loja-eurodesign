import Image from 'next/image';

const RATIO = 128 / 29; // eurodesign-logo.png é wordmark horizontal 128×29

/** Logo oficial EuroDesign (public/logo.png). */
export default function Logo({
  height = 54,
  className = '',
}: {
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/eurodesign-logo.png"
      alt="EuroDesign — estofados de couro legítimo"
      width={Math.round(height * RATIO)}
      height={height}
      priority
      className={className}
    />
  );
}
