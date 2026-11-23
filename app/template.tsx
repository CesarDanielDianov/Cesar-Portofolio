import { ViewTransition } from "react";

// Re-mounts on every route change. The page content itself is not wrapped, so the
// browser snapshots the whole viewport (root) before and after; CSS then peels the
// old page away from the bottom-right corner ("Corner peel" in globals.css).
// The empty flap element only exists so the transition has a third layer to paint
// the folded-over back of the page on; it is invisible outside a transition.
export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ViewTransition name="fx-peel-flap" share="fx-peel" default="none">
        <div aria-hidden="true" className="fx-peel-flap" />
      </ViewTransition>
      <div className="fx-page">{children}</div>
    </>
  );
}
