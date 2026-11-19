import Link from "next/link";
import { redirect } from "next/navigation";
import { Earth, Sun } from "lucide-react";
import { getAdmin } from "@/server/admin";
import { ActionForm } from "../ActionForm";
import { login } from "../actions";

export default async function AdminLogin() {
  if (await getAdmin()) redirect("/admin");
  return (
    <main className="admin-login">
      <div className="admin-panel admin-login-card">
        <span className="admin-brand-icon"><Sun size={23} aria-hidden="true" /></span>
        <h1>Admin sign in</h1>
        <p>Sign in to manage Green Dhaka.</p>
        <ActionForm action={login} submit="Sign in" className="mt-6">
          <label className="admin-field">Email
            <input className="admin-input" name="email" type="email" autoComplete="username" maxLength={254} required />
          </label>
          <label className="admin-field">Password
            <input className="admin-input" name="password" type="password" autoComplete="current-password" maxLength={128} required />
          </label>
        </ActionForm>
        <Link href="/" className="admin-login-link mt-6"><Earth size={16} aria-hidden="true" /> Green Dhaka website</Link>
      </div>
    </main>
  );
}
