import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative w-full h-96 my-8">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Blog image'}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    ),
    callToAction: ({ value, isInline }) => 
      isInline ? (
        <Link href={value.url} className="text-blue-500 hover:underline">
          {value.text}
        </Link>
      ) : (
        <div className="my-8">
          <Link
            href={value.url}
            className="bg-blue-600 text-white px-6 py-3 rounded-md inline-block hover:bg-blue-700 transition"
          >
            {value.text}
          </Link>
        </div>
      ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-blue-500 hover:underline">
          {children}
        </Link>
      );
    },
    highlight: ({ children }) => (
      <span className="bg-yellow-200 px-1">{children}</span>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-4">{children}</h4>,
    normal: ({ children }) => <p className="my-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-2">{children}</li>,
    number: ({ children }) => <li className="my-2">{children}</li>,
  },
};

export default portableTextComponents;
