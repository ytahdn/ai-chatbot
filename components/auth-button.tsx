
'use client'
import Link from "next/link";
import { Button } from "./ui/button";

import { LogoutButton } from "./logout-button";
import { createClient } from "@/lib/supabase/client";
import { useRequest } from "ahooks";

export function AuthButton() {

  const { data: user } = useRequest(async () => {
    const supabase = await createClient();

    // You can also use getUser() which will be slower.
    const { data } = await supabase.auth.getClaims();
    return data?.claims;

  }, {});

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
