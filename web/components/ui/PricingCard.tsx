"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Clock,
  LayoutList,
  Trash2,
  CircleSlash,
  ShoppingCart,
} from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { PlanFeatureList } from "@/components/ui/PlanFeatureList";
import { urlFor } from "@/lib/sanity.client";
import { Plan } from "@/lib/types/plan";
import { addToCart, removeFromCart, getCart } from "@/lib/services/cart";
import { getPlanDisplayName } from "@/lib/plan-display";
import { useAuth } from "@/contexts/AuthContext";

interface PricingCardProps {
  bundle: Plan;
  courseSlug?: string;
  /**
   * Sanity courseDetails._id for the course this card belongs to.
   * Required for correct cart identity. When omitted (e.g. the generic
   * /plans page), cart add/remove falls back to plan-level identity.
   */
  courseId?: string;
  /** Human-readable course name stored in the cart item. */
  courseTitle?: string;
  /** Override the primary button label (legacy prop — still respected) */
  buttonLabel?: string;
  /** Override the primary button href entirely (legacy prop — still respected) */
  buttonHref?: string;
  /** When true, shows a "Recommended" badge on the card */
  recommended?: boolean;
}

/**
 * Plan card used on the course plans grid and generic /plans page.
 *
 * - Clicking anywhere on the card navigates to the plan detail page.
 * - Buttons: [Add to Cart]  [Buy Now]
 *   • Premium plan: [View Plan] only (no cart / buy)
 *
 * Cart identity: (courseId ?? bundle._id, bundle._id) so plans are always unique.
 */
export function PricingCard({
  bundle,
  courseSlug,
  courseId,
  courseTitle,
  buttonLabel,
  buttonHref,
  recommended = false,
}: PricingCardProps) {
  const router = useRouter();
  const { isLoggedIn, openAuth } = useAuth();

  const imageUrl = bundle.coverImage
    ? urlFor(bundle.coverImage).width(800).url()
    : "/placeholder.png";

  const batchLabel = bundle.batchOptions?.length
    ? bundle.batchOptions.join(" or ")
    : "Weekday or Weekend";
  const displayName = getPlanDisplayName(bundle);

  // ---------------------------------------------------------------------------
  // Navigation URLs
  // ---------------------------------------------------------------------------
  const badgeSlug = bundle.badge.toLowerCase();
  const titleSlug = bundle.title
    ? bundle.title.toLowerCase().replace(/\s+/g, "-")
    : bundle._id;

  // View-plan href: course-specific → /courses/[slug]/plans/[badgeSlug]
  //                 generic          → /plan/[titleSlug]
  const viewPlanHref = courseSlug
    ? `/courses/${courseSlug}/plans/${badgeSlug}`
    : `/plan/${titleSlug}`;

  const paymentParams = new URLSearchParams();
  // Course identifiers
  if (courseSlug) paymentParams.set("course", courseSlug);
  if (courseId) paymentParams.set("courseId", courseId);
  if (courseTitle) paymentParams.set("courseTitle", courseTitle);
  // Plan details
  paymentParams.set("bundleId", bundle._id);
  paymentParams.set("bundleTitle", displayName);
  paymentParams.set("amount", bundle.price.toString());
  if (bundle.duration) paymentParams.set("duration", bundle.duration);
  const paymentUrl = `/payment?${paymentParams.toString()}`;
  const buyHref = buttonHref ?? paymentUrl;
  const buyLabel = buttonLabel ?? "Buy Now";

  const isPremium = badgeSlug === "premium";

  // ---------------------------------------------------------------------------
  // Cart state — keyed on (resolvedCourseId, bundle._id)
  // ---------------------------------------------------------------------------
  const resolvedCourseId = courseId ?? bundle._id;
  const [addedToCart, setAddedToCart] = useState(false);
  const [isOtherPlanInCart, setIsOtherPlanInCart] = useState(false);

  useEffect(() => {
    const checkCart = () => {
      const cart = getCart();
      const thisPlanInCart = cart.some(
        (item) =>
          item.courseId === resolvedCourseId &&
          item.selectedPlanId === bundle._id,
      );
      const anyPlanInCart = cart.some(
        (item) => item.courseId === resolvedCourseId,
      );
      setAddedToCart(thisPlanInCart);
      setIsOtherPlanInCart(!thisPlanInCart && anyPlanInCart);
    };

    checkCart();
    window.addEventListener("cart-updated", checkCart);
    window.addEventListener("storage", checkCart);
    return () => {
      window.removeEventListener("cart-updated", checkCart);
      window.removeEventListener("storage", checkCart);
    };
  }, [resolvedCourseId, bundle._id]);

  const getCartItemPayload = () => ({
    courseId: resolvedCourseId,
    courseTitle: courseTitle ?? courseSlug ?? displayName,
    courseSlug: courseSlug ?? titleSlug,
    selectedPlanId: bundle._id,
    selectedPlanTitle: displayName,
    selectedPlanPrice: bundle.price,
    thumbnailUrl: bundle.coverImage
      ? urlFor(bundle.coverImage).width(400).url()
      : null,
  });

  /** The actual cart add (called directly when logged in, or deferred after login) */
  const doAddToCart = () => {
    addToCart(getCartItemPayload());
  };

  const handleCartToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (addedToCart) {
      // Remove doesn't need auth guard
      removeFromCart(resolvedCourseId, bundle._id);
      return;
    }

    if (!isLoggedIn) {
      openAuth({ type: "addToCart", payload: getCartItemPayload() });
      return;
    }

    doAddToCart();
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openAuth({ type: "buyNow", payload: buyHref });
      return;
    }

    router.push(buyHref);
  };

  // ---------------------------------------------------------------------------
  // Whole-card click → navigate to view plan page
  // ---------------------------------------------------------------------------
  const handleCardClick = () => {
    router.push(viewPlanHref);
  };

  /** Stop event from bubbling up to the card click handler */
  const stopProp = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col border transition-all duration-300 group relative cursor-pointer
        ${recommended ? "border-[#0166A7] ring-2 ring-[#0166A7]/30" : "border-slate-100"}`}
    >
      {/* Recommended banner */}
      {recommended && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-[#0166A7] text-white text-xs font-bold uppercase tracking-widest text-center py-1.5">
          ⭐ Recommended for this course
        </div>
      )}

      {/* Cover image + badge chip */}
      <div
        className={`h-48 md:h-56 relative overflow-hidden ${recommended ? "mt-8" : ""}`}
      >
        <Image
          src={imageUrl}
          alt={displayName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm border border-slate-100">
          {displayName}
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Rating & Price */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={bundle.rating ?? 5} showNumber size={16} />
          <span className="font-bold text-slate-900 text-lg">
            ₹{bundle.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-slate-900">
          {displayName}
        </h3>
        <p className="text-sm text-slate-500 mb-5">By Auto-Mate</p>

        {/* Metadata */}
        <div className="flex items-center gap-5 text-xs font-medium text-slate-600 mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            {bundle.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <LayoutList className="w-4 h-4 text-slate-400" />
            {batchLabel}
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full mb-6" />

        {/* Feature list */}
        <div className="flex-grow mb-8">
          <PlanFeatureList features={bundle.features ?? []} />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Action buttons — stop propagation so card-click doesn't also fire  */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-auto" onClick={stopProp}>
          {isPremium ? (
            /* Premium: View Plan only */
            <Link href={viewPlanHref} onClick={stopProp}>
              <Button
                variant="outline"
                className="w-full rounded-full border-[#0166A7] text-[#0166A7] font-bold py-6 hover:bg-[#0166A7] hover:text-white hover:border-[#0166A7] transition-all"
              >
                View Plan
              </Button>
            </Link>
          ) : (
            /* Starter / Pro: Add to Cart + Buy Now */
            <div className="flex gap-3">
              {/* Add to Cart */}
              {isOtherPlanInCart ? (
                <div
                  title="Another plan for this course is already in your cart. Remove it first to choose a different plan."
                  className="flex-1 cursor-not-allowed"
                >
                  <Button
                    variant="outline"
                    disabled
                    className="w-full rounded-full font-bold py-6 flex items-center justify-center gap-2 bg-slate-50 text-slate-400 border-slate-200 pointer-events-none"
                  >
                    <CircleSlash className="w-4 h-4" /> Unavailable
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleCartToggle}
                  className={`flex-1 rounded-full font-bold py-6 transition-all flex items-center justify-center gap-2 ${
                    addedToCart
                      ? "bg-[#0166A7] border-[#0166A7] text-white hover:bg-white hover:text-[#0166A7] hover:border-[#0166A7]"
                      : "border-slate-300 text-slate-700 hover:bg-[#0166A7] hover:text-white hover:border-[#0166A7]"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      Added <Trash2 className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </Button>
              )}

              {/* Buy Now */}
              <Button
                className="flex-1 rounded-full bg-[#0166A7] text-white font-bold py-6 hover:bg-[#014f82] transition-all border-0"
                onClick={handleBuyNow}
              >
                {buyLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
