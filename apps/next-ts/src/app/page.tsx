import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Button type="button" variant="outline" className="bg-primary">
        Hello
      </Button>
      <Link href="/samples/hydrate">Hydrate</Link>
      <Link href="/samples/mock">Mock</Link>
    </main>
  );
}
