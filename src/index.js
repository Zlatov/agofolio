import "./style.scss"

(function() {

  "use strict"

  var Agofolio = {
    place: null,
    current: 0,
    pages: null,
    hold: false
  }

  Agofolio.init = function() {
    var place = $(".agofolio")
    if (place.length != 1) {
      return null
    }
    this.place = place
    this.place[0].addEventListener("wheel", this.wheel_handler)
    this.pages = this.place.find(".agofolio-pages").children(".agofolio-page")
  }

  Agofolio.wheel_handler = function(event) {
    event.stopPropagation()
    var direction
    if (!this.hold && event.deltaY > 0 && this.current < (this.pages.length - 1)) {
      direction = 1
    }
    if (!this.hold && event.deltaY < 0 && this.current > 0) {
      direction = -1
    }
    if (direction == null) {
      return null
    }
    this.hold = true
    this.scroll(direction)
    setTimeout(function() {
      this.hold = false
    }.bind(this), 1500)
  }.bind(Agofolio)

  Agofolio.scroll = function(direction) {
    var new_page = this.pages.eq(this.current + direction)
    var current_page = this.pages.eq(this.current)

    // Подготовка z-index перед движением для всех страниц.
    current_page[0].style.zIndex = "3"
    new_page[0].style.zIndex = "2"
    var instance = this
    this.pages.filter(function(index) {
      index != instance.current && index != instance.current + direction
    }).each(function (index, dom) {
      dom.style.zIndex = "1"
    })

    // Подготовка translateY перед движением для new_page.
    new_page[0].style.transition = "none"
    new_page[0].style.transform = "translateY(" + (direction*50).toString() + "vh)"

    // Движение
    setTimeout(function() {
      new_page[0].style.transition = "transform 1.5s"
      new_page[0].style.transform = "translateY(0vh)"
      current_page[0].style.transform = "translateY(" + (direction*-100).toString() + "vh)"
    })

    this.current = this.current + direction
  }

  Agofolio.init()
})();

// export { Agofolio as default }
