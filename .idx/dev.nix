{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.bun
    pkgs.nodejs_latest
    pkgs.vercel-pkg
  ];
  idx.extensions = [
    "bradlc.vscode-tailwindcss"
    "esbenp.prettier-vscode"
    "streetsidesoftware.code-spell-checker"
  ];
}
