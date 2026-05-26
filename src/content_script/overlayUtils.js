export function isModalOrPopup(element) {
  const style = window.getComputedStyle(element);
  if (style.position !== 'fixed' && style.position !== 'sticky') return false;
  const zIndex = parseInt(style.zIndex, 10);
  if (isNaN(zIndex) || zIndex <= 100) return false;
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (vw === 0 || vh === 0) return false;
  // Must cover >40% of viewport in both axes to qualify as overlay
  return rect.width / vw > 0.4 && rect.height / vh > 0.4;
}

export function hideAd(element) {
  element.style.setProperty('display', 'none', 'important');
  const parent = element.parentNode;
  if (!parent) return;
  // Also hide any fixed backdrop sibling covering >70% of viewport
  Array.from(parent.children).forEach((sibling) => {
    if (sibling === element) return;
    const s = window.getComputedStyle(sibling);
    if (s.position !== 'fixed') return;
    const r = sibling.getBoundingClientRect();
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (vw === 0 || vh === 0) return;
    if (r.width / vw > 0.7 && r.height / vh > 0.7) {
      sibling.style.setProperty('display', 'none', 'important');
    }
  });
}
