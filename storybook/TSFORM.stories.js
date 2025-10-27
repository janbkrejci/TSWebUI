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
        }
    },
};

const defaultArgs = {
    dark: false,
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
        "bio": {"type": "textarea", "label": "Bio"}
    }`,
    errors: `{}`
};

export const DEFAULT = {
    args: {
        ...defaultArgs
    },
};

export const WithErrors = {
    args: {
        ...defaultArgs,
        errors: `{
            "name": "Name is required.",
            "email": "Please enter a valid email address."
        }`
    }
}
