import { ImBooks } from "react-icons/im";
import Empty from "../../empty";

export default function AgentKnowledge() {
  return (
    <Empty
      title="Coming soon!"
      description="Very soon you'll be able to add custom knowledge to your agent from files and websites, to custom data from your app. supporting global knowledge, session-specific knowledge, and user-specific knowledge!"
      icon={<ImBooks />}
    />
  );
}
