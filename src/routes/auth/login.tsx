import { clientOnly } from "@solidjs/start";
const Authenticator = clientOnly(
  () => import("~/components/auth/authenticator")
);

export default function Login() {
  return (
    <div>
      <Authenticator />
    </div>
  );
}
