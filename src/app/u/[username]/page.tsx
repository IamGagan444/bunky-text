"use client";
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
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/schemas/messageSchema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function QuestionsPage() {
  const params = useParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/suggest-message");
      const data = await response.json();
      if (data.questions) {
        setQuestions(data.questions);
      } else {
        throw new Error("No questions received");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions(["Failed to fetch questions. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    const content = data?.content;
    console.log("submit");
    setSubmitLoading(true);
    try {
      const response = await axios.post("/api/send-message", {
        username: params?.username,
        content,
      });
      console.log(response);
      toast({
        title: "message sent successfully",
        description: "your message has been sent successfully",
        variant: "default",
      });
      setSubmitLoading(false)
    } catch (error) {
      console.log("error while texting", error);
      toast({
        title: "some thing went wrong",
        description: "server issue while texting",
        variant: "destructive",
      });
      setSubmitLoading(false)
    }
  };

  if (submitLoading) {
    return (
      <div className="h-dvh w-full fixed inset-0 bg-gray-50 dark:bg-neutral-900 flex items-center justify-center z-50 ">
        <Loader2 className=" animate-spin size-10 " />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen p-4 bg-background mt-7 mb-20">
      <h1 className="sm:text-4xl text-2xl capitalize font-bold font-mono text-center">
        Public profile Link
      </h1>
      <div className=" sm:w-[45%] container">
        <p className="text-sm">
          Send anonumos messages to:{" "}
          <span className="text-green-300">@{params && params?.username}</span>{" "}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="my-2 ">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="write your message here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="my-2 w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>

      <Card className=" sm:w-[45%] container">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Engaging Questions Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button
            onClick={handleGenerateQuestions}
            disabled={isLoading}
            className="mb-4"
          >
            {isLoading ? "Generating..." : "Generate New Questions"}
          </Button>
          <div className="mt-4 w-full">
            <h2 className="font-semibold mb-2 text-foreground">
              Generated Questions:
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </>
              ) : (
                questions.map((question, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground hover:text-white hover:bg-neutral-900 cursor-pointer p-2 rounded-md"
                    onClick={() => form.setValue("content", question)}
                  >
                    {question}
                  </li>
                ))
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
