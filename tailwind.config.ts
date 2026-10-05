import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { forest:{50:"#f1fbf5",100:"#dff5e6",500:"#0c8f3e",600:"#087a35",700:"#05662c",800:"#03491f",900:"#022f15"}, brand:{green:"#0c8f3e",bright:"#13d74c",red:"#f51d2a",dark:"#03160b"} },
    boxShadow:{soft:"0 14px 40px rgba(3,22,11,.10)"}
  }},
  plugins:[]
};
export default config;