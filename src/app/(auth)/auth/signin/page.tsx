"use client";

import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconBrandGoogle } from "@tabler/icons-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function SignInWithGoogle() {
  const supabase = createClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) console.error("Google Sign-in Error:", error.message);
  };

  return (
    <div className="space-y-4 flex flex-col">
      <Button
        onClick={handleSignIn}
        variant="outline"
        size="lg"
        className="cursor-pointer"
      >
        <IconBrandGoogle className="mr-2" />
        Sign In With Google
      </Button>

      <Button asChild variant="ghost" className="cursor-pointer">
        <Link href="/">
          <IconArrowLeft />
          Go Back Home
        </Link>
      </Button>
    </div>
  );
}
