import { MyBreadCrumb } from "@/components/etbreadcrumb";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { parseHTMLContent } from "@/lib/parse-html-content";
import PackagesBlock from "@/components/packages-block";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import { getFullImageUrl } from "@/lib/getFullImageUrl";
import InfoSidebar from "@/components/info-sidebar";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const param = await params;
  const slug = param.slug;

  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/info-page/slug/${slug}`;

  const response = await fetch(URL);

  if (response.status === 404) {
    const redirectedSlug =
      response.url.split("/")[response.url.split("/").length - 1];

    if (redirectedSlug && redirectedSlug !== slug) {
      redirect(`/${redirectedSlug}`);
    }
    return notFound();
  }

  if (!response.ok) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  const resJSON = await response.json();
  const blog = resJSON.infoPage;

  return {
    title: `${blog.metaTitle}`,
    description: blog.metaDescription || undefined,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription || undefined,
      images: blog.coverImage || [],
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogSingle({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const param = await params;
  const slug = param.slug;

  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/info-page/slug/${slug}`;
  const response = await fetch(URL);

  if (response.status === 404) {
    const redirectedSlug =
      response.url.split("/")[response.url.split("/").length - 1];

    if (redirectedSlug && redirectedSlug !== slug) {
      redirect(`/${redirectedSlug}`);
    }
    return notFound();
  }

  if (!response.ok) {
    return notFound();
  }

  const resJSON = await response.json();
  const blog = resJSON.infoPage;

  const blocks = parseHTMLContent(decodeHtmlEntities(blog.content));

  const packagesMap = new Map<number, any[]>();
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "packages") {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity?category=${block.config.category}&limit=${block.config.count}`,
          { cache: "no-store" },
        );
        const json = await res.json();
        packagesMap.set(i, json.data);
      } catch {
        packagesMap.set(i, []);
      }
    }
  }

  const breadcrumbItems = [{ label: "Home", href: "/" }];

  breadcrumbItems.push({ label: blog.title, href: "#" });

  return (
    <div className=" max-w-6xl mx-auto">
      <MyBreadCrumb items={breadcrumbItems} />
      <section
        className="pt-8 md:pt-4 p-2
        prose-base leading leading-relaxed
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-h1:text-xl md:prose-h1:text-3xl
        prose-h2:text-xl md:prose-h2:text-3xl   prose-h2:font-bold
        prose-h3:text-base md:prose-h3:text-xl
        prose-h4:text-sm md:prose-h4:text-lg
        prose-p:leading-relaxed prose-p:mb-4 prose-p:mt-0 prose-p:text-base md:prose-p:text-xl
        prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary hover:prose-a:underline
        prose-strong:text-black prose-strong:font-bold
        prose-ul:my-2 prose-ol:my-2
        prose-li:text-black prose-li:mb-1
        prose-blockquote:border-l-4 prose-blockquote:border-primary/70 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
        prose-img:rounded-lg prose-img:my-6
        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
        prose-ul:list-none
        prose-li:relative prose-li:pl-8 prose-li:text-base md:prose-li:text-xl
        prose-li:before:absolute
        prose-li:before:left-0
        prose-li:before:top-[0.45em]
        prose-li:before:w-4 prose-li:before:h-4
        prose-li:before:mask-[url('/icons/highlight.png')]
        prose-li:before:mask-contain
        prose-li:before:mask-no-repeat
        prose-li:before:bg-primary
        prose max-w-none w-full
        wrap-break-word
        **:wrap-break-word
        "
      >
        <header className="border-b border-accent p-2">
          <h1 className="text-3xl md:text-5xl font-bold  leading-tight max-w-4xl">
            {blog?.title}
          </h1>
          <div className="flex justify-between gap-4 text-sm text-foreground w-full mt-4 items-center">
            <div className="flex items-center gap-8">
              <time className="flex items-center">
                Last Updated:{" "}
                {new Date(blog.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </time>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-8 py-4">
          <div className="md:col-span-3 px-2">
            <div>
              {/* Featured Image */}
              {blog.coverImage && (
                <Image
                  src={getFullImageUrl(blog?.coverImage)}
                  alt={blog?.imageAlt || blog?.title}
                  height={1280}
                  width={1920}
                  className="w-full h-auto object-cover mb-8 rounded-lg p-2"
                />
              )}
              {blocks.map((block, i) => {
                if (block.type === "html") {
                  return (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  );
                }

                if (block.type === "packages") {
                  return (
                    <PackagesBlock
                      key={i}
                      packages={packagesMap.get(i) || []}
                    />
                  );
                }

                return null;
              })}
              {/*<BlogRenderer blog={blog?.content} />*/}
            </div>
          </div>
          <InfoSidebar />
        </div>
      </section>
    </div>
  );
}
