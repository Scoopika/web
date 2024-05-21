import { Dialog, DialogContent } from "@/components/ui/dialog";
import deleteAgent from "@/functions/agents/delete";
import { Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

interface Props {
  agent: AgentData;
  open: boolean;
  openChange: Dispatch<SetStateAction<boolean>>;
  onDelete: (id: string) => void;
}

export default function DeleteAgent({
  agent,
  open,
  openChange,
  onDelete,
}: Props) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const del = async () => {
    setLoading(true);
    const t = toast.loading(`Deleting ${agent.name}...`);

    try {
      const deletion = await deleteAgent(agent.id);

      if (deletion.success === false) {
        throw new Error("Deletion error");
      }

      toast.success(`${agent.name} says goodbye 👋`, { id: t });
      onDelete(agent.id);
      openChange(false);
    } catch {
      toast.error("Unable to delete the agent. try again later...", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent
        className="bg=background backdrop-blur flex flex-col items-center max-h-screen overflow-auto"
        style={
          theme === "dark"
            ? {
                background: "var(--background)",
              }
            : {}
        }
      >
        <div className="w-full h-36 flex items-center justify-center">
          <div
            style={{
              boxShadow: "0px 0px 80px 0px rgba(255, 0, 0, .5)",
            }}
            className="w-14 h-14 flex items-center justify-center border-1 rounded-xl bg-accent/10 border-red-300"
          >
            <MdDelete size={30} className="text-red-400" />
          </div>
        </div>
        <h3 className="font-semibold">Delete {agent.name}</h3>
        <p className="text-sm text-center opacity-70">
          Are you sure you want to delete {agent.name}? Careful as this action
          can never be undone!
        </p>

        <div className="w-full mt-4 flex flex-col items-center justify-center gap-2">
          <Button
            isLoading={loading}
            color="primary"
            className="bg-red-500 w-full"
            size="sm"
            onPress={() => del()}
          >
            Delete {agent.name}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
