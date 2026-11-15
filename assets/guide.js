// 追蹤固定範例的步驟，不在網頁內編譯 C++。
for (const trace of document.querySelectorAll('.trace')) {
    const steps = JSON.parse(trace.dataset.steps);
    let index = 0;
    const prev = trace.querySelector('[data-prev]');
    const next = trace.querySelector('[data-next]');
    const state = trace.querySelector('[data-state]');
    state.setAttribute('aria-live', 'polite');
    function render() {
        const [title, line, value, explanation] = steps[index];
        trace.querySelector('[data-title]').textContent = title;
        trace.querySelector('[data-line]').textContent = line;
        state.textContent = value;
        trace.querySelector('[data-explain]').textContent = explanation;
        trace.querySelector('[data-counter]').textContent = `${index + 1} / ${steps.length}`;
        prev.disabled = index === 0;
        next.disabled = index === steps.length - 1;
    }
    prev.addEventListener('click', () => { if (index > 0) { index--; render(); } });
    next.addEventListener('click', () => { if (index < steps.length - 1) { index++; render(); } });
}
for (const button of document.querySelectorAll('[data-score]')) {
    button.addEventListener('click', () => {
        const score = Number(button.dataset.score);
        const box = button.closest('.boundary');
        for (const item of box.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item === button));
        let explanation;
        if (score >= 80) explanation = `${score} >= 80 成立 → 輸出 A，後面不再判斷。`;
        else if (score >= 60) explanation = `${score} >= 80 不成立；${score} >= 60 成立 → 輸出 B。`;
        else explanation = `${score} >= 80 與 ${score} >= 60 都不成立 → 輸出 C。`;
        box.querySelector('.boundary-answer').textContent = explanation;
    });
}
