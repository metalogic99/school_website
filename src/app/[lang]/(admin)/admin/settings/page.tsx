"use client";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { securitySchema, TSecuritySchema } from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useState } from "react";
import { changePassword } from "@/server/actions/settings.action";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const FormErr = ({ children }: { children: ReactNode }) => (
  <p className="text-xs text-destructive">{children}</p>
);

const page = () => {
  const [loading, setLoading] = useState(false);
  const [seeCurrentPw, setSeeCurrentPw] = useState(false);
  const [seeNewPw, setSeeNewPw] = useState(false);
  const [seeConfirmPw, setConfirmPw] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TSecuritySchema>({
    resolver: zodResolver(securitySchema),
  });

  async function handleSecurityForm({
    password,
    new_password,
  }: TSecuritySchema) {
    setLoading(true);
    try {
      const { message, error } = await changePassword({
        oldPassword: password,
        newPass: new_password,
      });
      if (error) {
        // return toast.error(error);
        return toast({
          title: "Error !!",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success !!",
          description: message,
          variant: "success",
        });
        reset();
      }
    } catch (err: any) {
      return toast({
        title: "Error !!",
        description: err.message || "Something went wrong !!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSecurityForm)} className="max-w-sm">
        <div className="pb-2">
          <h2 className="text-3xl">Change your password</h2>
        </div>
        <div className="max-w-sm flex-1 space-y-3">
          <div className=" ">
            <Label>Current Password</Label>
            <div className=" flex items-center rounded-lg border p-2 p-2">
              <input
                className=" flex-1 outline-none"
                {...register("password")}
                type={seeCurrentPw ? "text" : "password"}
                placeholder="Enter your old password"
              />
              {seeCurrentPw ? (
                <Eye
                  onClick={() => setSeeCurrentPw(!seeCurrentPw)}
                  size={16}
                  className=" cursor-pointer"
                />
              ) : (
                <EyeOff
                  onClick={() => setSeeCurrentPw(!seeCurrentPw)}
                  size={16}
                  className=" cursor-pointer"
                />
              )}
            </div>
            <FormErr>{errors?.password?.message}</FormErr>
          </div>

          <div>
            <Label>New Password</Label>

            <div className=" flex items-center rounded-lg border p-2 ">
              <input
                className=" flex-1 outline-none"
                {...register("new_password")}
                type={seeNewPw ? "text" : "password"}
                placeholder="Enter a new password"
              />
              {seeNewPw ? (
                <Eye
                  onClick={() => setSeeNewPw(!seeNewPw)}
                  size={16}
                  className=" cursor-pointer"
                />
              ) : (
                <EyeOff
                  onClick={() => setSeeNewPw(!seeNewPw)}
                  size={16}
                  className=" cursor-pointer"
                />
              )}
            </div>

            <FormErr>{errors?.new_password?.message}</FormErr>
          </div>
          <div>
            <Label>Confirm Password</Label>
            <div>
              <div className=" flex items-center rounded-lg border p-2 ">
                <input
                  className=" flex-1 outline-none"
                  type={seeConfirmPw ? "text" : "password"}
                  {...register("confirm_password")}
                  placeholder="Enter a new password"
                />
                {seeConfirmPw ? (
                  <Eye
                    onClick={() => setConfirmPw(!seeConfirmPw)}
                    size={16}
                    className=" cursor-pointer"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setConfirmPw(!seeConfirmPw)}
                    size={16}
                    className=" cursor-pointer"
                  />
                )}
              </div>
            </div>
            <FormErr>{errors?.confirm_password?.message}</FormErr>
          </div>

          <Button disabled={loading}>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default page;
