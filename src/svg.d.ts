// esbuild's text loader imports SVG files as strings.
declare module "*.svg" {
  const content: string;
  export default content;
}
