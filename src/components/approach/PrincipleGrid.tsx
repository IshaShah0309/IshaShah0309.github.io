import {
  GroupIcon,
  EyeIcon,
  BulbIcon,
  SealIcon,
  ChatIcon,
} from "@/components/icons";

/**
 * The five principles, scattered across two staggered rows the way the deck
 * arranges them, a set of marks on the page, not a table.
 */
const PRINCIPLES = [
  { Icon: GroupIcon, label: "Audience-centered", col: "sm:col-start-2", row: "sm:row-start-1" },
  { Icon: EyeIcon, label: "Visual", col: "sm:col-start-4", row: "sm:row-start-1" },
  { Icon: BulbIcon, label: "Clarity", col: "sm:col-start-1", row: "sm:row-start-2" },
  { Icon: SealIcon, label: "Practical", col: "sm:col-start-3", row: "sm:row-start-2" },
  { Icon: ChatIcon, label: "Engaging", col: "sm:col-start-5", row: "sm:row-start-2" },
];

export default function PrincipleGrid() {
  return (
    <ul className="mt-[1em] grid grid-cols-3 gap-x-[0.3em] gap-y-[0.9em] sm:grid-cols-5">
      {/* Set, not staged: these arrive with the page like everything else. */}
      {PRINCIPLES.map(({ Icon, label, col, row }) => (
        <li
          key={label}
          className={`flex cursor-default flex-col items-center gap-[0.35em] text-center ${col} ${row}`}
        >
          <Icon className="h-[2em] w-[2em] shrink-0 text-[#5a4520] transition-colors duration-400 hover:text-maroon" />
          <span className="pg-tiny block leading-[1.25] !text-[calc(var(--ps)*0.0112)] !tracking-[0.04em]">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
