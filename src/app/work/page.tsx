import type { Metadata } from "next";
import WorkSpread from "@/components/work/WorkSpread";

export const metadata: Metadata = {
  title: "Learning by Design",
  description:
    "Selected projects, resources and learning experiences — e-learning and course design, training facilitation, resources, and program support.",
};

export default function WorkPage() {
  return <WorkSpread />;
}
