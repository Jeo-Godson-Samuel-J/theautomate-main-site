import { redirect } from "next/navigation";

export default function LoginPage() {
  const portalUrl = process.env.NEXT_PUBLIC_LEARNING_PORTAL_URL || "http://localhost:3001";
  redirect(`${portalUrl}/login`);
}
