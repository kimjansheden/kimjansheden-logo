import KimJanshedenLogo from "@components/KimJanshedenLogo";

// Export all components and utilities that should be available to consumers
/**
 * Important: Import the package CSS near where you use the component
 * so tooltip and animation styles are always available (especially in
 * Tailwind v4 projects that do not scan node_modules by default):
 *
 * ```ts
 * import 'kimjansheden-logo/styles.css';
 * ```
 */
export default KimJanshedenLogo;
export type { KimJanshedenLogoProps } from "@/types";
