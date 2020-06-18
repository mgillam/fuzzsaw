import * as Sqrl from 'squirrelly';
import { SqrlConfig } from 'squirrelly/dist/types/config';
import { TemplateFunction } from "squirrelly/dist/types/compile";
import TemplateRenderer from './TemplateRenderer';

export class SqrlTemplateRenderer implements TemplateRenderer {
    private template: TemplateFunction;
    private variables: any;
    private sqrlConf : SqrlConfig = Sqrl.defaultConfig;
  

    constructor(template: string, variables?: any) {
        this.sqrlConf.autoEscape = false;
        this.template = Sqrl.compile(template, this.sqrlConf);
        this.variables = variables || {};
    }

    public render(data: any): string {
        return this.template(Object.assign(data, this.variables), this.sqrlConf);
    }
}