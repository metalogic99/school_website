"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { userSchema, TUserForm } from "@/schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserForm>({ resolver: zodResolver(userSchema) });

  const onSubmit = async (data: TUserForm) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res_data = await res.json();

    toast({
      variant: res.ok ? "success" : "destructive",
      title: res.ok ? "Success !!" : "Failed !!",
      description: res_data.message,
    });

    if (res.ok) return router.push("/admin/notice");
  };

  return (
    <div className="flex h-screen w-full justify-center pt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <Input {...register("username")} placeholder="username" />
          <p className="text-xs text-red-500">
            {errors.username && errors.username.message}
          </p>
        </div>
        <div>
          <Input
            {...register("password")}
            type="password"
            placeholder="password"
          />
          <p className="text-xs text-red-500">
            {errors.password && errors.password.message}
          </p>
        </div>
        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <LogIn size={16} />
          )}
          <span className="px-2"> Login</span>
        </Button>
      </form>
    </div>
  );
};

export default page;
