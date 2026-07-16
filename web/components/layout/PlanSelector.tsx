"use client";

import { useState } from "react";
import Link from "next/link";
import { Plan } from "@/lib/types/course";

interface Props {
    plans: Plan[];
}

export default function PlanSelector({ plans }: Props) {

    const [open, setOpen] = useState(false);

    return (

        <div>

            <button
                onClick={() => setOpen(!open)}
                className="w-full rounded-xl bg-midnightBlue text-white py-4 font-semibold"
            >

                Add to Cart

            </button>

            {open && (

                <div className="mt-5 space-y-4">

                    {plans.map(plan => (

                        <Link
                            key={plan._id}
                            href={`/checkout?plan=${plan._id}`}
                            className="block rounded-xl border p-4 hover:bg-blue-50 transition"
                        >

                            <div className="font-bold">
                                {plan.title}
                            </div>

                            <div className="text-sm text-gray-500">
                                ${plan.price}
                            </div>

                        </Link>

                    ))}

                </div>

            )}

        </div>

    );

}