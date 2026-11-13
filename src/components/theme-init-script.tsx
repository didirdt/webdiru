/**
 * Runs before paint so the correct theme is applied on the very first frame.
 * Kept inline (not bundled) on purpose — it must block rendering.
 */
const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=s==="dark"||(s!=="light"&&d);var e=document.documentElement;e.classList.toggle("dark",dark);e.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export function ThemeInitScript() {
  return (
    <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
  );
}
