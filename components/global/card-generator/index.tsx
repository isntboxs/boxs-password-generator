import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardGeneratorProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const CardGenerator = ({
  title,
  description,
  children,
}: CardGeneratorProps) => {
  return (
    <Card className="w-[450px] bg-foreground/5">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
