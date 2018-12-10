/*************************************************************************
         (C) Copyright AudioLabs 2015 

This source code is protected by copyright law and international treaties. This source code is made available to You subject to the terms and conditions of the Software License for the webMUSHRA.js Software. Said terms and conditions have been made available to You prior to Your download of this source code. By downloading this source code You agree to be bound by the above mentionend terms and conditions, which can also be found here: https://www.audiolabs-erlangen.de/resources/webMUSHRA. Any unauthorised use of this source code may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under law. 

**************************************************************************/

function MushraResultsPage(_pageManager, _pageConfig, _audioContext, _bufferSize, _errorHandler) {
  this.pageManager = _pageManager;
  this.pageConfig = _pageConfig;  
  this.audioContext = _audioContext;
  this.bufferSize = _bufferSize;
  this.errorHandler = _errorHandler;
  
  this.filePlayer = null;
  this.mushraPage = null;
  
  
} 

MushraResultsPage.prototype.getName = function () {
  return this.pageConfig.name;
};

MushraResultsPage.prototype.init = function (_callbackError) { 
  this.filePlayers = [];
  this.likerts = [];
  
  for (var i = 0; i < this.pageManager.getNumPages(); ++i) {
    var page = this.pageManager.getPage(i);
    if (page.pageConfig) {
      if (page.pageConfig.id === this.pageConfig.mushra_page_id) {
        this.filePlayer = new FilePlayer(this.audioContext, this.bufferSize, page.conditions, this.errorHandler);
        this.mushraPage = page;
        return;      
      }
    }
  }
  this.errorHandler.sendError("Mushra results page ("+this.pageConfig.id+") did not find Mushra page ("+this.pageConfig.mushra_page_id+").");
};


MushraResultsPage.prototype.render = function (_parent) {  
  var div = $("<div></div>");
  _parent.append(div);

  var content; 
  if(this.pageConfig.content === null){
    content ="";
  } else {
    content = this.pageConfig.content;
  }
  
  var p = $("<p>" + content + "</p>");
  div.append(p);

  this.filePlayer.render(_parent);
    
  for (var i = 0; i < this.mushraPage.conditions.length; ++i) {
    var condition = this.mushraPage.conditions[i];
    var rating = this.mushraPage.ratings[i].value;
    this.filePlayer.getHook(i).append(condition.id + ": " + rating);     
  }
};

MushraResultsPage.prototype.load = function () {
  /*  
  for(var i = 0; i < this.stimuli.length; ++i){
    if(this.results[i]){
      $("input[name='"+this.likerts[i].prefix +"_response'][value='"+this.results[i]+"']").attr("checked", "checked");
      $("input[name='"+this.likerts[i].prefix +"_response'][value='"+this.results[i]+"']").checkboxradio("refresh");
      this.likerts[i].group.change();
    }
  }
  */
  
    
  this.filePlayer.init();
};

MushraResultsPage.prototype.save = function () {
  this.filePlayer.free();
};

MushraResultsPage.prototype.store = function (_reponsesStorage) {
 
};
