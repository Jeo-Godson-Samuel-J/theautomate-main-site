"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpcomingCourseModal from "../course/UpcomingCourseModal";

interface Props {
  /** slug.current of the course — used to build the /courses/[slug]/plans URL */
  courseSlug: string;
  courseTitle?: string;
  productUuid?: string | null;
}

/**
 * Replaces the old inline plan-dropdown approach.
 * Clicking "View Plans" checks in Sanity if the product ID exists.
 * If yes -> navigates to /courses/[slug]/plans.
 * Else -> shows upcoming product notice.
 */
export default function PlanSelector({ courseSlug, courseTitle, productUuid }: Props) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isChecking) return;
    setIsChecking(true);

    try {
      const res = await fetch(
        `/api/courses/check-product?slug=${encodeURIComponent(courseSlug)}`,
        { cache: "no-store" }
      );
      const data = await res.json();

      if (data.exists) {
        router.push(`/courses/${courseSlug}/plans`);
      } else {
        setShowModal(true);
      }
    } catch (err) {
      console.error("[PlanSelector] Error checking Sanity product ID:", err);
      if (productUuid) {
        router.push(`/courses/${courseSlug}/plans`);
      } else {
        setShowModal(true);
      }
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        disabled={isChecking}
        onClick={handleClick}
        className="w-full rounded-xl bg-[#0A3D62] hover:bg-[#0166A7] text-white py-6 font-semibold flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer disabled:opacity-80"
      >
        {isChecking ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Checking...</span>
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            <span>View Plans</span>
          </>
        )}
      </Button>

      <UpcomingCourseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        courseTitle={courseTitle}
      />
    </>
  );
}
