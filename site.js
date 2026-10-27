(() => {
  const bar = document.querySelector('.reading-progress span');
  const counter = document.querySelector('.stage-count');
  const stages = [...document.querySelectorAll('[data-stage]')];
  let scheduled = false;
  function update() {
    const range = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0})`;
    document.body.classList.toggle('has-scrolled', scrollY > 20);
    const center = innerHeight / 2;
    let nearest = 0;
    let distance = Infinity;
    stages.forEach((stage, i) => {
      const rect = stage.getBoundingClientRect();
      const current = Math.abs(rect.top + rect.height / 2 - center);
      if (current < distance) { distance = current; nearest = i; }
    });
    counter.textContent = `${String(nearest + 1).padStart(2, '0')} / ${String(stages.length).padStart(2, '0')}`;
    scheduled = false;
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  update();
})();
