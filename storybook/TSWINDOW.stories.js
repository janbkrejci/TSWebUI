import '../packages/ts-window/src/ts-window.js';

export default {
  title: 'TSWebUI/TSWindow',
  render: (args) => {
    const themeClass = args.dark ? 'sl-theme-dark' : 'sl-theme-light';
    const bgStyle = args.dark ? 'background-color: #2e2e2e; color: white;' : 'background-color: white; color: black;';
    return `
      <div class="${themeClass}" style="height: 600px; position: relative; border: 1px dashed #ccc; overflow: hidden; ${bgStyle}">
        <ts-window 
          id="demo-window" 
          label="${args.label}"
          top="${args.top}"
          left="${args.left}"
          width="${args.width}"
          height="${args.height}"
        >
          <div style="padding: 1rem;">
            <h3>Content Area</h3>
            <p>${args.content}</p>
            <button onclick="alert('Clicked!')">Interactive Button</button>
          </div>
        </ts-window>
      </div>
    `;
  },
  args: {
    dark: false,
    label: 'Test Window',
    content: 'This is a test window content.',
    width: 400,
    height: 300,
    top: 50,
    left: 50,
  },
  argTypes: {
    dark: { control: 'boolean', description: 'Dark theme mode' },
    label: { control: 'text' },
    content: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    top: { control: 'number' },
    left: { control: 'number' },
  },
};

export const Default = {};

export const Minimized = {
  render: (args) => {
    const themeClass = args.dark ? 'sl-theme-dark' : 'sl-theme-light';
    const bgStyle = args.dark ? 'background-color: #2e2e2e; color: white;' : 'background-color: white; color: black;';
    return `
     <div class="${themeClass}" style="height: 600px; position: relative; border: 1px dashed #ccc; overflow: hidden; ${bgStyle}">
        <ts-window 
          id="demo-window-min" 
          label="${args.label}" 
          top="${args.top}" 
          left="${args.left}"
          width="${args.width}" 
          height="${args.height}"
        >
            <div style="padding: 1rem;">
                <p>Initially minimized window content</p>
            </div>
        </ts-window>
        <script>
            setTimeout(() => {
                const win = document.getElementById('demo-window-min');
                if(win) win.minimize();
            }, 100);
        </script>
     </div>
    `;
  }
};

export const MultipleWindows = {
  render: (args) => {
    const themeClass = args.dark ? 'sl-theme-dark' : 'sl-theme-light';
    const bgStyle = args.dark ? 'background-color: #2e2e2e; color: white;' : 'background-color: white; color: black;';
    return `
    <div class="${themeClass}" style="height: 600px; position: relative; border: 1px dashed #ccc; overflow: hidden; ${bgStyle}">
      <ts-window label="Window 1" top="20" left="20" width="300" height="200">
        <div style="padding: 10px;">Window 1 content</div>
      </ts-window>
      <ts-window label="Window 2" top="50" left="350" width="300" height="200">
         <div style="padding: 10px;">Window 2 content</div>
      </ts-window>
    </div>
  `;
  }
};
