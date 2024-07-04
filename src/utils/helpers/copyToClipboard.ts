import { toast } from "@/components/ui/use-toast";

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({
    title: "Link Copied",
  });
};
