'use strict';

describe('Service: gallery', function () {

  // load the service's module
  beforeEach(module('applicationApp'));

  // instantiate service
  var gallery;
  beforeEach(inject(function (_gallery_) {
    gallery = _gallery_;
  }));

  it('should do something', function () {
    expect(!!gallery).toBe(true);
  });

});
