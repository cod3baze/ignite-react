import { signIn, useSession } from "next-auth/client";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      await signIn("github");
      return;
    }

    // criação da checkout session
  }

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className={styles.subscribeButtonContainer}
    >
      Subscribe now
    </button>
  );
}
