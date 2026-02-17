document.addEventListener("DOMContentLoaded", function () {
    // Select code blocks to enable wrapping
    // We target both specific language blocks, generic blocks, and raw pre blocks
    // Note: pre > code targets standard markdown code blocks
    const codeBlocks = document.querySelectorAll('code[class^="language-"], .chroma code, .highlight code, pre > code');
    codeBlocks.forEach(codeBlock => {
        codeBlock.style.whiteSpace = 'pre-wrap';
        codeBlock.style.wordBreak = 'break-word';
        codeBlock.style.overflowWrap = 'anywhere'; // Improves breaking on long URLs/strings
    });

    // Also style the parent PRE to ensure it doesn't force horizontal scroll if code wraps
    const preBlocks = document.querySelectorAll('pre');
    preBlocks.forEach(pre => {
        pre.style.whiteSpace = 'pre-wrap';
        pre.style.wordBreak = 'break-word';
        pre.style.overflowWrap = 'anywhere';
    });

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

    syncLineHeight();
    window.addEventListener('resize', syncLineHeight);
});

