"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaCode, FaDatabase } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import tryRequest from "@/scripts/tryRequest";
import deleteDataStore from "@/functions/datastores/delete";
import Code from "../code";
import ResourceLink from "../resourceLink";

interface Props {
  datastore: { id: string; name: string };
}

const code = (
  id: string
) => `import { Scoopika, Agent } from "@scoopika/scoopika";

const scoopika = new Scoopika({
    store: "${id}" // Just add the store ID
});

// -- EXAMPLES --

// Create session
const session = await scoopika.newSession({
    id: "session1",
    user_id: "user1"
});

// run agent with the session
const agent = new Agent("AGENT_ID", scoopika);
await agent.run({
    inputs: {
        message: "Hello!",
        session_id: session.id
    }
});

// Get session messages (in this example there are 2)
const messages = await scoopika.getSessionMessages(session.id);

// List user sessions based on ID
const sessions = await scoopika.listUserSessions("user1");
`;

export default function HistoryStoreItem({ datastore }: Props) {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const deleteNow = async () => {
    if (deleteLoading) return;

    setDeleteLoading(true);
    tryRequest<boolean>({
      loading: "Deleting history store",
      success: "Deleted history store",
      error: "Can't delete history store",
      func: async () => {
        const res = await deleteDataStore(datastore.id);

        if (!res || !res.success) {
          throw new Error("Try again later or contact support");
        }

        return res.success;
      },
      end: (s) => {
        setDeleteLoading(false);
        if (s) setDeleteOpen(false);
      },
    });
  };

  return (
    <div className="w-full flex flex-col p-4 border-1 rounded-lg hover:shadow transition-all group">
      <div className="flex items-center gap-3">
        <div className="min-w-9 min-h-9 max-w-9 max-h-9 flex items-center justify-center border-1 rounded-lg">
          <FaDatabase />
        </div>
        <p className="font-semibold min-w-max">{datastore.name}</p>
        <div className="w-full flex items-center justify-end translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="text-red-500"
            onPress={() => setDeleteOpen(true)}
          >
            <MdDelete size={17} />
          </Button>
        </div>
      </div>
      <div className="mt-4 w-full flex items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="flat"
              className="min-w-max font-semibold"
              startContent={<FaCode />}
            >
              Use in your app
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-screen max-w-screen min-h-screen">
            <div className="font-semibold">Use in your app</div>
            <ResourceLink
              name="Check docs for server-side and client-side usage"
              link="https://docs.scoopika.com/history-stores"
            />
            <Code language="typescript" code={code(datastore.id)} />
          </DialogContent>
        </Dialog>
        <div className="w-full text-sm opacity-80 flex items-center justify-end truncate">
          <Badge
            variant="secondary"
            className="cursor-pointer font-semibold"
            onClick={() => {
              navigator.clipboard.writeText(datastore.id);
              toast.success("Copied ID");
            }}
          >
            #{datastore.id.split("-")[0]}
          </Badge>
        </div>
      </div>

      {deleteOpen && (
        <Dialog
          open={deleteOpen}
          onOpenChange={!deleteLoading ? setDeleteOpen : () => {}}
        >
          <DialogContent>
            <div className="font-semibold">Delete history store</div>
            <div className="text-sm opacity-80">
              Are you sure you want to delete this history store? all sessions
              under it will be lost and can never be undone!
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-end gap-3">
              <Button
                size="sm"
                variant="flat"
                className="font-semibold"
                disabled={deleteLoading}
                onPress={() => {
                  if (!deleteLoading) setDeleteOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="flat"
                className="bg-red-500/10 border-1 border-red-500 font-semibold"
                isLoading={deleteLoading}
                onPress={() => deleteNow()}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
