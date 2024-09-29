"use client";

import { useEffect, useState } from "react";

import { passGenAction } from "@/actions/pass-gen-action";
import { charsetItems } from "@/constants";
import { PassGenSchema, PassGenType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardIcon,
  MinusIcon,
  PlusIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardGenerator } from "@/components/global/card-generator";

import { Slider } from "../ui/slider";

export const FormPasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const minPasswordLength = 1;
  const maxPasswordLength = 50;

  const form = useForm<PassGenType>({
    resolver: zodResolver(PassGenSchema),
    defaultValues: {
      length: passwordLength,
      charset: charsetItems.map((item) => item.id),
    },
  });

  const onSubmit = (data: PassGenType) => {
    setLoading(true);
    passGenAction(data)
      .then((password) => {
        setPassword(password);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    form.setValue("length", passwordLength);
    form.handleSubmit(onSubmit)();
  }, [passwordLength, form]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        console.log("Password copied to clipboard");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <CardGenerator
      title="Password Generator"
      description="Create your secret password with our generator."
      showFeature
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-row items-center justify-between gap-x-4">
            <div
              className="flex h-14 w-[85%] items-center justify-between rounded-lg border bg-background"
              aria-live="polite"
              aria-atomic="true"
            >
              <p
                className="mx-2 w-[80%] select-none truncate"
                id="generated-password"
              >
                {password}
              </p>
              <Button
                className="mr-2"
                size="icon"
                variant="outline"
                type="button"
                disabled={!password || loading}
                aria-label="Copy password to clipboard"
              >
                <ClipboardIcon className="size-5" onClick={copyToClipboard} />
              </Button>
            </div>

            <Button
              variant="default"
              size="icon"
              type="button"
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
              disabled={loading}
              aria-label="Generate new password"
            >
              {loading ? (
                <RefreshCwIcon className="size-5 animate-spin duration-1000" />
              ) : (
                <RefreshCwIcon className="size-5" />
              )}
            </Button>
          </div>

          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem className="space-y-4 text-center">
                <FormLabel className="font-normal text-muted-foreground">
                  Length:{" "}
                  <span className="font-bold text-foreground">
                    {field.value} characters
                  </span>
                </FormLabel>

                <div className="flex flex-row items-center justify-between gap-x-4">
                  <Button
                    size="icon"
                    onClick={() => {
                      if (passwordLength > minPasswordLength) {
                        setPasswordLength(passwordLength - 1);
                        field.onChange(passwordLength - 1);
                      }
                    }}
                    disabled={passwordLength <= minPasswordLength}
                    aria-label="Decrease password length"
                  >
                    <MinusIcon className="size-5" />
                  </Button>

                  <FormControl>
                    <Slider
                      className="w-[70%]"
                      value={[field.value]}
                      onValueChange={(value) => {
                        setPasswordLength(value[0]);
                        field.onChange(value[0]);
                        form.handleSubmit(onSubmit)();
                      }}
                      min={minPasswordLength}
                      max={maxPasswordLength}
                      step={1}
                      aria-labelledby="password-length-slider"
                    />
                  </FormControl>

                  <Button
                    size="icon"
                    onClick={() => {
                      if (passwordLength < maxPasswordLength) {
                        setPasswordLength(passwordLength + 1);
                        field.onChange(passwordLength + 1);
                      }
                    }}
                    disabled={passwordLength >= maxPasswordLength}
                    aria-label="Increase password length"
                  >
                    <PlusIcon className="size-5" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="charset"
            render={() => (
              <FormItem className="space-y-4 text-center">
                <FormLabel className="font-normal text-muted-foreground">
                  Character Sets:
                </FormLabel>

                <div className="row-span-4 flex flex-row items-center justify-center gap-x-4">
                  {charsetItems.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="charset"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, item.id]
                                    : field.value?.filter(
                                        (value) => value !== item.id
                                      );
                                  field.onChange(newValue);
                                  form.handleSubmit(onSubmit)();
                                }}
                                aria-labelledby={`charset-${item.id}`}
                              />
                            </FormControl>
                            <FormLabel
                              id={`charset-${item.id}`}
                              className={cn(
                                "font-bold",
                                field.value?.includes(item.id)
                                  ? "text-foreground"
                                  : "font-normal text-muted-foreground"
                              )}
                            >
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CardGenerator>
  );
};
