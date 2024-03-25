import NextLink from "next/link";
import { Doc } from "docs/contentlayer/generated";
import { Button } from "@nextui-org/react";

import { docsConfig } from "@/config/docs";
import Icons from "@/components/icons";

interface DocsPagerProps {
  doc: Doc;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager) {
    return <div>Nothing next</div>;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Button
          as={NextLink}
          href={pager.prev.href}
          startContent={<Icons.ChevronLeftIcon size={20} />}
          color="primary"
          variant="light"
          radius="full"
          className="hover:bg-accent/50"
        >
          {pager.prev.title}
        </Button>
      )}
      {pager?.next && (
        <Button
          as={NextLink}
          href={pager.next.href}
          endContent={<Icons.ChevronRIghtIcon size={20} />}
          color="primary"
          variant="light"
          radius="full"
          className="hover:bg-accent/50"
        >
          {pager.next.title}
        </Button>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === String(link?.href).replace("/docs/", ""),
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: { items?: any }[]): any {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link);
  }, []);
}
