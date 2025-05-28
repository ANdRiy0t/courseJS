
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.keyCode === 32) {
        const tag = e.target.tagName;
        if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
            e.preventDefault();
        }
    }
});
