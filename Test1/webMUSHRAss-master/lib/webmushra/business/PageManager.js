/*************************************************************************
         (C) Copyright AudioLabs 2015 

This source code is protected by copyright law and international treaties. This source code is made available to You subject to the terms and conditions of the Software License for the webMUSHRA.js Software. Said terms and conditions have been made available to You prior to Your download of this source code. By downloading this source code You agree to be bound by the above mentionend terms and conditions, which can also be found here: https://www.audiolabs-erlangen.de/resources/webMUSHRA. Any unauthorised use of this source code may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under law. 

**************************************************************************/

function PageManager (_variableName, _htmlParenElementId) {
    this.pages = [];
    this.pagesIndex = -1;
    this.parentElementId = _htmlParenElementId;
    this.varName = _variableName;
    this.callbacksPageEventChanged = [];
}

PageManager.prototype.addCallbackPageEventChanged = function (_callback) {
    this.callbacksPageEventChanged[this.callbacksPageEventChanged.length] = _callback;
};


PageManager.prototype.addPage = function (_page) {
    this.pages[this.pages.length] = _page;
};

PageManager.prototype.getNextPage = function () {
  return this.pages[this.pagesIndex+1];
};

PageManager.prototype.getPageIndex = function () {
  return this.pagesIndex;
};

PageManager.prototype.getNumPages = function () {
  return this.pages.length;
};

PageManager.prototype.getPage = function (_index) {
  return this.pages[_index];
};

PageManager.prototype.getCurrentPage = function () {
  return this.pages[this.pagesIndex];
};

PageManager.prototype.nextPage = function () {
  ++this.pagesIndex;

  if (this.pagesIndex <= this.pages.length) {
      if (this.pages[this.pagesIndex - 1] !== undefined && this.pages[this.pagesIndex - 1].save !== undefined) {
        this.pages[this.pagesIndex - 1].save();
      }

      if (this.pagesIndex >= (this.pages.length - 1) && pageManager.getCurrentPage() instanceof FinishPage) { // last page will be rendered
        for (var i = 0; i < this.pages.length; ++i) {
            if (this.pages[i].store !== undefined) {
                this.pages[i].store();
            }
        }
      }
      
      //custom code
      
      
      if (this.pagesIndex == 0) {
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/welcome.jpg", "_new", "height=3000,width=2000", "location=0");
     }
     else if (this.pagesIndex == 1){ 
    
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/2.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	else if (this.pagesIndex == 2){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/3.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	else if (this.pagesIndex == 3){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/4.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 4){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/5.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 5){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/6.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 6){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/7.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 7){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/8.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 8){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/9.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 9){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/10.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 10){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/11.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 11){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/12.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 12){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/13.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	/*else if (this.pagesIndex == 13){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/14.jpg", "_new", "height=3000,width=2000", "location=0");
	} */
	
	else if (this.pagesIndex == 13){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/thankyou.jpg", "_new", "height=3000,width=2000", "location=0");
	} 

      var id = this.parentElementId;
      $("#"+id).empty();
      this.pages[this.pagesIndex].render($("#"+id));
      this.pageEventChanged();
      if (this.getCurrentPage().load !== undefined) {
        $("#"+id).append($("<script> " + this.getPageVariableName(this.getCurrentPage()) + ".load();</script>"));
      }
  } else {
    --this.pagesIndex;
  }
};

PageManager.prototype.previousPage = function () {
    --this.pagesIndex;
    if (this.pagesIndex <= this.pages.length) {
      if (this.pages[this.pagesIndex + 1] !== null && this.pages[this.pagesIndex + 1].save !== null) {
        this.pages[this.pagesIndex + 1].save();
      }
      
      //custom code
      
       if (this.pagesIndex == 0) {
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/welcome.jpg", "_new", "height=3000,width=2000", "location=0");
     }
     else if (this.pagesIndex == 1){ 
    
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/2.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	else if (this.pagesIndex == 2){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/3.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	else if (this.pagesIndex == 3){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/4.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 4){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/5.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 5){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/6.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 6){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/7.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 7){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/8.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 8){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/9.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 9){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/10.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 10){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/11.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 11){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/12.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	else if (this.pagesIndex == 12){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/13.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
	
	/*else if (this.pagesIndex == 13){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/14.jpg", "_new", "height=3000,width=2000", "location=0");
	} */
	
	else if (this.pagesIndex == 13){ 
	
     	window.open("http://192.168.64.2/Yannik_webMUSHRA/Pictures/thankyou.jpg", "_new", "height=3000,width=2000", "location=0");
	} 
      
      var id = this.parentElementId;
      $("#"+id).empty();
      this.pages[this.pagesIndex].render($("#"+id));
      this.pageEventChanged();
      if (this.getCurrentPage().load !== undefined) {
        $("#"+id).append($("<script> " + this.getPageVariableName(this.getCurrentPage()) + ".load();</script>"));
      }
    } else {
      ++this.pagesIndex;
    }
};

PageManager.prototype.start = function () {
    for (var i = 0; i < this.pages.length; ++i) {
        if (this.pages[i].init !== undefined) {
            this.pages[i].init();
        }
    }
    this.nextPage();
};

PageManager.prototype.restart = function () {
    this.pagesIndex = -1;
    this.start();
};



PageManager.prototype.getPageVariableName = function (_page) {
    for (var i = 0; i < this.pages.length; ++i) {
        if (this.pages[i] == _page) {
            return this.varName + ".pages[" + i +"]";
        }
    }
    return false;
};

PageManager.prototype.getPageManagerVariableName = function () {
    return this.varName;
};

PageManager.prototype.pageEventChanged = function () {
    for (var i = 0; i < this.callbacksPageEventChanged.length; ++i) {
      this.callbacksPageEventChanged[i]();
    }
};


