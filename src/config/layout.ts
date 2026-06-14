/**
 * Shared layout class names — single source for page width, spacing, and offsets.
 * Mobile tweaks live in globals.css; lg+ breakpoints are unchanged.
 */
export const layout = {
  /** Centered page container (max 1440px) with responsive horizontal padding */
  container: "site-container",
  /** Offset below fixed header — responsive, matches header height on small screens */
  mainOffset: "main-offset",
  /** Default vertical rhythm between page sections */
  pageStack: "page-stack",
  /** Tighter section gaps (inner pages) */
  pageStackTight: "page-stack-tight",
  /** Looser section gaps (home page) */
  pageStackLoose: "page-stack-loose",
  /** Responsive product / card grid: 1 col mobile → 2 sm → 4 md */
  productGrid: "product-grid",
  /** Drawer panel: full width on mobile, capped on sm+ */
  drawerPanel: "drawer-panel",
  /** Responsive margin below section headers */
  sectionHeaderGap: "section-header-gap",
} as const;
