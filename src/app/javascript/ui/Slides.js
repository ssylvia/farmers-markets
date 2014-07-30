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

    $(window).on('resize',function(){
      setSlidesLayout(self,true);
    });

  };

  function buildSlideHtml(self,slide,i){
    var slideTitle = $('<h1 class="slide-title slide-item">' + slide.title + '</h1>'),
    slideContent = $('<div class="slide-content slide-item">' + slide.content + '</div>');
    if ($('.slide-item').length < 1){
      $('#map').after(slideTitle);
      $('.slide-item').last().after(slideContent);
    }
    else{
      $('.slide-item').last().after(slideTitle);
      $('.slide-item').last().after(slideContent);
    }
    var slideObj = {
      title: slideTitle,
      content: slideContent
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
    _changeReady = false;
    onChangeStart(self);
    $('html, body').animate({'scrollTop':($(this).height() * index)},{
      duration: delay,
      complete: function(){
        _changeReady = true;
      }
    });
  }

  function setSlidesLayout(self,fromResize){
    $.each(self.slides,function(i){

      this.title.css({
        top: (i * _titleBuffer) + '%'
      });

      this.content.css({
        bottom: (-i * _titleBuffer) + '%'
      });

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