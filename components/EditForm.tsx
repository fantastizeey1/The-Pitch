// components/EditForm.tsx
"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { updateProfile } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface EditFormProps {
  user: {
    id: string; // Ensure user has an ID for updates
    username: string;
    bio: string;
    link: string;
  };
}

const EditForm: React.FC<EditFormProps> = ({ user }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        username: formData.get("username") as string,
        bio: formData.get("bio") as string,
        link: formData.get("link") as string,
      };

      await formSchema.parseAsync(formValues);

      const result = await updateProfile(prevState, formData); // Pass user ID and values

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your Profile Has Been Updated Successfully",
        });

        router.push(`/user/${result._id}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error has occurred",
          variant: "destructive",
        });
      }
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="username" className="startup-form_label">
          Username
        </label>
        <Input
          id="username"
          name="username"
          className="startup-form_input"
          required
          defaultValue={user.username} // Prepopulate with existing value
          placeholder="Username"
        />
        {errors.username && (
          <p className="startup-form_error">{errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="bio" className="startup-form_label">
          Bio
        </label>
        <Textarea
          id="bio"
          name="bio"
          className="startup-form_textarea"
          required
          defaultValue={user.bio} // Prepopulate with existing value
          placeholder="Tell us about yourself"
        />
        {errors.bio && <p className="startup-form_error">{errors.bio}</p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          defaultValue={user.link} // Prepopulate with existing value
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default EditForm;
