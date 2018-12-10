/*************************************************************************
         (C) Copyright AudioLabs 2015 

This source code is protected by copyright law and international treaties. This source code is made available to You subject to the terms and conditions of the Software License for the webMUSHRA.js Software. Said terms and conditions have been made available to You prior to Your download of this source code. By downloading this source code You agree to be bound by the above mentionend terms and conditions, which can also be found here: https://www.audiolabs-erlangen.de/resources/webMUSHRA. Any unauthorised use of this source code may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under law. 

**************************************************************************/

function VolumePage(_pageManager, _audioContext, _audioFileLoader, _pageConfig) {
  this.pageManager = _pageManager;
  this.audioContext = _audioContext;
  this.audioFileLoader = _audioFileLoader;
  this.pageConfig = _pageConfig;

  this.source = null;
  this.gainNode = null;

  this.position = 0;
  this.timeWhenStarted = 0;
  this.played = false;

  this.stimulus = new Stimulus();

  this.audioFileLoader.addFile(this.pageConfig.stimulus, (function (_buffer, _stimulus) { _stimulus.setAudioBuffer(_buffer); }), this.stimulus);

  this.volume = this.pageConfig.defaultVolume;
}


VolumePage.prototype.getName = function () {
  return this.pageConfig.name;
};

VolumePage.prototype.load = function() {
  this.source = this.audioContext.createBufferSource();
  this.source.buffer = this.stimulus.getAudioBuffer();
  this.gainNode = audioContext.createGain();
  this.gainVolume(this.volume * 100);

  this.source.connect(this.gainNode);
  this.gainNode.connect(this.audioContext.destination);
};

VolumePage.prototype.save = function() {
  this.volume = this.audioContext.volume;
  if (this.played) {
    this.stop();
  }
};

VolumePage.prototype.gainVolume = function(value) {
  this.gainNode.gain.value = this.audioContext.volume = parseInt(value, 10) / 100.0;
};

VolumePage.prototype.pause = function(){
  if (this.played === true){
    this.position = (this.audioContext.currentTime - this.timeWhenStarted);
  }
  this.played = false;
  this.source.stop(0);
};

VolumePage.prototype.stop = function(){
  this.played = false;
  this.position = 0;
  this.source.stop(0);
};

VolumePage.prototype.play = function() {
  if(this.played === true){
    this.stop();
  }

  var buffer = this.source.buffer;
  this.source = audioContext.createBufferSource();
  this.source.buffer = buffer;
  this.source.connect(this.gainNode);
  this.timeWhenStarted = this.audioContext.currentTime;
  this.source.start(0, this.position);
  this.played = true;
};

VolumePage.prototype.render = function (_parent) {
  var content = $("\
  <p> " + this.pageConfig.content + " \
  </p> \
  <br/> \
  <table width='600' style='margin: 0 auto;'>\
    <tr>\
      <td>\
        <button data-role='button' data-inline='true'  onclick = '" + this.pageManager.getPageVariableName(this) + ".play();'>Play</button>\
        <button data-role='button' data-inline='true'  onclick = '" + this.pageManager.getPageVariableName(this) + ".pause();'>Pause</button>\
        <button data-role='button' data-inline='true'  onclick = '" + this.pageManager.getPageVariableName(this) + ".stop();'>Stop</button>\
      </td>\
    </tr>\
    <tr>\
      <td>\
        <input type='range' name='slider'  min='0' max='100' value='"+ this.volume * 100 +"'  data-highlight='true' onchange = '" + this.pageManager.getPageVariableName(this) + ".gainVolume(this.value)'>\
      </td>\
    </tr>\
  </table>\
  ");
  _parent.append(content);
};
