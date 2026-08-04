import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPageProps {
  slug: string;
  onBackToNews: () => void;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

const setMetaContent = (selector: string, content: string) => {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
};

export const BlogPage: React.FC<BlogPageProps> = ({ slug, onBackToNews }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found' | 'error'>('loading');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const controller = new AbortController();
    setStatus('loading');
    setPost(null);

    fetch(`/api/blog-posts/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then((response) => {
        if (response.status === 404) {
          setStatus('not-found');
          return null;
        }
        if (!response.ok) throw new Error('Article request failed');
        return response.json() as Promise<BlogPost>;
      })
      .then((data) => {
        if (!data) return;
        setPost(data);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const title = `${post.title} | qla.dev`;
    const url = `${window.location.origin}/blog/${post.slug}`;
    const image = post.imageUrl ? new URL(post.imageUrl, window.location.origin).toString() : `${window.location.origin}/favicon.png`;
    document.title = title;
    document.documentElement.lang = 'en';
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
    setMetaContent('meta[name="title"]', title);
    setMetaContent('meta[name="description"]', post.excerpt);
    setMetaContent('meta[property="og:type"]', 'article');
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', post.excerpt);
    setMetaContent('meta[property="og:image"]', image);
    setMetaContent('meta[property="twitter:url"]', url);
    setMetaContent('meta[property="twitter:title"]', title);
    setMetaContent('meta[property="twitter:description"]', post.excerpt);
    setMetaContent('meta[property="twitter:image"]', image);
  }, [post]);

  return (
    <main className="min-h-screen bg-qla-dark px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-36">
      <article className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={onBackToNews}
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.16em] text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO NEWS
        </button>

        {status === 'loading' ? (
          <div className="min-h-[50vh] font-mono text-sm text-gray-500">LOADING ARTICLE…</div>
        ) : status === 'not-found' ? (
          <div className="min-h-[50vh] border-l-2 border-blue-500 pl-6">
            <h1 className="text-4xl font-black">Article not found.</h1>
            <p className="mt-4 text-gray-400">This news link may have been removed or changed.</p>
          </div>
        ) : status === 'error' || !post ? (
          <div className="min-h-[50vh] border-l-2 border-red-500 pl-6 text-gray-400">The article is temporarily unavailable.</div>
        ) : (
          <>
            <div className="font-mono text-xs tracking-[0.16em] text-blue-400 uppercase">{formatDate(post.publishedAt)}</div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">{post.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl">{post.excerpt}</p>
            {post.imageUrl ? (
              <img src={post.imageUrl} alt="" className="mt-10 aspect-[16/8] w-full object-cover" />
            ) : null}
            <div className="mt-10 whitespace-pre-wrap border-t border-white/10 pt-10 text-base leading-8 text-gray-200 sm:text-lg">
              {post.content}
            </div>
          </>
        )}
      </article>
    </main>
  );
};
