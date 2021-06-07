/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}
