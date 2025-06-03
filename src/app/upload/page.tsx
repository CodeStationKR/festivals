"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/file-uploader";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Function to generate a unique ID
function generateUniqueId(): string {
  const timestamp = Date.now().toString(36); // Convert timestamp to base36
  const randomStr = Math.random().toString(36).substring(2, 8); // Random string
  return `${timestamp}-${randomStr}`;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  studentsName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  imageFile: z.instanceof(File, {
    message: "Please upload an image file.",
  }),
});

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      studentsName: "",
      description: "",
      imageFile: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      // Generate unique IDs for both the image and the festival record
      const uniqueId = generateUniqueId();
      const fileExt = values.imageFile.name.split(".").pop();
      const fileName = `${uniqueId}.${fileExt}`;
      const filePath = `festival-booths/${fileName}`;

      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("festivals")
        .upload(filePath, values.imageFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL of the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("festivals").getPublicUrl(filePath);

      // Create festival record in database with the same unique ID
      const { error: insertError } = await supabase.from("festivals").insert({
        id: uniqueId,
        title: values.title,
        studentsName: values.studentsName,
        description: values.description,
        imageUrl: publicUrl,
        likes: 0,
      });

      if (insertError) {
        throw insertError;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error creating festival:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Upload Your Festival Booth
          </h1>
          <p className="mt-2 text-muted-foreground">
            Share your festival booth design with other students.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booth Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your booth title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your booth a creative and descriptive title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentsName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be displayed with your booth.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Students picked up ____________________
They gave out _____________________
They run out of _____________________ `}
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tell others about your booth design and what inspired you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageFile"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Booth Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      accept="image/*"
                      onChange={(files) => {
                        if (files.length > 0) {
                          onChange(files[0]);
                        }
                      }}
                      labelText="Upload your booth drawing"
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a drawing or image of your festival booth.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload Booth"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
