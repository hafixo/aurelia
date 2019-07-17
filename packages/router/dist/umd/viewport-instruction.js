(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@aurelia/kernel", "@aurelia/runtime"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const kernel_1 = require("@aurelia/kernel");
    const runtime_1 = require("@aurelia/runtime");
    class ViewportInstruction {
        constructor(component, viewport, parameters, ownsScope = false, nextScopeInstruction = null) {
            this.component = null;
            this.componentName = null;
            this.viewport = null;
            this.viewportName = null;
            this.parametersString = null;
            this.parameters = null;
            this.parametersList = null;
            this.setComponent(component);
            this.setViewport(viewport);
            this.setParameters(parameters);
            this.ownsScope = ownsScope;
            this.nextScopeInstruction = nextScopeInstruction;
        }
        setComponent(component) {
            if (typeof component === 'string') {
                this.componentName = component;
                this.component = null;
            }
            else {
                this.component = component;
                this.componentName = component.description.name;
            }
        }
        setViewport(viewport) {
            if (viewport === undefined || viewport === '') {
                viewport = null;
            }
            if (typeof viewport === 'string') {
                this.viewportName = viewport;
                this.viewport = null;
            }
            else {
                this.viewport = viewport;
                if (viewport !== null) {
                    this.viewportName = viewport.name;
                }
            }
        }
        setParameters(parameters) {
            if (parameters === undefined || parameters === '') {
                parameters = null;
            }
            if (typeof parameters === 'string') {
                this.parametersString = parameters;
                // TODO: Initialize parameters better and more of them and just fix this
                this.parameters = { id: parameters };
            }
            else {
                this.parameters = parameters;
                // TODO: Create parametersString
            }
            // TODO: Deal with parametersList
        }
        componentType(context) {
            if (this.component !== null) {
                return this.component;
            }
            const container = context.get(kernel_1.IContainer);
            const resolver = container.getResolver(runtime_1.CustomElement.keyFrom(this.componentName));
            if (resolver !== null) {
                return resolver.getFactory(container).Type;
            }
            return null;
        }
        viewportInstance(router) {
            if (this.viewport !== null) {
                return this.viewport;
            }
            return router.allViewports()[this.viewportName];
        }
        sameComponent(other, compareParameters = false, compareType = false) {
            if (compareParameters && this.parametersString !== other.parametersString) {
                return false;
            }
            return compareType ? this.component === other.component : this.componentName === other.componentName;
        }
    }
    exports.ViewportInstruction = ViewportInstruction;
});
//# sourceMappingURL=viewport-instruction.js.map