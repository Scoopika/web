import { Button } from "@nextui-org/react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import darkTheme from "@/lib/codeTheme";

interface Props {
  code: string;
  language: string;
  className?: string;
}

export default function Code({ code, language, className }: Props) {
  const copy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied code!");
  };

  return (
    <div className={`w-full rounded-xl border-1 bg-foreground dark:bg-accent/10 relative group ${className}`}>
      <Button
        size="sm"
        isIconOnly
        variant="flat"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all backdrop-blur"
        onPress={() => copy()}
      >
        <MdContentCopy />
      </Button>
      <SyntaxHighlighter language={language} style={{ ...darkTheme } as any}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
