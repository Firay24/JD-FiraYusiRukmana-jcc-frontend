"use client";

import Button from "@/components/base/Button";
import Card from "@/components/base/Card";
import InputPassword from "@/components/base/Input/InputPassword";
import InputText from "@/components/base/Input/InputText";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <div className="container max-w-[600px]">
        <Card type="border" className="p-8">
          <form className="grid grid-cols-2 gap-4">
            <Link href="/" className="col-span-2 text-neutral-500">
              Back to home
            </Link>
            <InputText label="Username" placeholder="john doe" className="col-span-2" type="text" required onChange={(e) => console.log(e.target.value)} />
            <InputPassword label="Password" placeholder="e.g. Input Password Here..." className="col-span-2" required onChange={(e) => console.log(e.target.value)} />
            <Button className="col-span-2">Sign In</Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
