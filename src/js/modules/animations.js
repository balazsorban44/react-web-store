document.addEventListener('DOMContentLoaded', function() {
  const landing = document.getElementById('landing')
  const mobileMenu = document.getElementById('mobile')
  const logo = document.getElementById('logo')
  const fadeOut = document.getElementsByClassName('opacity')
  const menu = document.getElementById('menu')
  const menuItem = document.querySelectorAll('#menu li a')
  const navBg = document.getElementById('scrolled-nav-bg')
  const introImg = document.getElementById('carousel')
  var fromTop = 0

  function atMedia(m,width,callback){
    window.matchMedia(`(${m}-width: ${width}px)`).matches ? callback() : -1
  }

  atMedia('max',2000, () => {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle("active-mobile-menu")
      menu.classList.toggle("active-menu")
      logo.classList.toggle("hidden")
    })
    for (var i = 0; i < menuItem.length; i++) {
      menuItem[i].addEventListener('click', () => {
        mobileMenu.classList.toggle("active-mobile-menu")
        menu.classList.toggle("active-menu")
        logo.classList.toggle("hidden")
      })
    }
  })
  if (document.getElementsByTagName('BODY')[0].getAttribute('id') != 'store') {
    document.addEventListener('scroll', () => {
      fromTop = document.getElementsByTagName('body')[0].scrollTop /  window.outerHeight * 100
      for (var i = 0; i < fadeOut.length; i++) {
        fadeOut[i].style.opacity = 1 - fromTop/15
      }
      if(window.scrollY <= 0 || fromTop <= 14){
        if (window.matchMedia("(max-width: 480px)").matches) {
          logo.style.maxHeight = 13 - fromTop/2 + "vh"
        } else {
          logo.style.maxHeight = "72px"
        }
        logo.style.marginRight = fromTop*4.9 + "vmin"
        logo.classList.remove("fixed-nav-logo")
        fadeOut[1].style.marginBottom="24px"
        introImg.style.marginTop = ""
        if (window.matchMedia("(min-width: 360px)").matches) {
          mobileMenu.style.margin = "7.5vw"
        }
      }
      else {
        fadeOut[1].style.marginBottom="36px"
        introImg.style.marginTop = "24px"
        logo.style.maxHeight = "36px"
        logo.classList.add("fixed-nav-logo")
        if (window.matchMedia("(min-width: 360px)").matches) {
          mobileMenu.style.margin = "6px"
        }
      }
      if (fromTop >= 15) {
        navBg.style.display = "block"
      } else {
        navBg.style.display = "none"
      }
    })
  }
})
