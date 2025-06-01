import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Breadcrumb {
  name: string;
  path: string;
}

interface PageHeadingProps {
  title?: string;
  breadcrumbs?: Breadcrumb[];
}

const prettify = (segment: string) =>
  segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

const PageHeading: React.FC<PageHeadingProps> = ({ title, breadcrumbs }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [autoBreadcrumbs, setAutoBreadcrumbs] = React.useState<Breadcrumb[]>([]);

  React.useEffect(() => {
    if (!breadcrumbs) {
      // Extract path segments from URL
      const segments = pathname.split("/").filter(Boolean);
      const breadcrumbData: Breadcrumb[] = [];
      segments.forEach((segment, idx) => {
        breadcrumbData.push({
          name: prettify(segment),
          path: "/" + segments.slice(0, idx + 1).join("/"),
        });
      });
      setAutoBreadcrumbs([{ name: "Hem", path: "/" }, ...breadcrumbData]);
    }
  }, [pathname, breadcrumbs]);

  const crumbs = breadcrumbs
    ? [{ name: "Hem", path: "/" }, ...breadcrumbs]
    : autoBreadcrumbs;

  return (
    <div className="max-w-7xl mx-auto w-full mb-2 flex md:justify-start">
      <div className="flex flex-col space-y-2">
        {title && (
          <h1 className="text-3xl lg:text-4xl font-semibold text-marianblue">
            {title}
          </h1>
        )}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap">
          {crumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">›</span>}
              {index === crumbs.length - 1 ? (
                <span className="text-base text-gray-600 font-medium">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-base text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PageHeading;
