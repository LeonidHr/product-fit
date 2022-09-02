
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", documentEvents);
  
  function documentEvents(e) {
    const targetEl = e.target;

    if (targetEl.closest('[data-popup]')) {
      showModal('#popup');
    } else if (!targetEl.closest('.popup__content')) {
      hiddenModal('#popup');
    }

    if (targetEl.closest('[data-exit]')) {
      hiddenModal('#popup');
    }
  }
  
  document.addEventListener("keydown", e => {
    if (e.code === 'Escape') {
      hiddenModal('#popup');
    }
  });
  
  document.addEventListener("scroll", () => showBocks('.developments'));

  function showBocks(blocksSelector) {
    const blocks = document.querySelectorAll(blocksSelector);

    blocks.forEach(item => {
      if (window.scrollY + (window.innerHeight - 250) > item.offsetTop){
        item.classList.add('_show');
      }
    });
  }

  function showModal(popup) {
    document.querySelector(popup).classList.add('popup-open');
    document.documentElement.classList.add('lock');
  }

  function hiddenModal(popup) {
    document.querySelector(popup).classList.remove('popup-open');
    document.documentElement.classList.remove('lock');
  }
});