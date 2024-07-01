import { toast } from "sonner";

export default async function tryRequest<Data = any>({
  loading,
  success,
  error,
  func,
  end,
}: {
  loading: string;
  success: string;
  error: string;
  func: () => Data | Promise<Data>;
  end: (d?: Data) => any;
}) {
  const t = toast.loading(loading);

  try {
    const res = await func();
    toast.success(success, { id: t });
    end(res);
  } catch (err: any) {
    toast.error(error, {
      id: t,
      description: err.message,
    });
  } finally {
    end();
  }
}
