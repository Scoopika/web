"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ImBooks } from "react-icons/im";
import Empty from "../../empty";
import { AgentData } from "@scoopika/types";
import { Button } from "@nextui-org/react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import addKnowledge from "@/functions/agents/knowledge/add";
import UpgradePlan from "../../upgrade";
import { Knowledge } from "@prisma/client";
import getKnowledge from "@/functions/agents/knowledge/get";
import { toast } from "sonner";
import Loading from "../../loading";
import { HiOutlineUpload } from "react-icons/hi";
import tryRequest from "@/scripts/tryRequest";
import { MdDelete } from "react-icons/md";
import deleteKnowledge from "@/functions/agents/knowledge/delete";
import SettingsRow from "../../settingsRow";
import Code from "../../code";
import AppHead from "../../head";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

interface Props {
  pro: boolean;
  agent: AgentData;
  knowledge: Knowledge[] | null;
  setKnowledge: Dispatch<SetStateAction<Knowledge[] | null>>;
}

const code = () => `import { Scoopika } from "@scoopika/scoopika";

const scoopika = new Scoopika({
  beta_allow_knowledge: true // Allow knowledge usage
});
`;

export default function AgentKnowledge({
  pro,
  agent,
  knowledge,
  setKnowledge,
}: Props) {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [called, setCalled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [newOpen, setNewOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<Knowledge | undefined>(
    undefined
  );

  const loadKnowledge = async () => {
    if (called || knowledge) return;

    setCalled(true);
    const res = await getKnowledge(agent.id);
    if (!res.success) {
      return toast.error("Can't load knowledge sources", {
        description: "Please contact support!",
      });
    }

    setKnowledge(res.knowledge || []);
  };

  useEffect(() => {
    if (!knowledge) loadKnowledge();
  }, [agent]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setFileContent(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNew = async () => {
    if (!fileContent || !fileName || loading) return;

    setLoading(true);
    tryRequest<Knowledge>({
      loading: "Uploading file...",
      success: "Uploaded knowledge source",
      error: "Can't add knowlede source",
      func: async () => {
        const response = await addKnowledge(agent.id, fileName, fileContent);

        if (!response.success) {
          throw new Error(response.error || "Please contact support");
        }

        return response.knowledge;
      },
      end: (s) => {
        setLoading(false);
        setFileContent(null);
        setFileName(null);

        if (!s) return;

        setNewOpen(false);
        setKnowledge((prev) => [...(prev || []), s]);
      },
    });
  };

  const deleteSource = async () => {
    if (deleteLoading || !deleteOpen) return;

    setDeleteLoading(true);
    tryRequest<boolean>({
      loading: "Deleting knowledge source...",
      success: "Delted knowledge source!",
      error: "Can't delete knowledge source",
      func: async () => {
        const res = await deleteKnowledge(
          agent.id,
          deleteOpen.id,
          JSON.parse(deleteOpen.vectors)
        );
        if (!res.success) {
          throw new Error("Please contact support!");
        }

        return res.success;
      },
      end: (s) => {
        setDeleteLoading(false);
        if (!s) return;

        setKnowledge((prev) =>
          (prev || []).filter((m) => m.id !== deleteOpen.id)
        );
        setDeleteOpen(undefined);
      },
    });
  };

  if (!pro) {
    return (
      <UpgradePlan description="Add knowledge to your agent so it knows information about you and your app that the LLM wasn't trained on. Add PDF, Markdown, and text files, and the agent will use them whe needed" />
    );
  }

  return (
    <>
      <AppHead
        title="Knowledge (beta)"
        description="Add custom knowledge sources to your agent"
        action={
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="light"
              as={Link}
              href="https://docs.scoopika.com/agents/features/knowledge"
              target="_blank"
            >
              Learn more
            </Button>
            <Dialog
              open={newOpen}
              onOpenChange={!loading ? setNewOpen : () => {}}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="bordered"
                  className="font-semibold w-full border lg:max-w-max"
                  endContent={<FaChevronRight />}
                >
                  Add knowledge file
                </Button>
              </DialogTrigger>
              <DialogContent>
                {!loading ? (
                  <>
                    <div className="font-semibold">Upload knowledge file</div>
                    <div className="text-sm opacity-70">
                      You can upload PDF, Markdown, or any type of text files.
                      There is a size limit of 5Mb/file. Notice that we will
                      generate embeddings for the file you upload so it might a
                      minute to finish uploading your file
                    </div>
                    <input
                      id="file-upload"
                      className="hidden"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full p-6 border-1 border-dashed rounded-lg flex items-center justify-center text-sm hover:border-black/20 dark:hover:border-white/20 bg-accent/20 transition-all cursor-pointer"
                    >
                      {fileName || "Upload file"}
                    </label>
                    <Button
                      size="sm"
                      className="w-full font-semibold"
                      startContent={<HiOutlineUpload size={18} />}
                      isLoading={loading}
                      onPress={() => addNew()}
                    >
                      Upload file
                    </Button>
                  </>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center">
                    <div className="font-semibold mb-2">
                      Uploading your file
                    </div>
                    <div className="text-sm opacity-70 text-center max-w-[80%]">
                      This could take up to a minute
                    </div>
                    <Loading />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {!knowledge && <Loading />}

      {knowledge && knowledge.length < 1 && (
        <Empty
          icon={<ImBooks />}
          title="Knowledge sources"
          description="Add custom knowledge sources to your agent. just upload the file (PDF, markdown, or text), and boom, your agent has access to all the information in it... only when it needs to"
        />
      )}

      {knowledge && knowledge.length > 0 && (
        <>
          <div className="w-full flex flex-col mt-4">
            {knowledge.map((m, index) => (
              <div
                key={`knowledge-item-${index}`}
                className="p-4 flex items-center border-b-1 dark:border-accent/60 group"
              >
                <div className="text-sm w-36 truncate">{m.name}</div>
                <div className="w-full flex items-center justify-end">
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    startContent={<MdDelete />}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    onPress={() => setDeleteOpen(m)}
                  />
                </div>
              </div>
            ))}
          </div>
          <SettingsRow
            title="Enable this feature"
            description="This feature is still in beta so it's not enabled by default. so Make sure to enable it as show in this snippet."
          >
            <Code language="typescript" code={code()} />
          </SettingsRow>
        </>
      )}

      {deleteOpen && (
        <Dialog
          open={deleteOpen !== undefined}
          onOpenChange={
            !deleteLoading ? () => setDeleteOpen(undefined) : () => {}
          }
        >
          <DialogContent>
            <div className="text-xs opacity-70 w-36 truncate">
              {deleteOpen.name}
            </div>
            <div className="font-semibold">Delete knowledge source</div>
            <div className="text-sm opacity-80">
              Your agent {"won't"} be able to access information from this
              knowledge source again. this action {"can't"} be undone!
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end">
              <Button
                size="sm"
                variant="flat"
                className="bg-red-500/5 border border-red-500"
                isLoading={deleteLoading}
                onPress={() => deleteSource()}
              >
                Delete knowledge source
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
