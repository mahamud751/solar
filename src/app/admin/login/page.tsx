import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck, Sun } from "lucide-react";
import { getAdmin } from "@/server/admin";
import { ActionForm } from "../ActionForm";
import { login } from "../actions";

export default async function AdminLogin() {
  if (await getAdmin()) redirect("/admin");
  return (
    <main className="admin-login">
      <div className="admin-login-split">
        <aside className="admin-login-aside">
          <Image src="/images/gd/green-dhaka-logo.png" alt="Green Dhaka" width={730} height={330} className="admin-brand-logo" priority />
          <div>
            <h2>Power the website behind <span>every rooftop</span></h2>
            <p>Manage inquiries, services, articles and media for Green Dhaka in one place.</p>
          </div>
          <div className="admin-hero-art" aria-hidden="true">
            <span className="admin-hero-art-core" />
            <Sun size={150} strokeWidth={0.6} />
          </div>
        </aside>
        <div className="admin-login-card">
          <span className="admin-heading-icon"><ShieldCheck size={22} aria-hidden="true" /></span>
          <h1 className="mt-5">Welcome back</h1>
          <p>Sign in to the Green Dhaka admin.</p>
          <ActionForm action={login} submit="Sign in" className="mt-6">
            <label className="admin-field">Email
              <input className="admin-input" name="email" type="email" autoComplete="username" maxLength={254} required placeholder="you@greendhaka.com" />
            </label>
            <label className="admin-field">Password
              <input className="admin-input" name="password" type="password" autoComplete="current-password" maxLength={128} required placeholder="••••••••" />
            </label>
          </ActionForm>
          <Link href="/" className="admin-login-link mt-6"><ArrowLeft size={16} aria-hidden="true" /> Back to the Green Dhaka website</Link>
        </div>
      </div>
    </main>
  );
}
