define(['jquery','app/data/Data','app/utils/SocialSharing','lib/jquery-mousewheel/jquery.mousewheel','lib/jquery.finger/dist/jquery.finger.min','lib/waitForImages/dist/jquery.waitForImages.min'],function($,Data,Social){

  var _titleBuffer = 100,
  _animationTime = 500,
  _changeReady = true,
  _scollReady = true,
  _scrollEnabled = false,
  _scrollDelay,
  _fireChangeEnd;

  return function(){

    var self = this,
    prevIndex = 0,
    currentIndex = 0;

    this.slides = [];
    _animationTime = Data.defaults.animationTime;

    this.getPrevIndex  = function(){
      return prevIndex;
    };

    this.getCurrentIndex  = function(){
      return currentIndex;
    };

    this.setCurrentIndex  = function(index){
      prevIndex = currentIndex;
      currentIndex = index;
    };

    this.goToNext = function(){
      nextSlide(self);
    };

    $.each(Data.slides,function(i){
      buildSlideHtml(self,this,i);
    });
    createFooterSlide(self,Data.footer);
    setSlidesLayout(self);

    $(window).on('mousewheel',function(event,delta){
      event.preventDefault();

      if (_changeReady && _scollReady){
        if (delta < 0){
          nextSlide(self);
        }
        else{
          prevSlide(self);
        }
      }

      clearTimeout(_scrollDelay);
      _scrollDelay = setTimeout(function(){
        _scollReady = true;
      },300);
      _scollReady = false;
    });

    $(window).on('keydown',function(event){
      var code = event.keyCode || event.which;
      switch(code){
        case 38: /* Up Arrow */
          prevSlide(self);
          break;
        case 40: /* Down Arrow */
          nextSlide(self);
          break;
        case 33: /* Page Up */
          prevSlide(self);
          break;
        case 34: /* Page Down */
          nextSlide(self);
          break;
        default: return;
      }
      event.preventDefault();
    });

    $('html').on('flick',function(e){
      if (e.orientation === 'vertical'){
        if (e.direction < 0){
          nextSlide(self);
        }
        else{
          prevSlide(self);
        }
      }
    });

    $(window).on('resize',function(){
      setSlidesLayout(self,true);
    });

  };

  function buildSlideHtml(self,slide,i){
    var slideTitle,slideContent,slideBackgroundImage;
    if (slide.title){
      if (slide.mainTitle){
        slideTitle = $('<div class="slide-title-wrapper slide-item"><h1 class="slide-main-title">' + slide.title + '</h1><span class="social-media"><a class="smLink" href="http://storymaps.arcgis.com/" target="_blank">A story map</a>&nbsp;<span class="social-button social-facebook icon-facebook"></span><span class="social-button social-twitter icon-twitter"></span></span><div class="main-background"></div></div>');
      }
      else{
        slideTitle = $('<div class="slide-title-wrapper slide-item"><h2 class="slide-title">' + slide.title + '</h2><div class="background"></div></div>');
      }
    }
    if (slide.content){
      if (slide.mainTitle){
        slideContent = $('<div class="slide-content-wrapper slide-main-content-wrapper slide-item"><div class="slide-main-content">' + slide.content + '</div><div class="main-background"></div></div>');
      }
      else{
        slideContent = $('<div class="slide-content-wrapper slide-item"><div class="slide-content">' + slide.content + '</div><div class="background"></div></div>');
      }
    }
    if ($('.slide-item').length < 1){
      $('#map').after(slideTitle);
      $('.slide-item').last().after(slideContent);
    }
    else{
      $('.slide-item').last().after(slideTitle);
      $('.slide-item').last().after(slideContent);

      if ($('.next-arrow').length < 1){
        var nextButton = $('<div class="next-arrow icon-angle-down"></div>');
        $('#map').after(nextButton);

        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
          nextButton.on('click',function(){
            nextSlide(self);
          });
        }
        else{
          nextButton.on('tap',function(){
            nextSlide(self);
          });
        }
      }
    }
    if (slide.backgroundImage){
      slideBackgroundImage = $('<div class="slide-background-image slide-item" style="background-image:url(' + slide.backgroundImage + ');"></div>');
      $('.slide-item').last().after(slideBackgroundImage);

      slideBackgroundImage.waitForImages(function(){
        $('.loader').fadeOut();
        _scrollEnabled = true;
      });
    }
    var slideObj = {
      slide: slide,
      title: slideTitle,
      content: slideContent,
      backgroundImage: slideBackgroundImage
    };

    self.slides.push(slideObj);
  }

  function createFooterSlide(self,slide){
    var related = '';
    if (slide.relatedStories){
      related = '<div class="related-stories">\
        <h5>More Stories</h5>\
          <div class="related-wrapper">';

      $.each(slide.relatedStories,function(){
        related = related + '<a class="story-wrapper" href="' + this.url + '" target="_blank">\
          <div class="story-thumbnail" style="background-image: url(' + this.thumbnail + ');"></div>\
          <p class="story-title">' + this.title + '</p>\
        </a>';
      });

      related = related + '</div></div>';
    }
    var footer = $('<div class="slide-footer slide-item">\
        <div class="footer-content">' + slide.content + related + '<div class="back-to-top-wrapper"><div class="back-to-top-button">Back To Top</div></div></div>\
      </div>');
    if ($('.slide-item').length < 1){
      $('#map').after(footer);
      footer.css({
        top: '100%'
      });
    }
    else{
      $('.slide-item').last().after(footer);
    }

    $('.back-to-top-button').click(function(){
      self.setCurrentIndex(0);
      scrollToPosition(self,0);
    });

    Social.addClickEvents();
  }

  function nextSlide(self){
    if (self.getCurrentIndex() !== self.slides.length && _scrollEnabled){
      var newIndex = self.getCurrentIndex() + 1;
      self.setCurrentIndex(newIndex);
      scrollToPosition(self,newIndex);
    }
  }

  function prevSlide(self){
    if (self.getCurrentIndex() !== 0 && _scrollEnabled){
      var newIndex = self.getCurrentIndex() - 1;
      self.setCurrentIndex(newIndex);
      scrollToPosition(self,newIndex);
    }
  }

  function scrollToPosition(self,index,fromResize){
    var delay = fromResize ? 0 : _animationTime;
    var scrollPosition;
    if (!fromResize){
      _changeReady = false;
      onChangeStart(self);
    }
    if (self.slides.length === index){
      $('.next-arrow').fadeOut(_animationTime);
      scrollPosition = ($(this).height() * (index - 1)) + $('.slide-footer').outerHeight();
    }
    else{
      scrollPosition = ($(this).height() * index);
      $('.next-arrow').fadeIn(_animationTime);
    }
    $('html,body').animate({'scrollTop':scrollPosition},{
      duration: delay,
      complete: function(){
        if (!fromResize){
          _changeReady = true;
          onChangeEnd(self);
        }
      }
    });
  }

  function setSlidesLayout(self,fromResize){
    var docWidth = $('html,body').width();
    $.each(self.slides,function(i){

      if (this.title){
        this.title.css({
          top: (i * _titleBuffer) + '%',
          left: (docWidth - this.title.outerWidth())/2
        });
      }

      if (this.content){
        this.content.css({
          bottom: (-i * _titleBuffer) + '%',
          left: this.slide.mainTitle ? (docWidth - this.content.outerWidth())/2 : undefined
        });
      }

      if (this.backgroundImage){
        this.backgroundImage.css({
          top: (i * _titleBuffer) + '%'
        });
      }

      $('.slide-footer').css({
        top: (self.slides.length * _titleBuffer) + '%'
      });

    });

    scrollToPosition(self,self.getCurrentIndex(),fromResize);
  }

  function onChangeStart(self){
    _fireChangeEnd = true;
    var eventObj = {
      prevIndex: self.getPrevIndex(),
      currentIndex: self.getCurrentIndex()
    };
    $(self).trigger('changeStart',eventObj);
  }

  function onChangeEnd(self){
    if (_fireChangeEnd){
      _fireChangeEnd = false;
      var eventObj = {
        prevIndex: self.getPrevIndex(),
        currentIndex: self.getCurrentIndex()
      };
      $(self).trigger('changeEnd',eventObj);
    }
  }

});