import { useRef, useEffect, useState } from 'react';
import { useFormStore } from '../store/formStore';
import { X, Code, Eye } from 'lucide-react';
import clsx from 'clsx';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
    const { getFormDefinition } = useFormStore();
    const formRef = useRef<HTMLElement>(null);
    const definition = getFormDefinition();
    const [activeTab, setActiveTab] = useState<'render' | 'source'>('render');

    // Initialize form when opening separate from the effect that updates it,
    // or just rely on activeTab change to re-trigger.
    useEffect(() => {
        if (isOpen && activeTab === 'render' && formRef.current) {
            const form = formRef.current;

            form.setAttribute('layout', JSON.stringify(definition.layout));
            form.setAttribute('fields', JSON.stringify(definition.fields));
            form.setAttribute('buttons', JSON.stringify(definition.buttons || []));

            // Initialize ts-form
            if (typeof (form as any).run === 'function') {
                (form as any).run();
            }
        }
    }, [isOpen, definition, activeTab]);

    if (!isOpen) return null;

    const sourceCode = `<ts-form
  layout='${JSON.stringify(definition.layout, null, 2)}'
  fields='${JSON.stringify(definition.fields, null, 2)}'
  buttons='${JSON.stringify(definition.buttons || [], null, 2)}'
></ts-form>
<script>
  document.querySelector('ts-form').run();
</script>`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[90vh] flex flex-col overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Preview</h2>
                        <div className="flex bg-gray-200 rounded p-1 gap-1">
                            <button
                                onClick={() => setActiveTab('render')}
                                className={clsx(
                                    "px-3 py-1 flex items-center gap-2 text-sm font-medium rounded transition-all",
                                    activeTab === 'render' ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                <Eye size={16} /> Render
                            </button>
                            <button
                                onClick={() => setActiveTab('source')}
                                className={clsx(
                                    "px-3 py-1 flex items-center gap-2 text-sm font-medium rounded transition-all",
                                    activeTab === 'source' ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                <Code size={16} /> Source
                            </button>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>
                <div className={clsx("flex-1 bg-gray-100 relative", activeTab === 'source' ? "p-6 overflow-auto" : "block w-full h-full overflow-hidden")}>
                    {activeTab === 'render' ? (
                        <ts-form ref={formRef} style={{ height: '100%' }}></ts-form>
                    ) : (
                        <div className="w-full h-full bg-gray-900 text-gray-100 p-6 rounded-lg overflow-auto font-mono text-sm leading-relaxed whitespace-pre">
                            {sourceCode}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Add intellisense for custom element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ts-form': any;
        }
    }
}
