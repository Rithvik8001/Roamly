"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ItineraryReader({ content }: { content: string }) {
  const headings = useMemo(() => {
    const result: { level: number; text: string; id: string }[] = [];
    const lines = content.split("\n");
    for (const line of lines) {
      const m = /^(##+)\s+(.*)$/.exec(line.trim());
      if (m) {
        const level = m[1].length; // 2 -> h2, 3 -> h3
        const text = m[2].trim();
        const id = slugify(text);
        result.push({ level, text, id });
      }
    }
    return result.slice(0, 50);
  }, [content]);

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <aside className="hidden md:block">
        <div className="sticky top-4 border rounded-lg p-3">
          <div className="text-sm font-medium mb-2">Table of contents</div>
          <nav className="space-y-1 text-sm">
            {headings.length === 0 && (
              <div className="text-muted-foreground">No sections detected</div>
            )}
            {headings.map((h, idx) => (
              <a
                key={`${h.id}-${idx}`}
                href={`#${h.id}`}
                className={`block hover:underline ${
                  h.level >= 3 ? "pl-4" : ""
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, children, ...props }) => {
              const text = String(children as any[]);
              const id = slugify(text);
              return (
                <details open className="group border-b pb-2">
                  <summary
                    id={id}
                    className="cursor-pointer list-none text-xl font-semibold flex items-center"
                  >
                    <span className="mr-2">{children}</span>
                    <span className="ml-auto text-sm text-muted-foreground group-open:hidden">
                      (expand)
                    </span>
                    <span className="ml-auto text-sm text-muted-foreground hidden group-open:inline">
                      (collapse)
                    </span>
                  </summary>
                  <div className="mt-2">
                    {/* h2 content will follow as siblings; markdown renders sequentially */}
                  </div>
                </details>
              );
            },
            h3: ({ node, children, ...props }) => {
              const text = String(children as any[]);
              const id = slugify(text);
              return (
                <h3 id={id} className="mt-6 text-lg font-semibold">
                  {children}
                </h3>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
