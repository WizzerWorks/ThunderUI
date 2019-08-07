/** The base plugin class applies for all plugins. Each plugin must match the name as it is returned from the WPE Framework
 * The supports object toggles what the plugin supports for the main ui
 */

class Plugin {
    /** Constructor
     * @{param} Name of the plugin for display on the UI
     * @{param} Support object to indicate plugin capabilities for the UI. Such as suspend/resume, toggle visibility and whether or not the plugin renders
     */
    constructor(pluginData) {
        this.callsign = pluginData.callsign;
        this.configuration = pluginData.configuration;
        this.classname = pluginData.classname;
        this.state = pluginData.state; // suspended, resumed, deactivated, activated
        this.supportsSuspended = false;
        this.supportsVisibility = false;
        this.renderInMenu = true;
        this.displayName = undefined;
        this.rendered = false;
    }

    activate(plugin) {
        const _rest = {
            method  : 'PUT',
            path    : `Controller/Activate/${this.callsign}`
        };

        const _rpc = {
            plugin : 'Controller',
            method : 'activate',
            params : {'callsign': this.callsign}
        };

        return api.req(_rest, _rpc)
    };

    deactivate(plugin) {
        const _rest = {
            method  : 'PUT',
            path    : `Controller/Deactivate/${this.callsign}`,
            body    : null
        };

        const _rpc = {
            plugin : 'Controller',
            method : 'deactivate',
            params : {'callsign': this.callsign}
        };

        return api.req(_rest, _rpc)
    };

    suspend(plugin) {
        const _rest = {
            method  : 'PUT',
            path    : `${this.callsign}/Suspend`
        };

        const _rpc = {
            plugin : this.callsign,
            method : 'state',
            params : 'suspend'
        };

        return api.req(_rest, _rpc)
    };

    resume(plugin) {
        const _rest = {
            method  : 'PUT',
            path    : `${this.callsign}/Resume`
        };

        const _rpc = {
            plugin : this.callsign,
            method : 'state',
            params : 'resume'
        };

        return api.req(_rest, _rpc)
    };

    show(plugin) {
        const _rest = {
            method  : 'PUT',
            path    : `${this.callsign}/Show`,
            body    : null
        };

        const _rpc = {
            plugin : this.callsign,
            method : 'visibility',
            params : 'visible'
        };

        return api.req(_rest, _rpc)
    };

    hide(plugin) {
        const _rest = {
            method  : 'PUT',
            path    : `${this.callsign}/Hide`,
            body    : null
        };

        const _rpc = {
            plugin : this.callsign,
            method : 'visibility',
            params : 'hidden'
        };

        return api.req(_rest, _rpc)
    };

    status(plugin) {
        const _rest = {
            method  : 'GET',
            path    : this.callsign
        };

        const _rpc = {
            plugin : this.callsign,
            method : 'status'
        };

        return api.req(_rest, _rpc);
    }


    /** The render function is called when the plugin needs to render on screen */
    render()        {
        this.rendered = true;
    }


    /** Theclose function is called when the plugin needs to clean up */
    close()         {
        this.rendered = false;
    }
}

export default Plugin;
