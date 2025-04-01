import Link from "next/link";

import { auth } from "@/lib/api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/action/sign-up-action";
import { redirect } from "next/navigation";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Create your account",
};

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";
          const res = await signUp(formData);
          if (res.success) {
            redirect("/sign-in");
          }
        }}
      >
        <Input
          name="name"
          placeholder="Name"
          type="text"
          required
          autoComplete="name"
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          autoComplete="new-password"
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>

      <div className="text-center text-sm">
        Already have an account?
        <Link href="/sign-in" className="text-primary hover:underline"> Sign in</Link>
      </div>
    </div>
  );
};

export { metadata }
export default Page;
