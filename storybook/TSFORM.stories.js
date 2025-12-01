import { action } from 'storybook/actions';
import template from './TSFORM.html?raw';
import './TSFORM.css';
import '../packages/ts-form/src/ts-form.js';
import '../packages/ts-table/src/ts-table.js';
import { html } from 'lit-html';

export default {
    title: 'TSWebUI/TSFORM',
    parameters: {
        layout: 'fullscreen'
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
                `values='${args.values}'`,
            ].join(' ');
            htmlContent = htmlContent.replace(formRegex, `<ts-form id="form" ${attributes}>`);
        }

        setTimeout(() => {
            const el = document.getElementById('form');
            if (el) {
                customElements.whenDefined('ts-form').then(() => {
                    el.run();
                });

                for (const e of ['form-changed', 'form-submit', 'form-field-action']) {
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
        values: {
            control: 'text',
            description: 'Initial form values (JSON object)'
        },
        buttons: {
            control: 'text',
            description: 'Form buttons configuration (JSON array of objects: [{action, variant, label, disabled?, hidden?, position?, confirmation?}])'
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
                    [{"field": "name", "width": "1fr"}],
                    [{"field": "password", "width": "1fr"}],
                    [{"field": "userType", "width": "1fr"}, {"field": "preferences", "width": "1fr"}],
                    [{"field": "combobox", "width": "1fr"}],
                    [{"field": "newsletter", "width": "1fr"}, {"field": "enableFeature", "width": "1fr"}],
                    [{"field": "volume", "width": "2fr"}],
                    [{"field": "invoiceStatus", "width": "1fr"}],
                    [{"field": "testButton", "width": "1fr"}],
                    [{"field": "bio", "width": "2fr"}],
                    [{"field": "uploadImage", "width": "1fr"}],
                    [{"field": "extraField", "width": "1fr"}]
                ]
            }
        ]
    }`,
    fields: `{
        "name": {"type": "text", "label": "Name", "required": true},

        "password": {"type": "password", "label": "Password"},
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
        "combobox": {
            "type": "combobox",
            "label": "Combobox",
            "options": [
                {"value": "item1", "label": "Item 1"},
                {"value": "item2", "label": "Item 2"},
                {"value": "item3", "label": "Item 3"}
            ]
        },
        "newsletter": {"type": "checkbox", "label": "Subscribe to newsletter"},
        "enableFeature": {"type": "switch", "label": "Enable Feature"},
        "volume": {"type": "slider", "label": "Volume", "min": 0, "max": 100, "step": 1},
        "invoiceStatus": {"type": "button-group", "options": ["active/true/primary/Aktivní", "inactive/false/default/Neaktivní", "paid/true/default/Zaplaceno"]},
        "testButton": {"type": "button", "label": "Test Button", "variant": "primary", "action": "test"},
        "bio": {"type": "textarea", "label": "Bio"},
        "extraField": {"type": "text", "label": "Extra Field"},
        "uploadImage": {"type": "image", "label": "Nahrát obrázky", "multiple": true}
    }`,
    errors: `{}`,
    values: `{}`
};

export const Default = {
    args: {
        ...defaultArgs
    }
};

export const WithErrors = {
    args: {
        layout: `{
            "rows": [
                [{"field": "name", "width": "1fr"}],
                [{"field": "password", "width": "1fr"}],
                [{"field": "userType", "width": "1fr"}, {"field": "preferences", "width": "1fr"}],
                [{"field": "combobox", "width": "1fr"}],
                [{"field": "newsletter", "width": "1fr"}, {"field": "enableFeature", "width": "1fr"}],
                [{"field": "volume", "width": "2fr"}],
                [{"field": "invoiceStatus", "width": "1fr"}],
                [{"field": "bio", "width": "2fr"}],
                [{"field": "age", "width": "1fr"}],
                [{"field": "startDate", "width": "1fr"}, {"field": "meetingTime", "width": "1fr"}],
                [{"field": "department", "width": "1fr"}, {"field": "projects", "width": "1fr"}],
                [{"field": "uploadFile", "width": "1fr"}, {"field": "uploadImage", "width": "1fr"}]
            ]
        }`,
        fields: `{
            "name": {"type": "text", "label": "Name", "required": true},

            "password": {"type": "password", "label": "Password"},
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
            "combobox": {
                "type": "combobox",
                "label": "Combobox",
                "options": [
                    {"value": "item1", "label": "Item 1"},
                    {"value": "item2", "label": "Item 2"}
                ]
            },
            "newsletter": {"type": "checkbox", "label": "Subscribe to newsletter"},
            "enableFeature": {"type": "switch", "label": "Enable Feature"},
            "volume": {"type": "slider", "label": "Volume", "min": 0, "max": 100, "step": 1},
            "invoiceStatus": {"type": "button-group", "label": "Invoice Status", "options": ["active/true/primary/Aktivní", "inactive/false/default/Neaktivní"]},
            "bio": {"type": "textarea", "label": "Bio"},
            "age": {"type": "number", "label": "Age"},

            "startDate": {"type": "date", "label": "Start Date"},
            "meetingTime": {"type": "datetime", "label": "Meeting Time"},
            "department": {
                "label": "Department (N:1)",
                "type": "relationship",
                "targetEntity": "department",
                "mode": "single",
                "displayFields": ["name"],
                "valueField": "id",
                "options": [
                    { "id": 1, "name": "IT" },
                    { "id": 2, "name": "HR" }
                ]
            },
            "projects": {
                "label": "Projects (M:N)",
                "type": "relationship",
                "targetEntity": "project",
                "mode": "multiple",
                "displayFields": ["name"],
                "chipDisplayFields": ["name"],
                "valueField": "id",
                "options": [
                    { "id": 101, "name": "Project A" },
                    { "id": 102, "name": "Project B" }
                ]
            },
            "uploadFile": {"type": "file", "label": "Nahrát soubor"},
            "uploadImage": {"type": "image", "label": "Nahrát obrázky", "multiple": true}
        }`,
        errors: `{
            "name": "Name is required.",
            "password": "Password is required.",

            "userType": "Please select a user type.",
            "preferences": "Please select a preference.",
            "combobox": "Please select an option.",
            "newsletter": "You must subscribe to the newsletter.",
            "enableFeature": "Feature must be enabled.",
            "volume": "Volume must be set.",
            "invoiceStatus": "Please select invoice status.",
            "bio": "Bio is required.",
            "age": "Age must be valid.",

            "startDate": "Date is required.",
            "meetingTime": "Time is required.",
            "department": "Department is required.",
            "projects": "At least one project is required.",
            "uploadFile": "File is required.",
            "uploadImage": "Image is required."
        }`,
        buttons: '[{"action":"cancel","variant":"text","label":"Cancel","position":"left"}]',
        values: '{}'
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

export const WithConfirmation = {
    args: {
        ...defaultArgs,
        buttons: '[{"action":"cancel","variant":"text","label":"Cancel","position":"left"},{"action":"delete","variant":"danger","label":"Delete","position":"right","confirmation":{"title":"Potvrdit akci","text":"Opravdu smazat záznam?","buttons":[{"action":"no","variant":"default","label":"Ne","position":"left"},{"action":"yes","variant":"danger","label":"Ano","confirm":true,"position":"right"}]}}]'
    }
}

export const WithValues = {
    args: {
        ...defaultArgs,
        values: `{
            "name": "John Doe",
            "email": "john@example.com",
            "password": "secret123",
            "userType": "user",
            "preferences": "option1",
            "combobox": "item2",
            "newsletter": true,
            "enableFeature": true,
            "volume": 75,
            "invoiceStatus": "active",
            "bio": "Some bio text",
            "extraField": "Extra value"
        }`
    }
}

export const Complex = {
    args: {
        ...defaultArgs,
        layout: JSON.stringify({
            tabs: [
                {
                    label: 'Osobní údaje',
                    rows: [
                        [{ field: 'name' }, { field: 'surname' }],
                        [{ field: 'birthdate' }]
                    ]
                },
                {
                    label: 'Účet',
                    rows: [
                        [{ field: 'username' }, { field: 'password' }],
                        [{ field: 'role' }, { field: 'active' }],
                        [{ field: 'department' }]
                    ]
                },
                {
                    label: 'Detaily',
                    rows: [
                        [{ field: 'bio' }],
                        [{ field: 'avatar' }, { field: 'resume' }]
                    ]
                },
                {
                    label: 'Nastavení',
                    rows: [
                        [{ field: 'notifications' }],
                        [{ field: 'theme' }],
                        [{ field: 'projects' }]
                    ]
                },
                {
                    label: 'Tabulka',
                    rows: [
                        [{ field: 'history' }]
                    ]
                }
                ,
                {
                    label: 'Další prvky',
                    rows: [
                        [{ field: 'section1' }],
                        [{ field: 'terms', width: '1fr' }, { field: 'satisfaction', width: '2fr' }],
                        [{ field: 'country' }, { field: 'meetingTime' }, { field: 'startDate' }],
                        [{ field: 'section2' }],
                        [{ field: 'age', width: '150px' }],
                        [{ field: 'section3' }],
                        [{ type: 'empty' }, { field: 'statusGroup', align: 'right' }],
                        [{ field: 'actionButton' }]
                    ]
                }
            ]
        }),
        fields: JSON.stringify({
            // Basic Info
            name: { label: 'Jméno', type: 'text', required: true },
            surname: { label: 'Příjmení', type: 'text', required: true },


            // Account Info
            username: { label: 'Uživatelské jméno', type: 'text', required: true },
            password: { label: 'Heslo', type: 'password', required: true },
            role: {
                label: 'Role',
                type: 'select',
                options: [
                    { value: 'admin', label: 'Administrátor' },
                    { value: 'manager', label: 'Manažer' },
                    { value: 'user', label: 'Uživatel' },
                    { value: 'guest', label: 'Host' }
                ]
            },
            active: { label: 'Aktivní účet', type: 'switch', labelPosition: 'right' },

            // Details
            birthdate: { label: 'Datum narození', type: 'date' },
            bio: { label: 'Životopis', type: 'textarea', hideLabel: true, placeholder: 'Životopis (bez labelu)' },
            avatar: { label: 'Profilový obrázek', type: 'image', multiple: true },
            resume: { label: 'Životopis (PDF)', type: 'file', multiple: true },

            // Preferences
            notifications: {
                label: 'Notifikace',
                type: 'select',
                multiple: true,
                options: [
                    { value: 'email', label: 'E-mail' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'push', label: 'Push notifikace' },
                    { value: 'slack', label: 'Slack' }
                ]
            },
            theme: {
                label: 'Preferovaný vzhled',
                type: 'radio',
                options: [
                    { value: 'light', label: 'Světlý' },
                    { value: 'dark', label: 'Tmavý' },
                    { value: 'auto', label: 'Automaticky' }
                ]
            },

            // Relationships
            department: {
                label: 'Oddělení (N:1)',
                type: 'relationship',
                targetEntity: 'department',
                mode: 'single',
                displayFields: ['name'],
                valueField: 'id',
                options: [
                    { id: 1, name: 'IT', code: 'DEP-01' },
                    { id: 2, name: 'HR', code: 'DEP-02' },
                    { id: 3, name: 'Sales', code: 'DEP-03' },
                    { id: 4, name: 'Marketing', code: 'DEP-04' }
                ]
            },
            projects: {
                label: 'Projekty (M:N)',
                type: 'relationship',
                targetEntity: 'project',
                mode: 'multiple',
                displayFields: ['code', 'name'],
                chipDisplayFields: ['name'],
                valueField: 'id',
                options: [
                    { id: 101, name: 'Website Redesign', code: 'PRJ-WEB' },
                    { id: 102, name: 'Mobile App', code: 'PRJ-APP' },
                    { id: 103, name: 'Cloud Migration', code: 'PRJ-CLOUD' },
                    { id: 104, name: 'Security Audit', code: 'PRJ-SEC' },
                    { id: 105, name: 'AI Integration', code: 'PRJ-AI' },
                    { id: 106, name: 'Database Optimization', code: 'PRJ-DB' },
                    { id: 107, name: 'API Restructuring', code: 'PRJ-API' },
                    { id: 108, name: 'Frontend Refactor', code: 'PRJ-FE' },
                    { id: 109, name: 'Backend Refactor', code: 'PRJ-BE' },
                    { id: 110, name: 'DevOps Pipeline', code: 'PRJ-OPS' },
                    { id: 111, name: 'User Testing', code: 'PRJ-UX' },
                    { id: 112, name: 'Market Research', code: 'PRJ-MKT' },
                    { id: 113, name: 'Legal Compliance', code: 'PRJ-LEG' },
                    { id: 114, name: 'GDPR Audit', code: 'PRJ-GDPR' },
                    { id: 115, name: 'Network Upgrade', code: 'PRJ-NET' },
                    { id: 116, name: 'Server Migration', code: 'PRJ-SRV' },
                    { id: 117, name: 'Client Onboarding', code: 'PRJ-CLI' },
                    { id: 118, name: 'Internal Training', code: 'PRJ-TRN' },
                    { id: 119, name: 'Documentation', code: 'PRJ-DOC' },
                    { id: 120, name: 'Legacy Retirement', code: 'PRJ-OLD' }
                ]
            },

            // History Table
            history: {
                label: 'Historie aktivit',
                type: 'table',
                // Table feature flags
                showCreateButton: true,
                showImportButton: true,
                showExportButton: true,
                showColumnSelector: true,
                enableSorting: true,
                enableFiltering: true,
                enableColumnResizing: true,
                enableColumnReordering: true,
                enableSelection: true,
                enableRowMenu: true,
                enableClickableRows: true,
                enableClickableColumns: true,
                enablePagination: true,
                itemsPerPage: 5,
                itemsPerPageOptions: [5, 10, 20],
                singleItemActions: 'view_details/Zobrazit detaily,edit/Upravit,delete/Smazat',
                multipleItemsActions: 'delete_selected/Smazat vybrané,export_selected/Exportovat vybrané',

                columns: [
                    {
                        field: 'date',
                        header: 'Datum',
                        type: 'date',
                        sortable: true,
                        filterable: true,
                        canBeCopied: true,
                        isClickable: true,
                        align: 'right'
                    },
                    {
                        field: 'action',
                        header: 'Akce',
                        type: 'text',
                        sortable: true,
                        filterable: true,
                        isClickable: true
                    },
                    {
                        field: 'user',
                        header: 'Uživatel',
                        type: 'text',
                        sortable: true,
                        filterable: true
                    }
                ],
                data: [
                    { id: 1, date: '2023-01-01', action: 'Login', user: 'jnovak' },
                    { id: 2, date: '2023-01-02', action: 'Update Profile', user: 'jnovak' },
                    { id: 3, date: '2023-01-03', action: 'Logout', user: 'jnovak' },
                    { id: 4, date: '2023-01-04', action: 'Login', user: 'jnovak' },
                    { id: 5, date: '2023-01-05', action: 'View Report', user: 'jnovak' },
                    { id: 6, date: '2023-01-06', action: 'Export Data', user: 'jnovak' },
                    { id: 7, date: '2023-01-07', action: 'Logout', user: 'jnovak' }
                ]
            }
            ,

            // Other Elements
            section1: { type: 'separator', label: 'Základní nastavení' },
            section2: { type: 'separator', label: 'Osobní údaje' },
            section3: { type: 'separator', label: 'Akce' },
            terms: { label: 'Souhlasím s podmínkami', type: 'checkbox' },
            satisfaction: { label: 'Spokojenost', type: 'slider', min: 0, max: 100, step: 10 },
            country: {
                label: 'Země (Combobox)',
                type: 'combobox',
                options: [
                    { value: 'cz', label: 'Česká republika' },
                    { value: 'sk', label: 'Slovensko' },
                    { value: 'de', label: 'Německo' },
                    { value: 'pl', label: 'Polsko' },
                    { value: 'at', label: 'Rakousko' }
                ]
            },
            startDate: { label: 'Datum zahájení (Date only)', type: 'date' },
            meetingTime: { label: 'Čas schůzky', type: 'datetime' },
            age: { label: 'Věk', type: 'number', min: 0, max: 120 },

            statusGroup: {
                type: 'button-group',
                variant: 'process',
                label: 'Status',
                options: [
                    'draft/true/default/Koncept',
                    'published/true/success/Publikováno',
                    'archived/true/warning/Archivováno'
                ]
            },
            actionButton: {
                type: 'button',
                label: 'Provést akci',
                variant: 'primary',
                action: 'custom_action'
            }
        }),
        buttons: JSON.stringify([
            { action: 'cancel', label: 'Zrušit', variant: 'default' },
            { action: 'save', label: 'Uložit', variant: 'primary' }
        ]),
        values: JSON.stringify({
            name: 'Jan',
            surname: 'Novák',

            username: 'jnovak',
            password: 'password123',
            role: 'user',
            active: false,
            birthdate: '1990-05-15',
            bio: 'Zkušený vývojář se zaměřením na webové technologie.',
            theme: 'dark',
            notifications: ['email', 'push'],
            department: 2,
            projects: [101, 103],
            terms: true,
            satisfaction: 80,
            country: 'cz',
            age: 30,

            statusGroup: 'published',
            meetingTime: '2023-11-15 14:30',
            startDate: '2023-01-01'
        })
    }
}


export const AllElements = {
    render: (args) => {
        const form = document.createElement('ts-form');
        if (args.layout) form.setAttribute('layout', args.layout);
        if (args.fields) form.setAttribute('fields', args.fields);
        if (args.errors) form.setAttribute('errors', args.errors);
        if (args.buttons) form.setAttribute('buttons', args.buttons);
        if (args.values) form.setAttribute('values', args.values);

        form.addEventListener('form-field-action', (e) => {
            console.log('Form Field Action:', e.detail);
            if (e.detail.action === 'do-import') {
                // Simulate import processing
                setTimeout(() => {
                    const results = {
                        added: Math.floor(Math.random() * 10),
                        updated: Math.floor(Math.random() * 10),
                        skipped: Math.floor(Math.random() * 5),
                        rejected: Math.floor(Math.random() * 2),
                        rejectedRows: []
                    };
                    console.log('Simulating import results:', results);
                    form.showImportResults(e.detail.field, results);
                }, 1000);
            }
        });

        // Ensure run() is called after the element is attached
        setTimeout(() => {
            customElements.whenDefined('ts-form').then(() => {
                form.run();
            });
        }, 0);

        return form;
    },
    args: {
        ...defaultArgs,
        layout: JSON.stringify({
            tabs: [
                {
                    label: 'Text Inputs',
                    rows: [
                        [{ type: 'separator', label: 'Text Input' }],
                        [{ field: 'text' }],

                        [{ type: 'separator', label: 'Textarea' }],
                        [{ field: 'textarea' }]
                    ]
                },
                {
                    label: 'Numeric & Date',
                    rows: [
                        [{ type: 'separator', label: 'Number Input' }],
                        [{ field: 'number' }],
                        [{ type: 'separator', label: 'Slider' }],
                        [{ field: 'slider' }],
                        [{ type: 'separator', label: 'Date Picker' }],
                        [{ field: 'date' }],
                        [{ type: 'separator', label: 'Datetime Picker' }],
                        [{ field: 'datetime' }]
                    ]
                },
                {
                    label: 'Selects & Pickers',
                    rows: [
                        [{ type: 'separator', label: 'Select' }],
                        [{ field: 'select' }],
                        [{ type: 'separator', label: 'Multiselect' }],
                        [{ field: 'multiselect' }],
                        [{ type: 'separator', label: 'Combobox' }],
                        [{ field: 'combobox' }],
                        [{ type: 'separator', label: 'Relationship Picker (Single)' }],
                        [{ field: 'relationshipSingle' }],
                        [{ type: 'separator', label: 'Relationship Picker (Multiple)' }],
                        [{ field: 'relationshipMultiple' }]
                    ]
                },
                {
                    label: 'Toggles & Buttons',
                    rows: [
                        [{ type: 'separator', label: 'Checkbox' }],
                        [{ field: 'checkbox' }],
                        [{ type: 'separator', label: 'Switch' }],
                        [{ field: 'switch' }],
                        [{ type: 'separator', label: 'Radio Group' }],
                        [{ field: 'radio' }],
                        [{ type: 'separator', label: 'Button Group' }],
                        [{ field: 'buttonGroup' }],
                        [{ type: 'separator', label: 'Button Field' }],
                        [{ field: 'button' }]
                    ]
                },
                {
                    label: 'Files & Media',
                    rows: [
                        [{ type: 'separator', label: 'File Upload' }],
                        [{ field: 'file' }],
                        [{ type: 'separator', label: 'Image Upload' }],
                        [{ field: 'image' }]
                    ]
                },
                {
                    label: 'Table',
                    rows: [
                        [{ type: 'separator', label: 'Data Table' }],
                        [{ field: 'table' }]
                    ]
                }
            ]
        }),
        fields: JSON.stringify({
            // Text Inputs
            text: { type: 'text', label: 'Text Field' },

            textarea: { type: 'textarea', label: 'Textarea Field', rows: 3 },

            // Numeric & Date
            number: { type: 'number', label: 'Number Field', min: 0, max: 100 },
            slider: { type: 'slider', label: 'Slider Field', min: 0, max: 100, step: 10 },
            date: { type: 'date', label: 'Date Field' },
            datetime: { type: 'datetime', label: 'Datetime Field' },

            // Selects & Pickers
            select: {
                type: 'select',
                label: 'Select Field',
                options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]
            },
            multiselect: {
                type: 'select',
                label: 'Multiselect Field',
                multiple: true,
                options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]
            },
            combobox: {
                type: 'combobox',
                label: 'Combobox Field',
                options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]
            },
            relationshipSingle: {
                type: 'relationship',
                label: 'Relationship (Single)',
                targetEntity: 'entity',
                mode: 'single',
                displayFields: ['name'],
                valueField: 'id',
                options: [{ id: 1, name: 'Entity 1' }, { id: 2, name: 'Entity 2' }]
            },
            relationshipMultiple: {
                type: 'relationship',
                label: 'Relationship (Multiple)',
                targetEntity: 'entity',
                mode: 'multiple',
                displayFields: ['name'],
                chipDisplayFields: ['name'],
                valueField: 'id',
                options: [{ id: 1, name: 'Entity 1' }, { id: 2, name: 'Entity 2' }]
            },

            // Toggles & Buttons
            checkbox: { type: 'checkbox', label: 'Checkbox Field' },
            switch: { type: 'switch', label: 'Switch Field' },
            radio: {
                type: 'radio',
                label: 'Radio Field',
                options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]
            },
            buttonGroup: {
                type: 'button-group',
                label: 'Button Group',
                options: ['1/true/default/Option 1', '2/true/primary/Option 2']
            },
            button: { type: 'button', label: 'Button Field', variant: 'primary', action: 'click' },

            // Files & Media
            file: { type: 'file', label: 'Nahrát soubor' },
            image: { type: 'image', label: 'Nahrát obrázky', multiple: true },

            // Table
            table: {
                label: 'Example Table',
                type: 'table',
                showCreateButton: true,
                showImportButton: true,
                showExportButton: true,
                showColumnSelector: true,
                enableSorting: true,
                enableFiltering: true,
                enableColumnResizing: true,
                enableColumnReordering: true,
                enableSelection: true,
                enableRowMenu: true,
                enableClickableRows: true,
                enableClickableColumns: true,
                enablePagination: true,
                itemsPerPage: 5,
                itemsPerPageOptions: [5, 10, 20],
                singleItemActions: 'view_details/Zobrazit detaily,edit/Upravit,delete/Smazat',
                multipleItemsActions: 'delete_selected/Smazat vybrané,export_selected/Exportovat vybrané',
                columns: [
                    { field: 'id', header: 'ID', type: 'number', sortable: true, filterable: true, width: '80px' },
                    { field: 'name', header: 'Name', type: 'text', sortable: true, filterable: true },
                    { field: 'status', header: 'Status', type: 'text', sortable: true, filterable: true }
                ],
                data: [
                    { id: 1, name: 'Item 1', status: 'Active' },
                    { id: 2, name: 'Item 2', status: 'Inactive' },
                    { id: 3, name: 'Item 3', status: 'Active' }
                ]
            }
        }),
        values: '{}'
    }
}


