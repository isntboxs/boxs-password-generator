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
    passGenAction(data).then((password) => {
      setPassword(password);
    });
  };

  useEffect(() => {
    form.setValue("length", passwordLength);
    form.handleSubmit(onSubmit)();
  }, [passwordLength, form]);

  return (
    <CardGenerator
      title="Password Generator"
      description="Create your secret password with our generator."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-row items-center justify-between gap-x-4">
            <div className="flex h-14 w-[85%] items-center justify-between rounded-lg border bg-background">
              <p className="mx-2 w-[80%] select-none truncate">{password}</p>
              <Button
                className="mr-2"
                size="icon"
                variant="outline"
                type="button"
              >
                <ClipboardIcon className="size-5" />
              </Button>
            </div>

            <Button
              variant="default"
              size="icon"
              type="button"
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
            >
              <RefreshCwIcon className="size-5" />
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
                              />
                            </FormControl>
                            <FormLabel
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
