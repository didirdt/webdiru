import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

/**
 * Markdown -> sanitized HTML.
 *
 * The pipeline is deliberately synchronous: the project loader runs inside a
 * Server Component during prerender, and a synchronous pipeline keeps the whole
 * data layer free of any request-time I/O (required by `cacheComponents`).
 *
 * Raw HTML in the source markdown is dropped by `remark-rehype`, and
 * `rehype-sanitize` is a second line of defence on the generated tree.
 */
const processor = remark()
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

export function renderMarkdown(markdown: string): string {
  return String(processor.processSync(markdown));
}
