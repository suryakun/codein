'use strict';

describe('Service: video', function () {

  // load the service's module
  beforeEach(module('applicationApp'));

  // instantiate service
  var video;
  beforeEach(inject(function (_video_) {
    video = _video_;
  }));

  it('should do something', function () {
    expect(!!video).toBe(true);
  });

});
