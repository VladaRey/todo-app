import { ClerkLoaded } from "@clerk/nextjs";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ClerkLoaded>{children}</ClerkLoaded>;
}
