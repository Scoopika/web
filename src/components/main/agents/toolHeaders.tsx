import { InApiTool } from "@scoopika/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@nextui-org/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdDelete, MdEdit, MdLock, MdSettings } from "react-icons/md";
import SettingsRow from "../settingsRow";
import { Input } from "@/components/ui/input";
import tryRequest from "@/scripts/tryRequest";
import encrypt from "@/functions/encrypt";
import { toast } from "sonner";
import { VscLoading } from "react-icons/vsc";
import decrypt from "@/functions/decrypt";
import { IoMdCopy } from "react-icons/io";

interface Props {
  tool: InApiTool;
  updateTool: Dispatch<SetStateAction<InApiTool>>;
}

type Header = {
  key: string;
  value: string;
  encrypted: boolean;
};

export default function ToolHeaders({ tool, updateTool }: Props) {
  const [newHeader, setNewHeader] = useState<Header>({
    key: "",
    value: "",
    encrypted: false,
  });
  const [newHeaderOpen, setNewHeaderOpen] = useState<boolean>(false);
  const [encryptingHeader, setEncryptingHeader] = useState<boolean>(false);
  const [decryptedValue, setDecryptedValue] = useState<string | undefined>(
    undefined,
  );
  const [decryptingHeader, setDecryptingHeader] = useState<boolean>(false);

  const deleteHeader = (key: string) => {
    updateTool((prev) => ({
      ...prev,
      headers: prev.headers.filter((h) => h.key !== key),
    }));
  };

  const checkValue = (value?: string) => {
    return typeof value === "string" && value.length > 0;
  };

  const saveHeader = () => {
    if (!checkValue(newHeader.key) || !checkValue(newHeader.value)) {
      return toast.error("Enter all header info", {
        description: "The header key and value are required!",
      });
    }

    updateTool((prev) => ({
      ...prev,
      headers: [
        ...prev.headers.filter((h) => h.key !== newHeader.key),
        newHeader,
      ],
    }));
    setNewHeader({ key: "", value: "", encrypted: false });
    setDecryptedValue(undefined);
    setNewHeaderOpen(false);
    toast.success("Saved header!");
  };

  const encryptHeader = async () => {
    if (encryptingHeader) return;

    if (!checkValue(newHeader.value)) {
      return toast.error("Enter a header value to encrypt");
    }

    setEncryptingHeader(true);
    tryRequest<string>({
      loading: "Encrypting header value...",
      success: "Encrypted header value",
      error: "Can't encrypt header value",
      func: async () => {
        const res = await encrypt(newHeader.value);

        if (!res || typeof res !== "string") {
          throw new Error("Try again later or contact the support");
        }

        return res;
      },
      end: (value) => {
        setEncryptingHeader(false);
        if (value) {
          setNewHeader((prev) => ({ ...prev, value, encrypted: true }));
        }
      },
    });
  };

  const decryptHeader = async () => {
    if (decryptingHeader || !newHeader.encrypted) return;

    setDecryptingHeader(true);
    tryRequest<string>({
      loading: "Decrypting header value...",
      success: "Decrypted header value",
      error: "Can't decrypt header value",
      func: async () => {
        const res = await decrypt(newHeader.value);

        if (!res || typeof res !== "string") {
          throw new Error("Try again later or contact the support");
        }

        return res;
      },
      end: (value) => {
        setDecryptingHeader(false);
        if (value) {
          setDecryptedValue(value);
        }
      },
    });
  };

  return (
    <>
      <Dialog
        open={newHeaderOpen}
        onOpenChange={
          !encryptingHeader && !decryptingHeader ? setNewHeaderOpen : () => {}
        }
      >
        <DialogTrigger asChild className="w-full">
          <Button size="sm" variant="flat" className="font-semibold w-full">
            Add header
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="font-semibold">Header</div>
          <SettingsRow title="Key" description="The header key">
            <Input
              placeholder="Header key (e.g. Content-Type)"
              defaultValue={newHeader.key}
              onInput={(e) => {
                const value = e?.currentTarget?.value;
                setNewHeader((prev) => ({ ...prev, key: value || "" }));
              }}
            />
          </SettingsRow>
          <SettingsRow title="Value" description="The header value">
            {!encryptingHeader ? (
              <>
                <Input
                  placeholder="Header value (e.g. application/json)"
                  className="min-w-0"
                  defaultValue={newHeader.value}
                  onInput={(e) => {
                    const value = e?.currentTarget?.value;
                    setNewHeader((prev) => ({
                      ...prev,
                      value: value || "",
                      encrypted: false,
                    }));
                  }}
                />
              </>
            ) : (
              <div className="text-sm opacity-80">
                <VscLoading className="animate-spin" />
              </div>
            )}
          </SettingsRow>
          <div className="p-2 flex flex-col w-full gap-4">
            {newHeader.encrypted ? (
              <>
                <p className="text-sm opacity-80">
                  This header value is encrypted. you can edit its value just
                  normally and encrypt it again to update it.
                </p>
                <Popover
                  open={typeof decryptedValue === "string"}
                  onOpenChange={() => setDecryptedValue(undefined)}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="flat"
                      className="font-semibold"
                      onPress={() => decryptHeader()}
                      isLoading={decryptingHeader}
                    >
                      See decrypted value
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-36">
                    <div className="w-full flex items-center gap-2">
                      <p className="text-xs truncate">{decryptedValue}</p>
                      <Button
                        size="sm"
                        variant="flat"
                        className="font-semibold"
                        isIconOnly
                        startContent={<IoMdCopy />}
                        onPress={() => {
                          navigator.clipboard.writeText(decryptedValue || "");
                          toast.success("Copied value");
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <p className="text-sm opacity-80">
                  Do you want to encrypt the header value? use only with
                  authorization headers that contain sensitive data. you still
                  can see the decrypted header value and edit it.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="flat"
                    size="sm"
                    className="font-semibold w-full"
                    onPress={() => encryptHeader()}
                    isLoading={encryptingHeader}
                  >
                    Encrypt value
                  </Button>
                </div>
              </>
            )}
          </div>
          <Button
            size="sm"
            color="primary"
            className="w-full font-semibold"
            onPress={() => saveHeader()}
          >
            Save header
          </Button>
        </DialogContent>
      </Dialog>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="flat"
            className="font-semibold w-full"
            startContent={<MdSettings size={16} />}
          >
            Manage headers
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-64 overflow-auto">
          <div className="w-full flex flex-col gap-2">
            {tool.headers.length < 1 && (
              <p className="text-xs opacity-80">No headers yet!</p>
            )}
            {tool.headers.map((h, i) => (
              <div
                key={`toolinputitem-${i}-${h}`}
                className={`flex items-center w-full text-xs gap-1 rounded-xl p-1 pl-2 pr-2 group ${
                  !(i & 1) && "bg-accent/40"
                }`}
              >
                <p className="flex items-center gap-1 truncate w-full">
                  {h.encrypted && <MdLock />}
                  {h.key}
                  {": "}
                  {h.value}
                </p>
                <div className="w-full min-w-max flex items-center justify-end transition-all opacity-0 group-hover:opacity-100 gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    startContent={<MdEdit />}
                    onPress={() => {
                      setNewHeader(h);
                      setNewHeaderOpen(true);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    startContent={<MdDelete />}
                    className="text-red-500"
                    onPress={() => deleteHeader(h.key)}
                  />
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
