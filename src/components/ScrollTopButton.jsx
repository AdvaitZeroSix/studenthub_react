import useScrollTop from '../hooks/useScrollTop.js'

function ScrollTopButton() {
  const { visible, scrollToTop } = useScrollTop()

  return (
    <button
      id="scrollTopBtn"
      className={visible ? 'visible' : ''}
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      &#8679;
    </button>
  )
}

export default ScrollTopButton
