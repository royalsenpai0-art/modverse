import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({
  items,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6"
    >
      <div className="rounded-2xl border border-zinc-800 bg-[#111111] px-4 py-3">

        <ol className="flex flex-wrap items-center gap-1 text-[11px] sm:text-sm">

          {items.map((item, index) => {

            const isLast = index === items.length - 1;

            return (

              <li
                key={index}
                className="flex items-center"
              >

                {isLast ? (

                  <span className="rounded-lg bg-orange-500 px-3 py-1 font-semibold text-white">

                    {item.label}

                  </span>

                ) : (

                  <Link
                    href={item.href || "#"}
                    className="rounded-lg px-3 py-1 font-medium text-zinc-300 transition-all duration-300 hover:bg-orange-500 hover:text-white"
                  >

                    {item.label}

                  </Link>

                )}

                {!isLast && (

                  <span className="mx-2 select-none text-zinc-500">

                    ›

                  </span>

                )}

              </li>

            );

          })}

        </ol>

      </div>
    </nav>
  );
}