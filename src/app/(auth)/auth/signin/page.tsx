"use client";

import { Button } from "@/components/ui/button";
import { IconBrandGoogle } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";

export default function SignInWithGoogle() {
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
    <Button onClick={handleSignIn} variant="outline" size="lg" className="cursor-pointer">
      <IconBrandGoogle className="mr-2" />
      Sign In With Google
    </Button>
  );
}
