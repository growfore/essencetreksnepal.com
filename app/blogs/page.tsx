import { BlogCard } from "@/components/card/blog-card";

export default async function BlogPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/published`,
  );

  const resJSON = await res.json();

  const blogs = resJSON.blogs;
  const total = resJSON.pagination?.total;

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Travel Guides
        </h1>
        <p className="text-muted-foreground mt-1">
          {total} article
          {total !== 1 ? "s" : ""} to inspire your next adventure
        </p>
      </div>

      {/* Grid */}
      {blogs?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <p className="text-base md:text-lg">No articles found.</p>
        </div>
      )}
    </div>
  );
}
