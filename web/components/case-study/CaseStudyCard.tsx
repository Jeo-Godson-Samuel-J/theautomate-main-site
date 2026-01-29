import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy } from '@/constants/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  className = '',
}) => {
  const { title, image, slug } = caseStudy;

  return (
    <div className={`group relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-xl border border-gray-100 ${className}`}>
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        priority={false}
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 transition-all duration-500 bg-black/0 group-hover:bg-black/50">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {title}
          </h3>

          <Link
            href={`/case-studies/${slug}`}
            className="inline-flex items-center justify-center bg-white text-[#163E72] px-10 py-3.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
            aria-label={`Learn more about ${title}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
