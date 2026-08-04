import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BlogPost, Translations } from '../types';

interface NewsProps {
  t: Translations['news'];
  onNavigateToPost: (slug: string) => void;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(new Date(date))
    .toUpperCase();

export const News: React.FC<NewsProps> = ({ t, onNavigateToPost }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/blog-posts', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('News request failed');
        return response.json() as Promise<BlogPost[]>;
      })
      .then((data) => {
        setPosts(data);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="news" className="py-16 lg:py-24 bg-qla-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-left uppercase whitespace-nowrap">
            <span className="techpark-accent-slash">/</span> {t.title}
          </h2>
          <div className="techpark-accent-line h-px flex-grow opacity-70" />
        </div>

        {status === 'loading' ? (
          <div className="font-mono text-sm text-gray-500">LOADING NEWS…</div>
        ) : status === 'error' ? (
          <div className="border-l-2 border-red-500/60 pl-6 font-mono text-sm text-gray-400">
            NEWS IS TEMPORARILY UNAVAILABLE.
          </div>
        ) : posts.length === 0 ? (
          <div className="border-l-2 border-white/10 pl-6 font-mono text-sm text-gray-500">
            NO NEWS PUBLISHED YET.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => onNavigateToPost(post.slug)}
                className="group text-left"
              >
                {post.imageUrl ? (
                  <div className="mb-5 aspect-[16/9] overflow-hidden bg-white/5">
                    <img
                      src={post.imageUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="border-l-2 border-white/10 pl-6 py-2 transition-colors duration-300 group-hover:border-blue-500">
                  <span className="text-xs font-mono text-blue-400 mb-2 block">{formatDate(post.publishedAt)}</span>
                  <h3 className="text-xl font-bold text-white mb-3 transition-colors group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-white text-xs font-bold tracking-widest opacity-0 transition-all -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 duration-300">
                    {t.readMore} <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};
