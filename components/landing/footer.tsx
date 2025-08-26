import { Github } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-border bg-muted/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <p className="text-sm text-muted-foreground text-center sm:text-left flex items-center gap-2 justify-between">
              © 2025 Roamly. All rights reserved.{" "}
              <span className="text-primary">
                Made with ❤️ by{" "}
                <Link
                  target="_blank"
                  href="https://github.com/Rithvik8001"
                  className="hover:underline"
                >
                  Rithvik
                </Link>
              </span>
            </p>
            <div className="flex space-x-4">
              <Link
                target="_blank"
                href="https://github.com/Rithvik8001/Roamly"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
