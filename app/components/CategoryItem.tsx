"use client";

type Props = {
  category: any;
  isActive: boolean;
  onClick: () => void;
};

export default function CategoryItem({ category, isActive, onClick }: Props) {
  return (
    <button
      key={category.name}
      onClick={onClick}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={`p-2 rounded-full border shadow-lg/5 transition-all duration-300
                    ${
                      isActive
                        ? "bg-main border-main text-white"
                        : "border-neutral-200 text-black"
                    }`}
      >
        <category.Icon size={20} />
      </div>

      <span className="text-xs font-medium ">{category.name}</span>
    </button>
  );
}
