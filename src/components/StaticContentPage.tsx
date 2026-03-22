import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { LocalizedSitePage } from '@/data/site-pages';

interface StaticContentPageProps {
  page: LocalizedSitePage;
}

export default function StaticContentPage({ page }: StaticContentPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden border-b border-border bg-background-alt pt-32 pb-16">
        <div className="aurora-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Chrono-Map
            </p>
            <h1 className="text-4xl font-serif font-bold text-foreground sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {page.description}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/80">
              {page.intro}
            </p>
            <p className="mt-6 text-sm text-muted">
              {page.updatedAt}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {page.sections.map((section) => (
            <article key={section.title} className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-serif font-semibold text-foreground">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-foreground/80">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-foreground/80">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {page.relatedLinks && page.relatedLinks.length > 0 && (
          <section className="mt-10 rounded-3xl bg-primary-dark px-8 py-10 text-white">
            <h2 className="text-2xl font-serif font-semibold">
              {page.relatedTitle}
            </h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent-light hover:text-accent-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>

      <Footer />
    </main>
  );
}
