// whole dedicated, separate element for lucide icons...
// this component (or lucide icons) may to be distributed with main package.
/// <reference types="lit" />

// @ts-ignore
import { LitElement, html, css, unsafeCSS, PropertyValues } from "../shared/LitUse";

// @ts-ignore
import { customElement, property } from "lit/decorators.js";

// @ts-ignore
import styles from "./index.scss?inline";

// @ts-ignore
@customElement('ui-shaped')
export class UIShaped extends LitElement {

    // also "display" may be "contents"
    static styles = css`${unsafeCSS(styles)}`;

    // theme style property
    @property({attribute: true, reflect: true, type: String}) icon: string = "";
    @property() protected themeStyle?: HTMLStyleElement;
    @property() protected nodes?: HTMLElement[];

    //
    constructor(options = {icon: "", padding: ""}) {
        super(); const self = this as unknown as HTMLElement;

        //
        self.classList?.add?.("ui-shaped");
        self.classList?.add?.("u2-shaped");

        //
        if (options?.icon) { this.icon = options?.icon; };
    }

    //
    public disconnectedCallback() {
        super.disconnectedCallback();
    }

    //
    public connectedCallback() {
        super.connectedCallback();

        //
        const self = this as unknown as HTMLElement;
        if (!self.hasAttribute("data-chroma")) { self.setAttribute("data-chroma", "0.1"); };
        if (!self.hasAttribute("data-scheme")) { self.setAttribute("data-scheme", "accent-inverse"); };
        if (!self.hasAttribute("data-highlight")) { self.setAttribute("data-highlight", "5"); };
        self.setAttribute("data-alpha", "0");
    }

    //
    protected createRenderRoot() {
        const root = super.createRenderRoot();

        //
        /*const parser = new DOMParser();
        const dom = parser.parseFromString(htmlCode, "text/html");
        this.nodes = Array.from((dom.querySelector("template") as HTMLTemplateElement)?.content?.childNodes) as HTMLElement[];
*/
        // @ts-ignore
        import(/* @vite-ignore */ "/externals/core/theme.js").then((module)=>{
            if (root) { this.themeStyle = module?.default?.(root); }
        }).catch(console.warn.bind(console));

        //
        return root;
    }

    //
    render() {
        return html`${this.themeStyle}<slot></slot><ui-icon data-chroma="0" data-alpha="0" data-scheme="dynamic" style="padding: 25%;" icon=${this.icon}></ui-icon>`;
    }
}

//
export default UIShaped;
