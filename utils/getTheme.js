export default function(cssVariableName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${cssVariableName}`);
}