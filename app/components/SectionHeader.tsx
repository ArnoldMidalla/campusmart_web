"use client";

import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  linkText?: string;
};

export default function SectionHeader({ title, href, linkText = "See all" }: Props) {
  return (
    <div className="w-full flex justify-between px-6">
      <p className=" text-sm font-medium ">{title}</p>
      {href ? (
        <Link href={href} className="text-main text-sm  ">
          {linkText}
        </Link>
      ) : null}
    </div>
  );
}
