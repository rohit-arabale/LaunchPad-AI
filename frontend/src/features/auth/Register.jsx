import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/ui/magic-card";
import { useState } from "react";
import { useAuth } from "./useAuth.js";
import { Loader } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await handleRegister({ username, email, password });
      navigate("/login");
    } finally {
      setSubmitting(false);
    }
  };
  const { theme } = useTheme();

  if (submitting) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground animate-pulse">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-sm border-none p-0 shadow-none bg-transparent">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Enter your credentials to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-border border-t p-4 [.border-t]:pt-4 flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <p className="text-muted-foreground text-sm text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-foreground font-medium hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </MagicCard>
      </Card>
    </main>
  );
}

export default Register;
