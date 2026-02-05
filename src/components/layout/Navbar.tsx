import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="AD" width={32} height={32} />
          <span className="text-xl font-semibold">Anthony Dunn Atelier</span>
        </Link>
      </nav>
    </header>
  );
}
