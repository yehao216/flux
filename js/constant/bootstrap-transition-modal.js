!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);

!function ($) {

    "use strict"; // jshint ;_;


    /* MODAL CLASS DEFINITION
  * ====================== */

    var Modal = function (element, options) {
        this.options = options
        this.$element = $(element) //缁戝畾鍏抽棴浜嬩欢锛屽叧闂寜閽姹傛湁[data-dismiss="modal"]灞炴€�
        .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
        this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
    }

    Modal.prototype = {

        constructor: Modal

        , 
        toggle: function () {
            return this[!this.isShown ? 'show' : 'hide']()
        }

        , 
        show: function () {
            var that = this
            , e = $.Event('show')
            //瑙﹀彂show浜嬩欢
            this.$element.trigger(e)

            if (this.isShown || e.isDefaultPrevented()) return

            this.isShown = true

            this.escape();//缁戝畾鎴栫Щ闄ら敭鐩樹簨浠�

            this.backdrop(function () {
                var transition = $.support.transition && that.$element.hasClass('fade')

                if (!that.$element.parent().length) {
                    that.$element.appendTo(document.body) //don't move modals dom position
                }

                that.$element
                .show()

                if (transition) {
                    that.$element[0].offsetWidth // force reflow
                }

                that.$element
                .addClass('in')
                .attr('aria-hidden', false)

                that.enforceFocus()

                transition ?
                that.$element.one($.support.transition.end, function () {
                    that.$element.focus().trigger('shown')
                }) :
                that.$element.focus().trigger('shown')

            })
        }

        , 
        hide: function (e) {
            e && e.preventDefault()

            e = $.Event('hide')

            this.$element.trigger(e)

            if (!this.isShown || e.isDefaultPrevented()) return

            this.isShown = false

            this.escape()

            $(document).off('focusin.modal')

            this.$element
            .removeClass('in')
            .attr('aria-hidden', true)

            $.support.transition && this.$element.hasClass('fade') ?
            this.hideWithTransition() :
            this.hideModal()
            
	    	wx.hideOptionMenu();
        }

        , 
        //璁╂ā鎬佸璇濇鑾峰緱鐒︾偣
        enforceFocus: function () {
            var that = this
            $(document).on('focusin.modal', function (e) {
                if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
                    that.$element.focus()
                }
            })
        }

        , 
        //杩欐槸涓け璐ョ殑璁捐
        escape: function () {
            var that = this
            //濡傛灉宸茬粡澶勪簬鏄剧ず鐘舵€侊紝骞朵笖鍙互浣跨敤閿洏鍏抽棴锛岄偅涔堢粦瀹氶敭鐩樹簨浠�
            if (this.isShown && this.options.keyboard) {
                this.$element.on('keyup.dismiss.modal', function ( e ) {
                    e.which == 27 && that.hide()//鍥炶溅鍏抽棴
                })
            } else if (!this.isShown) {
                this.$element.off('keyup.dismiss.modal')//绉婚櫎浜嬩欢
            }
        }

        , 
        hideWithTransition: function () {
            var that = this
            //寮哄埗缁戝畾绉婚櫎浜嬩欢
            , timeout = setTimeout(function () {
                that.$element.off($.support.transition.end)
                that.hideModal()
            }, 500)
            
            this.$element.one($.support.transition.end, function () {
                clearTimeout(timeout)
                that.hideModal()
            })
        }

        , 
        hideModal: function (that) {
            this.$element
            .hide()
            .trigger('hidden')
            //瑙﹀彂闅愯棌鍥炶皟
            this.backdrop()//绉婚櫎閬僵灞�
        }

        , 
        removeBackdrop: function () {
            this.$backdrop.remove()
            this.$backdrop = null
        }

        , 
        backdrop: function (callback) {
            var that = this
            , animate = this.$element.hasClass('fade') ? 'fade' : ''

            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate
                //娣诲姞閬僵灞�
                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
                .appendTo(document.body)

                this.$backdrop.click(
                    this.options.backdrop == 'static' ?
                    $.proxy(this.$element[0].focus, this.$element[0])
                    : $.proxy(this.hide, this)
                    )

                if (doAnimate) this.$backdrop[0].offsetWidth // force reflow
                //鏄剧ず閬僵灞�
                this.$backdrop.addClass('in')

                doAnimate ?
                this.$backdrop.one($.support.transition.end, callback) :
                callback()

            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in')

                $.support.transition && this.$element.hasClass('fade')?
                this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
                this.removeBackdrop()

            } else if (callback) {
                callback()
            }
        }
    }


    /* MODAL PLUGIN DEFINITION
  * ======================= */

    var old = $.fn.modal

    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this)
            , data = $this.data('modal')
            , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option]()//show hide toggle
            else if (options.show) data.show()//濡傛灉鍦ㄥ弬鏁版寚鏄庤鏄剧ず
        })
    }

    $.fn.modal.defaults = {
        backdrop: true, 
        keyboard: true, 
        show: true
    }

    $.fn.modal.Constructor = Modal


    /* MODAL NO CONFLICT
  * ================= */

    $.fn.modal.noConflict = function () {
        $.fn.modal = old
        return this
    }


    /* MODAL DATA-API
  * ============== */

    $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this)
        , href = $this.attr('href')
        , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({
            remote:!/#/.test(href) && href
        }, $target.data(), $this.data())

        e.preventDefault()

        $target
        .modal(option)
        .one('hide', function () {
            $this.focus()
        })
    })

}(window.jQuery);