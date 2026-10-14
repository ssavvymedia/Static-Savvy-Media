import { useEffect, useRef } from "react";
import { cx } from "../../utils/helpers.js";

/**
 * ScrollReveal — wraps content and reveals it on scroll via IntersectionObserver.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  asTag = "div",
}) {
  const Tag = asTag;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold 0 (not a ratio): elements taller than ~6.7 viewports
      // (long blog bodies) can never reach a 15% ratio and stayed invisible.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag ref={ref} className={cx("reveal", className)} style={style}>
      {children}
    </Tag>
  );
}

export default ScrollReveal;
