import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/misc/mode-toggle";

interface CardGeneratorProps {
  title: string;
  description: string;
  children: React.ReactNode;
  showFeature?: boolean;
}

export const CardGenerator = ({
  title,
  description,
  children,
  showFeature = false,
}: CardGeneratorProps) => {
  return (
    <Card className="w-[450px] bg-foreground/5">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showFeature && (
        <CardFooter>
          <ModeToggle />
        </CardFooter>
      )}
    </Card>
  );
};
