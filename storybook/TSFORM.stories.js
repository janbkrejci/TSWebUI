import { action } from 'storybook/actions';
import template from './TSFORM.html?raw';
import './TSFORM.css';
import '../packages/ts-form/src/ts-form.js';
import { html } from 'lit-html';

export default {
    title: 'TSWebUI/TSFORM',
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: '600px'
            }
        }
    },
    render: (args) => {
        const theme = args.dark ? 'dark' : 'light';
        let htmlContent = template.replace(/\{\{theme\}\}/g, theme);

        const formRegex = /<ts-form([^>]*)>/;
        const match = htmlContent.match(formRegex);

        if (match) {
            const attributes = [
                `layout='${args.layout}'`,
                `fields='${args.fields}'`,
                `errors='${args.errors}'`,
                `buttons='${args.buttons}'`,
            ].join(' ');
            htmlContent = htmlContent.replace(formRegex, `<ts-form id="form" ${attributes}>`);
        }

        setTimeout(() => {
            const el = document.getElementById('form');
            if (el) {
                for (const e of ['form-changed', 'form-submit']) {
                    el.removeEventListener(e, action(e));
                    el.addEventListener(e, (ev) => {
                        action(e)(ev.detail);
                    });
                }
            }
        }, 0);

        return htmlContent;
    },
    argTypes: {
        dark: {
            control: 'boolean',
            description: 'Dark theme mode'
        },
        layout: {
            control: 'text',
            description: 'Form layout configuration (JSON object)'
        },
        fields: {
            control: 'text',
            description: 'Form fields configuration (JSON object)'
        },
        errors: {
            control: 'text',
            description: 'Form validation errors (JSON object)'
        },
        buttons: {
            control: 'text',
            description: 'Form buttons configuration (JSON array of objects: [{action, variant, label, disabled?, hidden?, position?}])'
        }
    },
};

const defaultArgs = {
    dark: false,
    buttons: '[]',
    layout: `{
        "tabs": [
            {
                "label": "User Info",
                "rows": [
                    [{"field": "name", "width": "1fr"}, {"field": "email", "width": "1fr"}],
                    [{"field": "userType", "width": "1fr"}, {"field": "preferences", "width": "1fr"}],
                    [{"field": "newsletter", "width": "1fr"}],
                    [{"field": "bio", "width": "2fr"}]
                ]
            },
            {
                "label": "Settings",
                "rows": [
                    [{"field": "preferences", "width": "1fr"}]
                ]
            },
            {
                "label": "Extra",
                "rows": [
                    [{"field": "extraField", "width": "1fr"}]
                ]
            }
        ]
    }`,
    fields: `{
        "name": {"type": "text", "label": "Name", "required": true},
        "email": {"type": "email", "label": "Email", "required": true},
        "userType": {
            "type": "radio",
            "label": "User Type",
            "options": [
                {"value": "admin", "label": "Admin"},
                {"value": "user", "label": "User"}
            ]
        },
        "preferences": {
            "type": "select",
            "label": "Preferences",
            "options": [
                {"value": "option1", "label": "Option 1"},
                {"value": "option2", "label": "Option 2"}
            ]
        },
        "newsletter": {"type": "checkbox", "label": "Subscribe to newsletter"},
        "bio": {"type": "textarea", "label": "Bio"},
        "extraField": {"type": "text", "label": "Extra Field"}
    }`,
    errors: `{}`
};

export const WithErrors = {
    args: {
        ...defaultArgs,
        errors: `{
            "name": "Name is required.",
            "email": "Please enter a valid email address.",
            "userType": "Please select a user type.",
            "preferences": "Please select a preference.",
            "newsletter": "You must subscribe to the newsletter.",
            "bio": "Bio is required."
        }`,
        buttons: '[{"action":"cancel","variant":"text","label":"Cancel","position":"left"}]'
    }
}

export const WithButtons = {
    args: {
        ...defaultArgs,
        buttons: '[{"action":"save","variant":"primary","label":"Save","position":"right"},{"action":"cancel","variant":"default","label":"Cancel","position":"left"}]'
    }
}

export const WithDisabledAndHiddenButtons = {
    args: {
        ...defaultArgs,
        buttons: '[{"action":"cancel","variant":"default","label":"Cancel","hidden":true,"position":"left"},{"action":"save","variant":"primary","label":"Save","disabled":true,"position":"right"}]'
    }
}
