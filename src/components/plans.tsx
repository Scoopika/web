import { FaCheck } from "react-icons/fa6";

interface Props {
  title: string;
  className?: string;
}

export const CheckItem = ({ title, className }: Props) => {
  return (
    <div className={`flex gap-2 text-sm ${className}`}>
      <div className="min-w-4 min-h-4 max-w-4 max-h-4 flex items-center justify-center ">
        <FaCheck size={13} />
      </div>
      <p className="opacity-80">{title}</p>
    </div>
  );
};

export const Plans = () => {
  return (
    <>
      <div className="w-full overflow-hidden border rounded-2xl p-6 h-full flex flex-col">
        <div
          className="max-w-max p-1 pl-3 pr-3 border bg-accent/30 rounded-md text-green-400 border-green-400/20 text-xs mb-4"
          style={{
            boxShadow: "0px 0px 130px 10px #4ade80",
          }}
        >
          HOBBY
        </div>
        <div className="text-xs opacity-80 mt-2">
          For developers building their impressive LLM-powered side projects &
          apps
        </div>
        <div className="mt-6 text-2xl font-semibold">Free</div>
        <div className="h-full"></div>
        <div className="mt-4 flex flex-col justify-end gap-4">
          <CheckItem title="Unlimited AI agents runs" className="w-full" />
          <CheckItem title="Connect your LLMs providers" className="w-full" />
          <CheckItem title="Add tools to agents" className="w-full" />
          <CheckItem title="Real-time streaming" className="w-full" />
          <CheckItem title="LLM output validation" className="w-full" />
          <CheckItem title="Full type-safety" className="w-full" />
          <CheckItem title="Smart error recovery" className="w-full" />
        </div>
      </div>
      <div className="w-full bg-accent/20 overflow-hidden border rounded-2xl p-6 h-full flex flex-col">
        <div
          className="max-w-max p-1 pl-3 pr-3 border bg-accent/30 rounded-md text-violet-400 border-violet-400/20 text-xs mb-4"
          style={{
            boxShadow: "0px 0px 130px 10px #a78bfa",
          }}
        >
          PRO
        </div>
        <div className="text-xs opacity-80 mt-2">
          For developers & small teams that need voice responses, long-term
          memory, or agents with custom knowledge
        </div>
        <div className="flex items-center gap-2 mt-6">
          <div className="text-2xl font-semibold">$25</div>
          <div className="opacity-70 text-sm">/month</div>
        </div>
        <div className="h-full"></div>
        <div className="mt-4 flex flex-col gap-4">
          <div className="text-xs opacity-70">
            Everything in the free plan, plus:
          </div>
          <CheckItem
            title="Serverless managed long-term memory"
            className="w-full"
          />
          <CheckItem
            title="Expand agents knowledge from files & websites"
            className="w-full"
          />
          <CheckItem title="Real-time voice responses" className="w-full" />
          <CheckItem title="Higher rate limits" className="w-full" />
          <CheckItem title="Faster audio files processing" className="w-full" />
        </div>
      </div>
      <div className="w-full overflow-hidden border rounded-2xl p-6 h-full flex flex-col">
        <div
          className="max-w-max p-1 pl-3 pr-3 border bg-accent/30 rounded-md text-indigo-400 border-indigo-400/20 text-xs mb-4"
          style={{
            boxShadow: "0px 0px 130px 10px #818cf8",
          }}
        >
          SCALE
        </div>
        <div className="text-xs opacity-80 mt-2">
          For bigger teams that need higher rate limits, requests, volumes, and
          memory storage
        </div>
        <div className="flex items-center gap-2 mt-6">
          <div className="text-2xl font-semibold">$70</div>
          <div className="opacity-70 text-sm">/month</div>
        </div>
        <div className="h-full"></div>
        <div className="mt-4 flex flex-col gap-4">
          <div className="text-xs opacity-70">
            Everything in the Basic plan, plus:
          </div>
          <CheckItem
            title="Higher memory storage & requests"
            className="w-full"
          />
          <CheckItem
            title="Higher knowledge monthly requests"
            className="w-full"
          />
          <CheckItem
            title="More voice responses characters"
            className="w-full"
          />
          <CheckItem
            title="Even higher rate limits (almost none)"
            className="w-full"
          />
          <CheckItem title="Direct support and assistant" className="w-full" />
        </div>
      </div>
    </>
  );
};
