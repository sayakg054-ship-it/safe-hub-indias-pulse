import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Mail, Lock, User, ArrowRight } from "lucide-react";

interface AuthPageProps {
  onAuth: (action: "signin" | "signup", email: string, password: string, name?: string) => Promise<void>;
}

export function AuthPage({ onAuth }: AuthPageProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await onAuth(mode, email, password, name);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-background/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-background/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background/10 backdrop-blur-sm mb-4 animate-float">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-2 tracking-tight">SafeHub</h1>
          <p className="text-primary-foreground/70 text-sm">
            {mode === "signin" ? "Welcome back! Sign in to continue." : "Create an account to get started."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-background rounded-2xl shadow-xl p-6 space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          {success && <p className="text-emerald-600 text-sm text-center">{success}</p>}

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setSuccess(""); }}
              className="text-primary font-medium hover:underline"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
