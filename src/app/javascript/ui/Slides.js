define(['jquery','app/data/Data','lib/jquery-mousewheel/jquery.mousewheel'],function($,Data){

  var _titleBuffer = 100,
  _animationTime = 500,
  _changeReady = true,
  _scollReady = true,
  _scrollDelay;

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


    $.each(Data.slides,function(i){
      buildSlideHtml(self,this,i);
    });
    createFooterSlide(self);
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
      },50);
      _scollReady = false;
    });

    $(window).on('keydown',function(event){
      switch(event.which){
        case 37:
          prevSlide(self);
          break;
        case 38:
          prevSlide(self);
          break;
        case 39:
          nextSlide(self);
          break;
        case 40:
          nextSlide(self);
          break;
        default: return;
      }
      event.preventDefault();
    });

    $(window).on('resize',function(){
      setSlidesLayout(self,true);
    });

  };

  function buildSlideHtml(self,slide,i){
    var slideTitle,slideContent,slideBackgroundImage;
    if (slide.title){
      if (slide.mainTitle){
        slideTitle = $('<div class="slide-title-wrapper slide-item"><h1 class="slide-main-title">' + slide.title + '</h1><div class="main-background"></div></div>');
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

        nextButton.click(function(){
          nextSlide(self);
        });
      }
    }
    if (slide.backgroundImage){
      slideBackgroundImage = $('<div class="slide-background-image slide-item" style="background-image:url(' + slide.backgroundImage + ');"></div>');
      $('.slide-item').last().after(slideBackgroundImage);
    }
    var slideObj = {
      slide: slide,
      title: slideTitle,
      content: slideContent,
      backgroundImage: slideBackgroundImage
    };

    self.slides.push(slideObj);
  }

  function createFooterSlide(self){
    var footer = $('<div class="slide-footer slide-item"></div>');
    if ($('.slide-item').length < 1){
      $('#map').after(footer);
      footer.css({
        top: '100%'
      });
    }
    else{
      $('.slide-item').last().after(footer);
    }
  }

  function nextSlide(self){
    if (self.getCurrentIndex() !== self.slides.length){
      var newIndex = self.getCurrentIndex() + 1;
      self.setCurrentIndex(newIndex);
      scrollToPosition(self,newIndex);
    }
  }

  function prevSlide(self){
    if (self.getCurrentIndex() !== 0){
      var newIndex = self.getCurrentIndex() - 1;
      self.setCurrentIndex(newIndex);
      scrollToPosition(self,newIndex);
    }
  }

  function scrollToPosition(self,index,fromResize){
    var delay = fromResize ? 0 : _animationTime;
    var scrollPosition;
    _changeReady = false;
    onChangeStart(self);
    if (self.slides.length === index){
      $('.next-arrow').fadeOut(_animationTime);
      scrollPosition = ($(this).height() * (index - 1)) + $('.slide-footer').outerHeight();
    }
    else{
      scrollPosition = ($(this).height() * index);
      $('.next-arrow').fadeIn(_animationTime);
    }
    $('html, body').animate({'scrollTop':scrollPosition},{
      duration: delay,
      complete: function(){
        _changeReady = true;
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
    var eventObj = {
      prevIndex: self.getPrevIndex(),
      currentIndex: self.getCurrentIndex()
    };
    $(self).trigger('changeStart',eventObj);
  }

});