/// <reference types="lit" />

// @ts-ignore
import { LitElement, html, css, unsafeCSS, unsafeStatic, withStatic } from "../shared/LitUse";

// @ts-ignore
import { customElement, property } from "lit/decorators.js";

// @ts-ignore
import htmlCode from "./index.html?raw";

// @ts-ignore
import styles from "./index.scss?inline";

/* class="ui-navbar" data-scheme="solid" data-highlight="2" */

// @ts-ignore
@customElement('ui-navbar')
export class UINavBar extends LitElement {
    // theme style property
    @property() protected themeStyle?: HTMLStyleElement;
    @property() protected nodes?: HTMLElement[];

    //
    @property({attribute: true, reflect: true, type: String}) icon : string = "";
    @property({attribute: true, reflect: true, type: String}) label: string = "";

    // also "display" may be "contents"
    static styles = css`${unsafeCSS(styles)}`;

    //
    protected render() {
        return html`${this.themeStyle}
            <button class="ui-back-button"  data-transparent data-scheme="dynamic-transparent" style="grid-column: back-button;"><ui-icon icon="chevron-down"/></button>
            <button class="ui-title-handle" data-transparent data-scheme="dynamic-transparent" style="grid-column: title-label;"><ui-icon icon=${this.icon}/>${this.label}</button>
            <button class="ui-menu-button"  data-transparent data-scheme="dynamic-transparent" style="grid-column: menu-button;"><ui-icon icon="menu"/></button>`;
    }

    //
    constructor(options = {icon: "", padding: ""}) {
        super(); const self = this as unknown as HTMLElement;

        //
        self.classList?.add?.("ui-navbar");
    }

    //
    protected createRenderRoot() {
        const root = super.createRenderRoot();

        //
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlCode, "text/html");
        this.nodes = Array.from((dom.querySelector("template") as HTMLTemplateElement)?.content?.childNodes) as HTMLElement[];

        // @ts-ignore
        import(/* @vite-ignore */ "/externals/core/theme.js").then((module)=>{
            if (root) { this.themeStyle = module?.default?.(root); }
        }).catch(console.warn.bind(console));

        //
        return root;
    }

}
