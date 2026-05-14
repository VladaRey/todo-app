import { ClerkLoaded } from "@clerk/nextjs";
import { Header } from "@/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <Header />
      {children}
    </ClerkLoaded>
  );
}
