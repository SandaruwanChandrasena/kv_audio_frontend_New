import { THEME } from "../../utils/theme.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export default function Register() {
  return (
    <div className={`${THEME.card} mx-auto max-w-md p-6`}>
      <h1 className="text-xl font-semibold">Create account</h1>
      <p className="mt-1 text-sm text-slate-500">Sign up in seconds.</p>

      <div className="mt-5 space-y-3">
        <Input placeholder="Name" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Create account</Button>
      </div>
    </div>
  );
}
