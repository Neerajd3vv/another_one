import Button from "../components/button";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 of characters"),
});
function Signup() {
  const navigate = useNavigate();
  type singupFormType = z.infer<typeof signupSchema>;

  const signupFunction = async (data: singupFormType) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    // return response.json();
  };

  const signupMutation = useMutation({
    mutationFn: signupFunction,
    onSuccess: () => {
      toast.success(" User registered, Now Login to continue...");
      navigate("/login");
    },
    onError: (error: { message: string }) => {
      if (error.message === "User already exists with this email") {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<singupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const submitClicked = (data: singupFormType) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(submitClicked)}
        className="h-[314px] w-[320px] flex flex-col gap-[48px]"
      >
        <h2 className="font-custom-font text-center w-full h-[38px] text-[#232323] font-bold text-[30px] leading-[38px] tracking-[0%]  ">
          Register
        </h2>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[2px]">
            <Input
              {...register("email")}
              type="string"
              placeholder="UID"
              className="w-[320px] h-[48px] border border-[#D6D6D6] bg-white 
             shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
             rounded-[8px] px-[14px] py-[12px]  
             font-custom-font font-medium text-[16px] leading-[24px] tracking-[0%] 
             text-[#808080]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-[2px]">
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-[320px] h-[48px] border border-[#D6D6D6] bg-white 
             shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
             rounded-[8px] px-[14px] py-[12px]  
             font-custom-font font-medium text-[16px] leading-[24px] tracking-[0%] 
             text-[#808080]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>
        {signupMutation.isPending ? (
          <Button
            type="submit"
            className="bg-[#2B3A67] border-[#2B3A67] font-custom-font font-semibold text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC] w-full h-[60px] rounded-[8px]  py-[16px] flex justify-center items-center "
          >
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={signupMutation.isPending}
            className="bg-[#2B3A67] cursor-pointer border-[#2B3A67] font-custom-font font-semibold text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC] w-full h-[60px] rounded-[8px]  py-[16px] flex justify-center items-center "
          >
            Sign up
          </Button>
        )}
      </form>
    </div>
  );
}

export default Signup;
