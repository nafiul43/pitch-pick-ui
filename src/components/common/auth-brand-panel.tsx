export function AuthBrandPanel() {
  return (
    <div className="auth-brand-bg hidden flex-col justify-center p-8 lg:flex lg:min-h-svh lg:p-12 lg:gap-y-12">
      <p className="font-heading text-white text-2xl font-semibold tracking-tight lg:text-5xl">
        Pitch Pick
      </p>
      <div className="flex-1 flex flex-col justify-center mt-6 space-y-1">
        <p className="text-primary text-2xl leading-none font-semibold tracking-tight lg:text-5xl">
          Draft.
        </p>
        <p className="text-accent-foreground pl-12 text-2xl leading-none font-semibold tracking-tight lg:pl-16 lg:text-5xl">
          Compete.
        </p>
        <p className="text-[#fcb603] pl-24 text-2xl leading-none font-semibold tracking-tight lg:pl-32 lg:text-5xl">
          Dominate.
        </p>
      </div>
      <p className="text-muted-foreground mt-4 max-w-md text-xs">
        Copyright © 2026 Pitch Pick. All rights reserved.
      </p>
    </div>
  );
}
