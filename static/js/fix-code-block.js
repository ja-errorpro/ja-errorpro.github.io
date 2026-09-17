// The wrapping rules (white-space / word-break / overflow-wrap on pre and code)
// used to be applied here as inline styles on DOMContentLoaded. That painted the
// non-wrapping layout first and then reflowed every code block into the wrapping
// one — worth 0.118 of CLS on a code-heavy post, on its own. They now live in
// cyberpunk.css, so they apply at parse time. CSS also covers content rendered
// later on the client (cf-secret), which this one-shot listener never did.
(function () {
    function syncLineHeight() {
        const tables = document.querySelectorAll('table.lntable, .highlight table');

        tables.forEach(table => {
            // Find the line number column and code column
            // Usually first and last td
            const lineNumTd = table.querySelector('td:first-child');
            const codeTd = table.querySelector('td:last-child');

            if (!lineNumTd || !codeTd) return;

            // Inside td, find the code element (or pre code)
            const lineNumCode = lineNumTd.querySelector('code');
            const codeCode = codeTd.querySelector('code');

            if (!lineNumCode || !codeCode) return;

            // Chroma with lineNumbersInTable=true typically outputs spans for lines
            // e.g. .lnt for line numbers, .line for code lines
            // If noClasses=true, we might need to rely on structure
            // Let's try to get all direct child spans
            const lineNumSpans = Array.from(lineNumCode.children).filter(el => el.tagName === 'SPAN');
            const codeSpans = Array.from(codeCode.children).filter(el => el.tagName === 'SPAN');

            if (lineNumSpans.length === codeSpans.length && lineNumSpans.length > 0) {
                for (let i = 0; i < lineNumSpans.length; i++) {
                    // Reset height
                    lineNumSpans[i].style.height = 'auto';
                    codeSpans[i].style.height = 'auto';

                    // Force block display to make height effective
                    lineNumSpans[i].style.display = 'block';
                    codeSpans[i].style.display = 'block';

                    // Get height
                    // We use getBoundingClientRect for sub-pixel precision possibly, or offsetHeight
                    const h1 = lineNumSpans[i].getBoundingClientRect().height;
                    const h2 = codeSpans[i].getBoundingClientRect().height;

                    const maxH = Math.max(h1, h2);

                    lineNumSpans[i].style.height = `${maxH}px`;
                    codeSpans[i].style.height = `${maxH}px`;
                }
            } else {
                // Fallback: If no spans found (text nodes only), wrapped text lines can't be synced easily 
                // without wrapping them in spans first.
                // This part is complex to implement without breaking syntax highlighting.
                // However, Chroma usually outputs spans for lines if lineNumbers are on.
            }
        });
    }

    // Run straight away rather than on DOMContentLoaded. This script tag sits at
    // the very end of the document, so every code block is already parsed, and
    // doing the work here means the spans go block + get their heights before the
    // first paint. Waiting for DOMContentLoaded painted the un-synced layout first
    // and then reflowed it — 0.18 of CLS on a code-heavy post.
    syncLineHeight();

    // Re-sync once the webfont is in: metrics change when JetBrains Mono replaces
    // the fallback, and after any resize.
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(syncLineHeight);
    }
    window.addEventListener('resize', syncLineHeight);
})();

