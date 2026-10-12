import { redirect } from "next/navigation";

export default function LoginPage() {
  const portalUrl = process.env.NEXT_PUBLIC_LEARNING_PORTAL_URL;
  if (!portalUrl) {
    redirect("/");
  }
  redirect(`${portalUrl}/login`);
}
