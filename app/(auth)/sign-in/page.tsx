import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/api/auth";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { executeAction } from "@/lib/action/execute-action";

const metadata: Metadata = {
  title: "Sign in your account",
};

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";
          await executeAction({
            actionFn: async () => {
              await signIn("credentials", formData);
            },
          });
        }}
      >
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
          autoComplete="current-password"
        />
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm">
        Don&apos;t have an account?
        <Link href="/sign-up" className="text-primary hover:underline"> Sign up</Link>
      </div>
    </div>
  );
};

export { metadata };
export default Page;
