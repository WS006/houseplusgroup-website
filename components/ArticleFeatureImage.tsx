import Image from 'next/image';
type ArticleFeatureImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function ArticleFeatureImage({
  src,
  alt,
  priority = false,
}: ArticleFeatureImageProps) {
  return (
    <figure className="mx-auto mb-12 max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.12)] md:mb-16 md:rounded-[2.5rem]">
      <Image
        src={src}
        alt={alt} width={1200} height={800}
        title={alt}
        className="aspect-[16/10] w-full object-cover object-center md:aspect-[16/9]"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
       sizes="100vw" />
    </figure>
  );
}
