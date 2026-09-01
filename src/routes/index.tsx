import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  Copy,
  Download,
  FileKey2,
  Fingerprint,
  Home,
  Mail,
  Menu,
  Moon,
  PanelTop,
  PenLine,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Account = {
  id: string;
  name: string;
  initial: string;
  rollNumber: string;
  email: string;
  password: string;
  customized?: boolean;
  createdAt: string;
};

const STORAGE_KEY = "skasc-mail-accounts";
const THEME_KEY = "skasc-mail-theme";
const EMAIL_DOMAIN = "@skasc.ac.in";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKASC Mail | Student Email Generator" },
      { name: "description", content: "Generate and manage your SKASC student email identity in seconds." },
      { property: "og:title", content: "SKASC Mail | Student Email Generator" },
      { property: "og:description", content: "Generate and manage your SKASC student email identity in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function createUsername(name: string, initial: string, rollNumber: string) {
  const firstName = normalize(name.trim().split(/\s+/)[0] ?? "");
  return `${firstName}${normalize(initial)}${normalize(rollNumber)}`;
}

function copyToClipboard(value: string, label: string) {
  void navigator.clipboard?.writeText(value);
  toast.success(`${label} copied`, { description: value });
}

function Index() {
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [customUsername, setCustomUsername] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [search, setSearch] = useState("");
  const generatorRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedAccounts = localStorage.getItem(STORAGE_KEY);
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedAccounts) {
      try {
        setAccounts(JSON.parse(storedAccounts) as Account[]);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const previewUsername = createUsername(name, initial, rollNumber);
  const previewEmail = previewUsername ? `${previewUsername}${EMAIL_DOMAIN}` : `yourname${EMAIL_DOMAIN}`;
  const filteredAccounts = accounts.filter((account) =>
    `${account.name} ${account.email} ${account.rollNumber}`.toLowerCase().includes(search.toLowerCase()),
  );
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = accounts.filter((account) => account.createdAt.slice(0, 10) === today).length;
  const customizedCount = accounts.filter((account) => account.customized).length;

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setMenuOpen(false);
  };

  const scrollToAccounts = () => {
    document.getElementById("accounts")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleGenerate = () => {
    if (!name.trim() || !initial.trim() || !rollNumber.trim()) {
      toast.error("Complete all three details first");
      return;
    }
    setIsGenerating(true);
    setGenerationStep(0);
    const timers = [500, 950, 1400, 1850].map((delay, index) =>
      window.setTimeout(() => setGenerationStep(index + 1), delay),
    );
    window.setTimeout(() => {
      const username = createUsername(name, initial, rollNumber);
      const account: Account = {
        id: crypto.randomUUID(),
        name: name.trim(),
        initial: initial.trim().toUpperCase(),
        rollNumber: rollNumber.trim(),
        email: `${username}${EMAIL_DOMAIN}`,
        password: `${normalize(name).slice(0, 4) || "skasc"}@${normalize(rollNumber).slice(-4) || "2024"}`,
        createdAt: new Date().toISOString(),
      };
      const nextAccounts = [account, ...accounts];
      setAccounts(nextAccounts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAccounts));
      setActiveAccount(account);
      setCustomUsername(username);
      setIsGenerating(false);
      setGenerationStep(4);
      toast.success("Email ready", { description: account.email });
      window.setTimeout(() => identityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
      timers.forEach(window.clearTimeout);
    }, 2200);
  };

  const saveCustomization = () => {
    if (!activeAccount) return;
    const valid = /^[a-zA-Z0-9._-]{3,40}$/.test(customUsername);
    if (!valid) {
      toast.error("Use 3–40 letters, numbers, dots, underscores, or hyphens");
      return;
    }
    const updated = { ...activeAccount, email: `${customUsername.toLowerCase()}${EMAIL_DOMAIN}`, customized: true };
    const nextAccounts = accounts.map((account) => (account.id === updated.id ? updated : account));
    setActiveAccount(updated);
    setAccounts(nextAccounts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAccounts));
    toast.success("Custom email saved", { description: updated.email });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-abyss font-body text-ink antialiased">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-float absolute -left-56 -top-48 size-[620px] rounded-full bg-violet/20 blur-3xl" />
        <div className="ambient-float-slow absolute -right-56 top-[26%] size-[580px] rounded-full bg-blue/15 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[30%] size-[520px] rounded-full bg-bio/10 blur-3xl" />
        <div className="absolute left-[14%] top-[19%] size-2 rounded-full bg-bio/70 shadow-[0_0_14px_3px] shadow-bio/40" />
        <div className="absolute right-[18%] top-[34%] size-1.5 rounded-full bg-violetsoft/80" />
        <div className="absolute left-[64%] top-[12%] size-1 rounded-full bg-blue/80" />
      </div>

      <header className="relative z-20 mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-violet to-blue ring-1 ring-violetsoft/30">
              <span className="font-heading text-sm font-semibold text-primary-foreground">S</span>
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate font-heading text-[15px] font-semibold tracking-tight">SKASC MAIL</span>
              <span className="mt-1 block truncate text-[10px] uppercase tracking-[0.2em] text-dim">Academic Identity Desk</span>
            </span>
          </button>
          <nav className="hidden items-center gap-1 text-sm md:flex">
            <a className="rounded-lg bg-foreground/5 px-3 py-2 text-ink transition-colors hover:bg-foreground/10" href="#home">Home</a>
            <button className="rounded-lg px-3 py-2 text-muted-ink transition-colors hover:bg-foreground/5 hover:text-ink" onClick={scrollToGenerator}>Generate</button>
            <button className="rounded-lg px-3 py-2 text-muted-ink transition-colors hover:bg-foreground/5 hover:text-ink" onClick={scrollToAccounts}>Accounts</button>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-[10px] bg-foreground/5 text-ink ring-1 ring-foreground/10 hover:bg-foreground/10" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-[10px] bg-foreground/5 text-ink ring-1 ring-foreground/10 hover:bg-foreground/10 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
            <Button variant="ghost" className="hidden rounded-[10px] bg-foreground/5 text-muted-ink ring-1 ring-foreground/10 hover:bg-foreground/10 sm:flex" onClick={scrollToAccounts}>
              <UserRound /> Accounts
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mt-3 grid gap-1 rounded-xl bg-deep p-2 ring-1 ring-foreground/10 md:hidden">
            <a className="rounded-lg px-3 py-2 text-sm text-ink hover:bg-foreground/5" href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <button className="rounded-lg px-3 py-2 text-left text-sm text-muted-ink hover:bg-foreground/5" onClick={scrollToGenerator}>Generate</button>
            <button className="rounded-lg px-3 py-2 text-left text-sm text-muted-ink hover:bg-foreground/5" onClick={scrollToAccounts}>Accounts</button>
          </nav>
        )}
      </header>

      <main id="home" className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
        <div className="grid grid-cols-12 gap-4">
          <section className="reveal-up col-span-12 flex flex-col justify-between gap-8 rounded-2xl bg-gradient-to-b from-deep to-abyss p-6 ring-1 ring-foreground/10 sm:p-8 lg:col-span-5" style={{ animationDelay: "40ms" }}>
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bio"><span className="size-1.5 rounded-full bg-bio shadow-[0_0_8px_2px] shadow-bio/60" />Student mail, composed</span>
              <h1 className="mt-5 max-w-[12ch] font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl">Your College Email, Ready in Seconds.</h1>
              <p className="mt-4 max-w-[39ch] text-sm leading-relaxed text-muted-ink">Generate your SKASC student email using your name, initial and roll number.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button className="rounded-[10px] bg-violet px-5 font-heading text-sm font-semibold text-primary-foreground ring-1 ring-violetsoft/40 transition-transform hover:scale-[1.02] hover:bg-violetsoft" onClick={scrollToGenerator}>Generate Email <ArrowRight /></Button>
                <Button variant="outline" className="rounded-[10px] border-foreground/10 bg-foreground/5 text-ink hover:bg-foreground/10" onClick={scrollToAccounts}>View Accounts</Button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-dim"><span className="flex items-center gap-2"><span className="size-1 rounded-full bg-violetsoft" />Local first</span><span className="flex items-center gap-2"><span className="size-1 rounded-full bg-bio" />Instant preview</span><span className="flex items-center gap-2"><span className="size-1 rounded-full bg-blue" />Card export</span></div>
          </section>

          <section ref={generatorRef} className="reveal-up col-span-12 rounded-2xl bg-gradient-to-b from-panel to-deep p-6 ring-1 ring-foreground/10 card-glow sm:p-8 lg:col-span-7" style={{ animationDelay: "120ms" }}>
            <div className="mb-6 flex items-center justify-between gap-3"><div><p className="font-heading text-base font-medium">Generate your address</p><p className="mt-1 text-xs text-muted-ink">Three details. One academic identity.</p></div><span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-dim">Module 01</span></div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Full Name" placeholder="Rithu Kamal" value={name} onChange={setName} className="sm:col-span-3" />
              <Field label="Initial" placeholder="K" value={initial} onChange={setInitial} maxLength={3} />
              <Field label="College Roll Number" placeholder="23CS101" value={rollNumber} onChange={setRollNumber} className="sm:col-span-2" />
            </div>
            <div className="mt-5 flex min-w-0 items-center gap-3 rounded-[10px] bg-abyss/70 px-4 py-3 ring-1 ring-foreground/10"><span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-dim">Email Preview</span><span className="min-w-0 truncate font-mono text-xs text-ink sm:text-sm">{previewEmail}</span></div>
            <Button className="mt-4 w-full rounded-[10px] bg-violet py-5 font-heading font-semibold text-primary-foreground ring-1 ring-violetsoft/40 hover:bg-violetsoft sm:w-auto sm:px-6" onClick={handleGenerate} disabled={isGenerating}>{isGenerating ? <><Sparkles className="animate-pulse" /> Checking details...</> : <>Generate Email <ArrowRight /></>}</Button>
            {isGenerating && <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-muted-ink sm:grid-cols-4">{["Checking details...", "Formatting email...", "Creating email...", "Email ready"].map((step, index) => <span key={step} className={generationStep > index ? "text-bio" : "text-dim"}>{generationStep > index ? "✓ " : "○ "}{step.replace("...", "")}</span>)}</div>}
          </section>

          <section ref={identityRef} className="reveal-up col-span-12 rounded-2xl bg-deep p-6 ring-1 ring-foreground/10 lg:col-span-7" style={{ animationDelay: "200ms" }}>
            <div className="mb-5 flex items-center justify-between gap-3"><div><p className="font-heading text-base font-medium">Email Identity Card</p><p className="mt-1 text-xs text-muted-ink">A shareable credential for your student inbox.</p></div><span className="flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-bio"><CheckCircle2 className="size-3.5" /> {activeAccount ? "Ready" : "Preview"}</span></div>
            <IdentityCard account={activeAccount} />
            {activeAccount && <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="outline" className="rounded-[9px] border-foreground/10 bg-foreground/5 text-ink hover:bg-foreground/10" onClick={() => copyToClipboard(activeAccount.email, "Email")}><Copy />Copy Email</Button><Button size="sm" variant="outline" className="rounded-[9px] border-foreground/10 bg-foreground/5 text-ink hover:bg-foreground/10" onClick={() => downloadIdentityCard(activeAccount)}><Download />Download Card</Button></div>}
          </section>

          <section className="reveal-up col-span-12 rounded-2xl bg-gradient-to-b from-panel to-deep p-6 ring-1 ring-foreground/10 lg:col-span-5" style={{ animationDelay: "280ms" }}>
            <div className="mb-5 flex items-center justify-between"><p className="font-heading text-sm font-medium">Quick statistics</p><span className="text-[10px] uppercase tracking-[0.18em] text-dim">Local data</span></div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3"><Stat value={accounts.length} label="Total Emails Generated" /><Stat value={customizedCount} label="Customized Emails" /><Stat value={todayCount} label="Today's Emails" /></div>
            <div className="mt-4 flex items-center gap-3 rounded-[10px] bg-bio/10 p-3 ring-1 ring-bio/20"><ShieldCheck className="size-4 shrink-0 text-bio" /><p className="text-xs leading-relaxed text-muted-ink">Your account data stays on this device.</p></div>
          </section>

          <section className="reveal-up col-span-12 rounded-2xl bg-deep p-6 ring-1 ring-foreground/10 lg:col-span-7" style={{ animationDelay: "360ms" }}><SectionTitle eyebrow="The flow" title="How It Works" /><div className="mt-6 grid gap-5 sm:grid-cols-4">{[["01", "Enter Details", "Name, initial, and roll number."], ["02", "Generate Email", "See your address compose live."], ["03", "Customize", "Make the username your own."], ["04", "Save", "Keep your identity close." ]].map(([number, title, description]) => <div className="border-l border-foreground/10 pl-4" key={number}><span className="font-mono text-[10px] text-violetsoft">{number}</span><h3 className="mt-2 font-heading text-sm font-medium">{title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-ink">{description}</p></div>)}</div></section>
          <section className="reveal-up col-span-12 grid grid-cols-2 gap-4 lg:col-span-5" style={{ animationDelay: "440ms" }}>{[[Mail, "Fast Generation", "Get a clean academic address in seconds."], [PenLine, "Smart Formatting", "Consistent details, every time."], [Fingerprint, "Custom Email IDs", "Choose a username that feels like yours."], [QrCode, "Digital Email Card", "Carry your identity in a shareable format."]].map(([Icon, title, description]) => <div className="rounded-2xl bg-gradient-to-b from-panel to-deep p-4 ring-1 ring-foreground/10 transition-transform hover:-translate-y-1" key={title as string}><div className="grid size-8 place-items-center rounded-[9px] bg-violet/15 text-violetsoft"><Icon className="size-4" /></div><h3 className="mt-3 font-heading text-xs font-medium sm:text-sm">{title as string}</h3><p className="mt-1 text-[11px] leading-relaxed text-muted-ink">{description as string}</p></div>)}</section>

          <section id="accounts" className="reveal-up col-span-12 rounded-2xl bg-deep p-6 ring-1 ring-foreground/10" style={{ animationDelay: "520ms" }}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><SectionTitle eyebrow="Your ledger" title="Accounts" /><p className="mt-2 text-xs text-muted-ink">{accounts.length ? `${accounts.length} stored account${accounts.length === 1 ? "" : "s"}` : "Your generated accounts will appear here."}</p></div>{accounts.length > 0 && <div className="relative w-full sm:w-64"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dim" /><Input aria-label="Search accounts" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search accounts" className="h-9 rounded-[9px] border-foreground/10 bg-abyss/60 pl-9 text-xs text-ink placeholder:text-dim" /></div>}</div>
            {filteredAccounts.length ? <div className="mt-5 grid gap-3">{filteredAccounts.map((account) => <AccountRow account={account} key={account.id} onCopy={() => copyToClipboard(account.email, "Email")} onOpen={() => { setActiveAccount(account); setCustomUsername(account.email.replace(EMAIL_DOMAIN, "")); identityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }} />)}</div> : <div className="mt-5 rounded-xl border border-dashed border-foreground/15 bg-abyss/40 px-5 py-9 text-center"><PanelTop className="mx-auto size-7 text-dim" /><p className="mt-3 font-heading text-sm">No accounts yet</p><p className="mt-1 text-xs text-muted-ink">Generate your first SKASC Mail identity above.</p></div>}
          </section>

          {activeAccount && <section className="reveal-up col-span-12 rounded-2xl bg-gradient-to-br from-violet/15 via-panel to-deep p-6 ring-1 ring-violet/25 sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionTitle eyebrow="Personalize" title="Customize Email" /><p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-ink">Change only the username. Your SKASC domain stays fixed.</p></div><span className="text-xs text-bio">{customUsername}{EMAIL_DOMAIN}</span></div><div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center rounded-[10px] bg-abyss/70 ring-1 ring-foreground/10"><Input aria-label="Custom username" value={customUsername} onChange={(event) => setCustomUsername(event.target.value.replace(/[^a-zA-Z0-9._-]/g, ""))} className="h-12 min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-ink focus-visible:ring-0" placeholder="custom.username" /><span className="shrink-0 pr-3 font-mono text-xs text-dim">{EMAIL_DOMAIN}</span></div><Button className="h-12 rounded-[10px] bg-violet px-5 text-primary-foreground hover:bg-violetsoft" onClick={saveCustomization}><Check />Save customization</Button></div></section>}
        </div>
      </main>

      <footer className="relative z-10 border-t border-foreground/10"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-5 py-7 sm:flex-row sm:items-center sm:px-8"><div><p className="font-heading text-sm font-semibold tracking-tight">SKASC MAIL</p><p className="mt-1 text-xs text-dim">Student Email Management</p></div><nav className="flex gap-4 text-xs text-muted-ink"><a href="#home">Home</a><button onClick={scrollToGenerator}>Generate</button><button onClick={scrollToAccounts}>Accounts</button></nav></div></footer>
      <div aria-live="polite" className="sr-only">{copied}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, className = "", maxLength }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; className?: string; maxLength?: number }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-muted-ink">{label}</span><Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} maxLength={maxLength} className="h-11 rounded-[10px] border-foreground/10 bg-abyss/60 text-sm text-ink placeholder:text-dim focus-visible:ring-bio/50" /></label>;
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><span className="text-[10px] uppercase tracking-[0.22em] text-bio">{eyebrow}</span><h2 className="mt-2 font-heading text-xl font-medium tracking-tight">{title}</h2></div>;
}

function Stat({ value, label }: { value: number; label: string }) {
  return <div className="min-w-0 rounded-[10px] bg-abyss/60 p-3 ring-1 ring-foreground/10"><p className="font-heading text-2xl font-semibold leading-none text-ink">{value}</p><p className="mt-2 min-h-7 text-[10px] leading-tight text-muted-ink">{label}</p></div>;
}

function IdentityCard({ account }: { account: Account | null }) {
  const [qr, setQr] = useState<string | null>(null);
  useEffect(() => { if (account) void QRCode.toDataURL(account.email, { width: 180, margin: 1, color: { dark: "#e9ecff", light: "#0b1230" } }).then(setQr); else setQr(null); }, [account]);
  return <div className="grid gap-4 sm:grid-cols-5"><div className="flex min-h-[230px] flex-col justify-between rounded-xl bg-gradient-to-br from-violet/25 via-panel to-abyss p-5 ring-1 ring-foreground/10 card-glow sm:col-span-3"><div className="flex items-center justify-between gap-3"><span className="text-[10px] uppercase tracking-[0.25em] text-violetsoft">SKASC MAIL</span><span className="text-[10px] uppercase tracking-[0.2em] text-bio">{account ? "Active" : "Student Email ID"}</span></div><div className="space-y-3"><div><p className="text-[10px] uppercase tracking-[0.2em] text-dim">Student Name</p><p className="mt-1 font-heading text-lg font-medium leading-tight">{account?.name || "Your name"}</p></div><div><p className="text-[10px] uppercase tracking-[0.2em] text-dim">Email</p><p className="mt-1 break-all font-mono text-xs text-ink sm:text-sm">{account?.email || "yourname@skasc.ac.in"}</p></div><div className="grid grid-cols-2 gap-3"><div><p className="text-[10px] uppercase tracking-[0.2em] text-dim">Roll Number</p><p className="mt-1 text-xs text-muted-ink">{account?.rollNumber || "—"}</p></div><div><p className="text-[10px] uppercase tracking-[0.2em] text-dim">Status</p><p className="mt-1 text-xs text-muted-ink">{account ? "Verified" : "Preview"}</p></div></div></div><p className="text-[10px] tracking-wide text-dim">SKASC · Academic identity</p></div><div className="flex min-h-[230px] flex-col items-center justify-center gap-3 rounded-xl bg-abyss/70 p-5 text-center ring-1 ring-foreground/10"><div className="grid size-32 place-items-center rounded-lg bg-abyss p-2 ring-1 ring-foreground/10">{qr ? <img src={qr} alt="QR code for the generated email" className="size-full" /> : <QrCode className="size-16 text-dim" />}</div><p className="text-[10px] uppercase tracking-[0.2em] text-dim">QR · scan to verify</p></div></div>;
}

function AccountRow({ account, onCopy, onOpen }: { account: Account; onCopy: () => void; onOpen: () => void }) {
  return <div className="group grid gap-4 rounded-xl bg-panel/70 p-4 ring-1 ring-foreground/10 transition-colors hover:bg-panel2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div className="flex min-w-0 items-center gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-violetsoft to-blue font-heading text-xs font-semibold text-primary-foreground">{account.initial.slice(0, 2)}</div><div className="min-w-0"><p className="truncate font-heading text-sm font-medium">{account.name}</p><p className="truncate font-mono text-xs text-violetsoft">{account.email}</p><p className="mt-1 text-[10px] text-dim">Roll {account.rollNumber}{account.customized ? " · Customized" : ""}</p></div></div><div className="flex shrink-0 gap-2"><Button size="sm" variant="ghost" className="rounded-[9px] text-muted-ink hover:bg-foreground/10 hover:text-ink" onClick={onCopy} aria-label={`Copy ${account.email}`}><Clipboard /> <span className="hidden sm:inline">Copy</span></Button><Button size="sm" variant="outline" className="rounded-[9px] border-foreground/10 bg-foreground/5 text-ink hover:bg-foreground/10" onClick={onOpen}>Open</Button></div></div>;
}

function downloadIdentityCard(account: Account) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520"><rect width="900" height="520" rx="28" fill="#081130"/><rect x="24" y="24" width="852" height="472" rx="20" fill="#0e2148" stroke="#7c6bff" stroke-opacity=".55"/><text x="64" y="86" fill="#e9ecff" font-family="Arial" font-size="24" font-weight="700" letter-spacing="4">SKASC MAIL</text><text x="64" y="145" fill="#8da0d6" font-family="Arial" font-size="14" letter-spacing="3">STUDENT EMAIL ID</text><text x="64" y="218" fill="#e9ecff" font-family="Arial" font-size="34" font-weight="700">${escapeXml(account.name)}</text><text x="64" y="258" fill="#8da0d6" font-family="Arial" font-size="18">Roll Number · ${escapeXml(account.rollNumber)}</text><text x="64" y="350" fill="#a79bff" font-family="monospace" font-size="22">${escapeXml(account.email)}</text><text x="64" y="438" fill="#35e0d0" font-family="Arial" font-size="14" letter-spacing="2">VERIFIED ACADEMIC IDENTITY</text><rect x="700" y="150" width="120" height="120" fill="#081130" stroke="#35e0d0"/><text x="735" y="220" fill="#35e0d0" font-family="monospace" font-size="20">QR</text></svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = "skasc-email-card.svg"; anchor.click(); URL.revokeObjectURL(url); toast.success("Identity card downloaded");
}

function escapeXml(value: string) { return value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ?? character); }