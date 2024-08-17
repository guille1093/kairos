import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Origami } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2">
            <div className="flex flex-row justify-center">
              <Origami strokeWidth={1} className="h-12 w-12" />
              <h1 className="text-5xl font-bold">Kairós</h1>

            </div>
            <h2 className="text-center">Iniciar sesión</h2>
          </div>
          <form
            action={async (formData) => {
              "use server";
                    try {
                      await signIn("credentials", {username: formData.get("username"), password: formData.get("password"), redirect: true, redirectTo: "/home"})
                   } catch(error) {
                     if (error instanceof AuthError)
                     console.log(error) // Handle auth errors
                     throw error // Rethrow all other errors
                   }
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="username">Email</Label>
              <Input name="username" type="text" placeholder="Email" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
              <Input
                name="password"
                type="password"
                placeholder="Contraseña"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
            <Button variant="outline" className="w-full">
              Continuar con Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span>¿No tienes una cuenta? </span>
            <Link href="#" className="underline font-bold">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/dark.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
